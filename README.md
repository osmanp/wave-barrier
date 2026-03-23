# wave-barrier

> Distributed job coordination for Node.js clusters with identical nodes, dynamic leader election, and semaphore-based concurrency control. Supports Redis, MongoDB, or PostgreSQL backends and integrates with existing queues (BullMQ, Agenda, pg-boss) for reliable task execution.

## Overview

A lightweight distributed execution runtime for Node.js where all nodes are identical and run the same code, coordinating work via a shared backend (Redis, MongoDB, or PostgreSQL).

The system uses leader election (via distributed locks) to dynamically select a single coordinator node, while all other nodes act as workers. Leader election ensures only one node dispatches jobs at a time, preventing duplicate execution.

Work distribution is controlled by a distributed semaphore, enforcing global concurrency limits across all nodes. Each task and node has a unique ID, enabling safe execution, ownership tracking, and idempotency.

The library integrates with existing job queues (BullMQ, Agenda, pg-boss) for durability and retries, while using the backend (Redis/Mongo/Postgres) for:

- Leader election (distributed mutex / lease)
- Semaphore-based capacity control
- Task coordination and state tracking

This design follows standard distributed coordination patterns such as distributed locks and leader election, which ensure mutual exclusion, fault tolerance, and safe coordination across multiple processes.

## Features

- **Distributed Leader Election:** Dynamically elects a single coordinator node among identical worker nodes.
- **Global Concurrency Limits:** Enforces capacity limits using distributed semaphores.
- **Multiple Backend Support:** Redis, MongoDB, and PostgreSQL adapters.
- **Job Queue Integration:** Works alongside BullMQ, Agenda, and pg-boss.
- **Fault-Tolerant & Idempotent:** Safe task execution with unique tracking.
