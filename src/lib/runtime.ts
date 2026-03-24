import { EventEmitter } from 'events';
import type { Agenda, Job } from 'agenda';
import { ClusterConfig } from '../interfaces';

export class ClusterRuntime extends EventEmitter {
  public readonly nodeId: string;
  public readonly isLeader: boolean = false;
  private config: ClusterConfig;

  constructor(config: ClusterConfig) {
    super();
    this.config = config;
    this.nodeId = config.nodeId;
  }

  public setLeaderDispatcher(dispatcherFn: (agenda: Agenda) => Promise<void>): void {
    // Stub implementation
  }

  public processJob<T = any>(jobName: string, handler: (job: Job<T>) => Promise<void>): void {
    // Stub implementation
  }

  public async start(): Promise<void> {
    // Stub implementation
  }

  public async stop(): Promise<void> {
    // Stub implementation
  }

  // Observability & Events
  public on(event: 'promotedToLeader', listener: () => void): this;
  public on(event: 'demotedToWorker', listener: () => void): this;
  public on(event: 'jobStarted', listener: (jobName: string, jobId: string) => void): this;
  public on(event: 'jobCompleted', listener: (jobName: string, jobId: string) => void): this;
  public on(event: 'jobFailed', listener: (jobName: string, jobId: string, err: Error) => void): this;
  public on(event: 'error', listener: (err: Error) => void): this;
  public on(event: string | symbol, listener: (...args: any[]) => void): this {
    return super.on(event, listener);
  }
}
