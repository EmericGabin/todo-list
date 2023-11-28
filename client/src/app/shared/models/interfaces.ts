import { TaskState } from "./enums";

export interface Task {
  _id: string
  name: string,
  dateCreated: Date,
  state: TaskState,
}

export interface User {
  _id: string,
  fullName: string,
  email: string,
  password: string,
}