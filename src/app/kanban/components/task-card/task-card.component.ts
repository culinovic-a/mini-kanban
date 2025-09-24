import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() updateTask = new EventEmitter<any>();
  @Output() deleteTask = new EventEmitter<any>();

  update(taskId: any): void {
    this.updateTask.emit(taskId);
  }

  delete(taskId: any): void {
    this.deleteTask.emit(taskId);
  }
}
