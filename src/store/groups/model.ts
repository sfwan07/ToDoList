import { UserViewModel } from "../model";

export interface GroupModel {
  id: number;
  name: string;
  users: number[];
  tasks: TaskModel[];
}

export interface GroupViewModel {
  id: number;
  name: string;
  users: number[];
  tasks: TaskViewModel[];
}

export interface TaskModel {
  task: string;
  duration: number;
}

export interface CreateTaskModel extends TaskModel {
  groupId: number;
}

export interface TaskViewModel {
  id: number;
  task: string;
  createAt: Date;
  duration: number;
  status: TaskStatus;
}

export interface GroupViewTable {
  key: number;
  task: string;
  status: TaskStatus;
  groupName: string;
  index: number;
}

export enum TaskStatus {
  open,
  progress,
  review,
  done,
}

export const nextStatus = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.open:
      return TaskStatus.progress;
    case TaskStatus.progress:
      return TaskStatus.review;
    case TaskStatus.review:
      return TaskStatus.done;

    default:
      return status;
  }
};
