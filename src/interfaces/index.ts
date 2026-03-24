import type { Agenda } from 'agenda';

export type BackendType = 'redis' | 'mongodb' | 'postgresql';

export interface StorageAdapter {
  type: BackendType;

  // Leader Election (Distributed Mutex)
  acquireLeaderLock(ttlMs: number): Promise<boolean>;
  renewLeaderLock(): Promise<boolean>;
  releaseLeaderLock(): Promise<void>;

  // Global Concurrency (Distributed Semaphore)
  acquireSemaphorePermit(globalLimit: number): Promise<boolean>;
  releaseSemaphorePermit(): Promise<void>;
}

export interface ClusterConfig {
  /** Unique identifier for this instance (e.g., `worker-${process.pid}`) */
  nodeId: string;

  /** The maximum number of concurrent tasks allowed across the ENTIRE cluster */
  globalConcurrency: number;

  /** The backend handling locks and semaphores */
  storage: StorageAdapter;

  /** The instantiated Agenda instance used for durability and retries */
  agenda: Agenda;

  /** Polling interval for leader election checks (default: 5000ms) */
  pollIntervalMs?: number;
}
