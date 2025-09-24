import {Component, inject, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/app.state';
import {getTaskById, getTasksByStatus} from '../../store/task.selector';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {addTask, deleteTask, updateTask, updateTaskStatus} from '../../store/task.action';
import { Task } from '../../models/task.model';
import {TaskCardComponent} from '../task-card/task-card.component';
import {Subscription} from 'rxjs';
import {CdkDrag, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-board',
  imports: [
    AsyncPipe,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    TaskCardComponent,
    CdkDrag,
    CdkDropList
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnDestroy {
  private store = inject(Store<AppState>);
  todoTasks$ = this.store.select(getTasksByStatus('todo'));
  inProgressTasks$ = this.store.select(getTasksByStatus('in-progress'));
  doneTasks$ = this.store.select(getTasksByStatus('done'));
  columns = [
    { title: 'TODO', status: 'todo', tasks: this.todoTasks$ },
    { title: 'In-Progress', status: 'in-progress', tasks: this.inProgressTasks$ },
    { title: 'Done', status: 'done', tasks: this.doneTasks$ },
  ];
  taskForm: FormGroup;
  isTaskBeingUpdated: boolean = false;
  taskSubscription!: Subscription;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      if (this.isTaskBeingUpdated) {
        const task = this.taskForm.value;
        this.store.dispatch(updateTask({task}));
      } else {
        const task = { title: this.taskForm.value.title } as Task;
        this.store.dispatch(addTask({ task }));
      }
      this.taskForm.reset();
    }
  }

  updateTask(taskId: string): void {
    this.isTaskBeingUpdated = true;
    this.taskSubscription = this.store.select(getTaskById(taskId)).subscribe(task => {
      this.taskForm.addControl('id', this.fb.control(task?.id));
      this.taskForm.addControl('status', this.fb.control(task?.status));
      this.taskForm.addControl('priority', this.fb.control(task?.priority));
      this.taskForm.patchValue({title: task?.title});
    });
  }

  deleteTask(taskId: string): void {
    this.store.dispatch(deleteTask({id: taskId}));
  }

  ngOnDestroy() {
    if(this.taskSubscription) {
      this.taskSubscription.unsubscribe();
    }
  }

  onTaskDropped(event: any) {
    const task = event.item.data;
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    const newStatus = event.container.id;
    this.store.dispatch(updateTaskStatus({id: task.id, status: newStatus}));
  }

  getConnectedLists(currentStatus: string): string[] {
    return this.columns.map(c => c.status).filter(s => s !== currentStatus);
  }

}
