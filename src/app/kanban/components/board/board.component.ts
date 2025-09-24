import {Component, inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/app.state';
import {getTasksByStatus} from '../../store/task.selector';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-board',
  imports: [
    AsyncPipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  private store = inject(Store<AppState>);

  todoTasks$ = this.store.select(getTasksByStatus('todo'));
  inProgressTasks$ = this.store.select(getTasksByStatus('in-progress'));
  doneTasks$ = this.store.select(getTasksByStatus('done'));

  columns = [
    { title: 'TODO', status: 'todo', tasks: this.todoTasks$ },
    { title: 'In-Progress', status: 'in-progress', tasks: this.inProgressTasks$ },
    { title: 'Done', status: 'done', tasks: this.doneTasks$ },
  ];
}
