import { StorageAdapter, BackendType } from '../interfaces';

export class RedisStorageAdapter implements StorageAdapter {
  public type: BackendType = 'redis';

  constructor(private connectionOptions: any) {
    // Stub implementation
  }

  public async acquireLeaderLock(ttlMs: number): Promise<boolean> { return false; }
  public async renewLeaderLock(): Promise<boolean> { return false; }
  public async releaseLeaderLock(): Promise<void> {}

  public async acquireSemaphorePermit(globalLimit: number): Promise<boolean> { return false; }
  public async releaseSemaphorePermit(): Promise<void> {}
}

export class MongoStorageAdapter implements StorageAdapter {
  public type: BackendType = 'mongodb';

  constructor(private connectionString: string) {
    // Stub implementation
  }

  public async acquireLeaderLock(ttlMs: number): Promise<boolean> { return false; }
  public async renewLeaderLock(): Promise<boolean> { return false; }
  public async releaseLeaderLock(): Promise<void> {}

  public async acquireSemaphorePermit(globalLimit: number): Promise<boolean> { return false; }
  public async releaseSemaphorePermit(): Promise<void> {}
}

export class PostgresStorageAdapter implements StorageAdapter {
  public type: BackendType = 'postgresql';

  constructor(private connectionString: string) {
    // Stub implementation
  }

  public async acquireLeaderLock(ttlMs: number): Promise<boolean> { return false; }
  public async renewLeaderLock(): Promise<boolean> { return false; }
  public async releaseLeaderLock(): Promise<void> {}

  public async acquireSemaphorePermit(globalLimit: number): Promise<boolean> { return false; }
  public async releaseSemaphorePermit(): Promise<void> {}
}
