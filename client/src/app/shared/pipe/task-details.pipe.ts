import { Pipe, PipeTransform } from '@angular/core';
import { Task, User } from '../models/interfaces';
import { TaskState } from '../models/enums';
import { AuthService } from '../services/auth.service';

@Pipe({
  name: 'taskDetails'
})
export class TaskDetailsPipe implements PipeTransform {

  constructor(private authSvc: AuthService){}

  transform(task: Task): string {
    if (!task) return ''; // If the task is null or undefined, return an empty string
    const stateString = this.getStateString(task.state);
    console.log(task.assignedTo);
    const assignedToStr = `Assigned to: ${task.assignedTo.fullName}`;


    return `${task.name} - ${stateString} - ${assignedToStr}`;
  }

  private getStateString(state: TaskState): string {
    switch (state) {
      case TaskState.InProgress:
        return 'In Progress';
      case TaskState.Completed:
        return 'Completed';
      default:
        return 'Unknown';
    }
  }
}
