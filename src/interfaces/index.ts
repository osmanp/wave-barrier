export interface WaveBarrierOptions {
  backend: 'redis' | 'mongodb' | 'postgresql';
  connectionString: string;
  concurrencyLimit?: number;
  queueAdapter?: 'bullmq' | 'agenda' | 'pg-boss';
}

export interface Task {
  id: string;
  payload: any;
}
