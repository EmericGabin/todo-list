import { ObjectId } from "mongoose";

export class Task {
    name: string;
    dateCreated: Date;
    state: string;
    createdBy: Object;
    assignedTo: Object
}
