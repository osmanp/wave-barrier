# Internal Implementation Details

This document outlines the internal architecture of `wave-barrier` and provides guidance for developers contributing to the codebase.

## Overview

`wave-barrier` is a distributed execution runtime tailored for Node.js clusters, specifically integrating with `Agenda` for durable job scheduling and execution. The core challenge it solves is coordinating multiple identical worker nodes to ensure:
1.  **Single Leader Execution:** Only one node schedules recurring or specific jobs at any given time.
2.  **Global Concurrency Limits:** Across all nodes in the cluster, the maximum number of concurrent jobs being processed does not exceed a defined limit.

## Core Components

The system is built around three primary concepts:

1.  `ClusterRuntime`: The main entry point and orchestrator for each node.
2.  `StorageAdapter`: An interface abstracting the backend system (Redis, MongoDB, PostgreSQL) used for distributed coordination (locks and semaphores).
3.  `Agenda`: The underlying job queue responsible for persistence, retries, and scheduling.

### `ClusterRuntime`

The `ClusterRuntime` is instantiated on every node in the cluster. It is responsible for the lifecycle of the node and coordinating with the cluster.

#### Key Responsibilities:

*   **Initialization & Teardown:** Handling `start()` and `stop()` to connect to the queue and begin participating in leader election.
*   **Leader Election Loop:** Periodically polling the `StorageAdapter` to acquire or renew the leader lock.
    *   If a node acquires the lock, it becomes the **Leader** and emits `promotedToLeader`.
    *   If a node loses the lock, it steps down to a **Worker** and emits `demotedToWorker`.
*   **Leader Dispatcher:** A registered callback via `setLeaderDispatcher(fn)` that is *only* invoked if the current node is the leader. This is primarily used to set up recurring jobs (`agenda.every()`) so that duplicate jobs aren't created by every node in the cluster.
*   **Job Processing Wrapper:** The `processJob` method wraps the standard `agenda.define()` callback. When a job is pulled from Agenda, the wrapper first attempts to acquire a semaphore permit via the `StorageAdapter`.
    *   If a permit is acquired, the actual job handler executes.
    *   If a permit is *not* acquired (because the global concurrency limit has been reached), the job must yield or be rescheduled.

### `StorageAdapter`

The `StorageAdapter` is the crucial abstraction that allows `wave-barrier` to support multiple backends (Redis, MongoDB, Postgres) while maintaining the same coordination logic. It provides two primitives:

#### 1. Distributed Mutex (Leader Election)
*   `acquireLeaderLock(ttlMs)`: Attempts to create a unique lock key in the backend with a Time-To-Live. If the key already exists, acquisition fails.
*   `renewLeaderLock()`: Extends the TTL of an already held lock.
*   `releaseLeaderLock()`: Deletes the lock key, allowing another node to claim it.

#### 2. Distributed Semaphore (Global Concurrency)
*   `acquireSemaphorePermit(globalLimit)`: Checks the current number of active permits in the backend. If it's less than `globalLimit`, increments the count (or creates a lease) and returns `true`. Otherwise, returns `false`.
*   `releaseSemaphorePermit()`: Decrements the permit count (or removes the lease).

## Interaction Flow (Job Processing)

1.  **Node Startup:** `nodeA.start()` is called. It begins its election loop and connects Agenda.
2.  **Election:** `nodeA` successfully calls `StorageAdapter.acquireLeaderLock()`. `nodeA` is now the leader.
3.  **Dispatch:** `nodeA`'s leader dispatcher executes, scheduling a job `process-data` in Agenda.
4.  **Job Polling:** Agenda instances on all nodes (including `nodeA` and `nodeB`) poll for the `process-data` job.
5.  **Job Execution:** `nodeB` pulls a `process-data` job. Before executing the handler, the `ClusterRuntime` calls `StorageAdapter.acquireSemaphorePermit()`.
    *   *Scenario A (Under Limit):* Permit acquired. The handler runs. Upon completion, `releaseSemaphorePermit()` is called.
    *   *Scenario B (At Limit):* Permit denied. The job execution is skipped/yielded back to Agenda to be retried later, respecting the global concurrency cap.

## Adding a New Backend

To add support for a new backend (e.g., MySQL), you must create a new class implementing the `StorageAdapter` interface.

1.  Implement the Mutex logic: This usually involves atomic inserts or conditional updates (e.g., `INSERT ... ON CONFLICT DO NOTHING`).
2.  Implement the Semaphore logic: This is more complex and usually requires atomic increments/decrements or maintaining a table of active leases and checking the total count.
3.  Export the new adapter in `src/lib/backends.ts` and update the `BackendType` in `src/interfaces/index.ts`.