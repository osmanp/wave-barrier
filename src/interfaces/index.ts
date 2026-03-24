export type BackendType = 'redis' | 'mongodb' | 'postgres';

export interface RedisBackendConfig {
  type: 'redis';
  url?: string;
  [key: string]: any;
}

export interface MongoBackendConfig {
  type: 'mongodb';
  url: string;
  dbName?: string;
  [key: string]: any;
}

export interface PostgresBackendConfig {
  type: 'postgres';
  host?: string;
  port?: number;
  user?: string;
  password?: string;
  database?: string;
  connectionString?: string;
  [key: string]: any;
}

export type BackendConfig = RedisBackendConfig | MongoBackendConfig | PostgresBackendConfig;

export type QueueType = 'bullmq' | 'agenda' | 'pg-boss';

export interface BullMQQueueConfig {
  type: 'bullmq';
  name: string;
  connection?: any;
  options?: any;
}

export interface AgendaQueueConfig {
  type: 'agenda';
  name: string;
  mongoUri: string;
  options?: any;
}

export interface PgBossQueueConfig {
  type: 'pg-boss';
  name: string;
  connectionString: string;
  options?: any;
}

export type QueueConfig = BullMQQueueConfig | AgendaQueueConfig | PgBossQueueConfig;

export interface RuntimeOptions {
  maxConcurrent?: number;
  semaphoreOptions?: {
    semaphoreKey?: string;
    ttl?: number;
  };
  leaderOptions?: {
    nodeId?: string;
    lockKey?: string;
    ttl?: number;
  };
}

export interface Backend {
  init(): Promise<void>;
  acquireLock(key: string, owner: string, ttl: number): Promise<boolean>;
  extendLock(key: string, owner: string, ttl: number): Promise<boolean>;
  releaseLock(key: string, owner: string): Promise<boolean>;
  acquireSemaphoreSlot(semaphoreKey: string, leaseId: string, max: number, ttl: number): Promise<boolean>;
  releaseSemaphoreSlot(semaphoreKey: string, leaseId: string): Promise<boolean>;
  renewSemaphoreSlot(semaphoreKey: string, leaseId: string, ttl: number): Promise<boolean>;
}
