import {
  Backend,
  RedisBackendConfig,
  MongoBackendConfig,
  PostgresBackendConfig
} from '../interfaces';

export class RedisBackend implements Backend {
  constructor(config: RedisBackendConfig) {
    // Stub implementation
  }

  public async init(): Promise<void> {}
  public async acquireLock(key: string, owner: string, ttl: number): Promise<boolean> { return false; }
  public async extendLock(key: string, owner: string, ttl: number): Promise<boolean> { return false; }
  public async releaseLock(key: string, owner: string): Promise<boolean> { return false; }
  public async acquireSemaphoreSlot(semaphoreKey: string, leaseId: string, max: number, ttl: number): Promise<boolean> { return false; }
  public async releaseSemaphoreSlot(semaphoreKey: string, leaseId: string): Promise<boolean> { return false; }
  public async renewSemaphoreSlot(semaphoreKey: string, leaseId: string, ttl: number): Promise<boolean> { return false; }
}

export class MongoBackend implements Backend {
  constructor(config: MongoBackendConfig) {
    // Stub implementation
  }

  public async init(): Promise<void> {}
  public async acquireLock(key: string, owner: string, ttl: number): Promise<boolean> { return false; }
  public async extendLock(key: string, owner: string, ttl: number): Promise<boolean> { return false; }
  public async releaseLock(key: string, owner: string): Promise<boolean> { return false; }
  public async acquireSemaphoreSlot(semaphoreKey: string, leaseId: string, max: number, ttl: number): Promise<boolean> { return false; }
  public async releaseSemaphoreSlot(semaphoreKey: string, leaseId: string): Promise<boolean> { return false; }
  public async renewSemaphoreSlot(semaphoreKey: string, leaseId: string, ttl: number): Promise<boolean> { return false; }
}

export class PostgresBackend implements Backend {
  constructor(config: PostgresBackendConfig) {
    // Stub implementation
  }

  public async init(): Promise<void> {}
  public async acquireLock(key: string, owner: string, ttl: number): Promise<boolean> { return false; }
  public async extendLock(key: string, owner: string, ttl: number): Promise<boolean> { return false; }
  public async releaseLock(key: string, owner: string): Promise<boolean> { return false; }
  public async acquireSemaphoreSlot(semaphoreKey: string, leaseId: string, max: number, ttl: number): Promise<boolean> { return false; }
  public async releaseSemaphoreSlot(semaphoreKey: string, leaseId: string): Promise<boolean> { return false; }
  public async renewSemaphoreSlot(semaphoreKey: string, leaseId: string, ttl: number): Promise<boolean> { return false; }
}
