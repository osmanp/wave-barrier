import { describe, expect, test, beforeEach, jest } from '@jest/globals';
import { ClusterRuntime } from '../src/lib/runtime';
import { ClusterConfig, StorageAdapter } from '../src/interfaces';
import type { Agenda, Job } from 'agenda';

describe('ClusterRuntime', () => {
  let mockStorage: StorageAdapter;
  let mockAgenda: Agenda;
  let config: ClusterConfig;
  let runtime: ClusterRuntime;

  beforeEach(() => {
    mockStorage = {
      type: 'redis',
      acquireLeaderLock: jest.fn<() => Promise<boolean>>().mockResolvedValue(true),
      renewLeaderLock: jest.fn<() => Promise<boolean>>().mockResolvedValue(true),
      releaseLeaderLock: jest.fn<() => Promise<void>>().mockResolvedValue(undefined),
      acquireSemaphorePermit: jest.fn<() => Promise<boolean>>().mockResolvedValue(true),
      releaseSemaphorePermit: jest.fn<() => Promise<void>>().mockResolvedValue(undefined),
    };

    mockAgenda = {} as any as Agenda;

    config = {
      nodeId: 'test-node-1',
      globalConcurrency: 5,
      storage: mockStorage,
      agenda: mockAgenda,
      pollIntervalMs: 1000,
    };

    runtime = new ClusterRuntime(config);
  });

  test('should initialize with correct properties', () => {
    expect(runtime.nodeId).toBe('test-node-1');
    expect(runtime.isLeader).toBe(false);
  });

  test('should allow setting leader dispatcher', () => {
    const mockDispatcher = jest.fn<(agenda: Agenda) => Promise<void>>();
    expect(() => runtime.setLeaderDispatcher(mockDispatcher)).not.toThrow();
  });

  test('should allow setting job processor', () => {
    const mockHandler = jest.fn<(job: Job<any>) => Promise<void>>();
    expect(() => runtime.processJob('test-job', mockHandler)).not.toThrow();
  });

  test('should have stubbed start and stop methods', async () => {
    await expect(runtime.start()).resolves.toBeUndefined();
    await expect(runtime.stop()).resolves.toBeUndefined();
  });

  test('should allow subscribing to events', () => {
    const mockListener = jest.fn();
    runtime.on('promotedToLeader', mockListener);

    runtime.emit('promotedToLeader');

    expect(mockListener).toHaveBeenCalledTimes(1);
  });
});
