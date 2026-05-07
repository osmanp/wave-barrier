import { describe, expect, test } from '@jest/globals';
import { RedisStorageAdapter, MongoStorageAdapter, PostgresStorageAdapter } from '../src/lib/backends';

describe('Storage Adapters', () => {

  describe('RedisStorageAdapter', () => {
    test('should initialize and have stubbed methods', async () => {
      const adapter = new RedisStorageAdapter({});

      expect(adapter.type).toBe('redis');
      await expect(adapter.acquireLeaderLock(1000)).resolves.toBe(false);
      await expect(adapter.renewLeaderLock()).resolves.toBe(false);
      await expect(adapter.releaseLeaderLock()).resolves.toBeUndefined();
      await expect(adapter.acquireSemaphorePermit(5)).resolves.toBe(false);
      await expect(adapter.releaseSemaphorePermit()).resolves.toBeUndefined();
    });
  });

  describe('MongoStorageAdapter', () => {
    test('should initialize and have stubbed methods', async () => {
      const adapter = new MongoStorageAdapter('mongodb://localhost:27017');

      expect(adapter.type).toBe('mongodb');
      await expect(adapter.acquireLeaderLock(1000)).resolves.toBe(false);
      await expect(adapter.renewLeaderLock()).resolves.toBe(false);
      await expect(adapter.releaseLeaderLock()).resolves.toBeUndefined();
      await expect(adapter.acquireSemaphorePermit(5)).resolves.toBe(false);
      await expect(adapter.releaseSemaphorePermit()).resolves.toBeUndefined();
    });
  });

  describe('PostgresStorageAdapter', () => {
    test('should initialize and have stubbed methods', async () => {
      const adapter = new PostgresStorageAdapter('postgres://user:pass@localhost:5432/db');

      expect(adapter.type).toBe('postgresql');
      await expect(adapter.acquireLeaderLock(1000)).resolves.toBe(false);
      await expect(adapter.renewLeaderLock()).resolves.toBe(false);
      await expect(adapter.releaseLeaderLock()).resolves.toBeUndefined();
      await expect(adapter.acquireSemaphorePermit(5)).resolves.toBe(false);
      await expect(adapter.releaseSemaphorePermit()).resolves.toBeUndefined();
    });
  });

});
