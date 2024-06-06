export enum TaskStatus {
  NO_FINISHED = 0,
  FINISHED = 1
}

export interface ITaskItem {
  id: number;
  content: string;
  status: TaskStatus;
}
