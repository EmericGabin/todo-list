import { TaskState } from "./enums";

export interface Task {
    _id: string
    name: string,
    dateCreated: Date,
    state: TaskState,
  }