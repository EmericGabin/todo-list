import { Component, OnInit } from '@angular/core';
import { Task } from '../shared/models/interfaces';
import { TaskState } from '../shared/models/enums';
import { TaskService } from '../shared/services/task.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditTaskModalComponent } from './edit-task-modal/edit-task-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private taskSvc: TaskService, private modalService: NgbModal){
    this.taskSvc.taskSubject.subscribe(task => this.getTasks())
  }

  task: string = "";
  listOfTask: Task[] = [];
  state: TaskState = TaskState.Completed;

  ngOnInit(): void {
    
  }

  getTasks(): void{
    this.taskSvc.getAll().subscribe(resultat => this.listOfTask = resultat);
  }

  onSaveTask() : void {
    let task = {
      name: this.task,
      dateCreated: new Date(),
      state: TaskState.InProgress
    } as Task;

    this.taskSvc.add(task);
    this.task = "";
  }

  onDeleteTask(task: Task) : void {
    this.taskSvc.delete(task);
  }

  onChangeStateTask(task: Task) : void {
    this.listOfTask.forEach(t => {
      if(JSON.stringify(t) === JSON.stringify(task)){
        if(t.state === TaskState.InProgress){
          t.state = TaskState.Completed;
          this.taskSvc.update(t);
        }
        else{
          t.state = TaskState.InProgress;
          this.taskSvc.update(t);
        }
      }
    })
  }

  openModal(task: Task){
    const modalRef = this.modalService.open(EditTaskModalComponent, { size: 'xl' });
    modalRef.componentInstance.onChangeTask(task);
    modalRef.componentInstance.taskUpdated.subscribe((task: Task) => {
      this.onTaskUpdated(task);
    });
  }

  onTaskUpdated(item: Task): void {
    this.taskSvc.update(item);
  }

  filterTask(state: string): void {
    this.getTasks();

    setTimeout(() => {
      if(state == 'In Progress')
        this.listOfTask = this.listOfTask.filter(task => task.state === TaskState.InProgress);
      else if(state == 'Completed')
        this.listOfTask = this.listOfTask.filter(task => task.state === TaskState.Completed);
      else
        this.getTasks(); // Default behaviour
    }, 150)

    console.log(this.listOfTask)
  }
}
