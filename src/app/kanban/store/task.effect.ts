import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {addTask, loadTasksFailure, updateTask} from './task.action';
import {catchError, exhaustMap, map, of} from 'rxjs';
import {KanbanService} from '../../services/kanban.service';

@Injectable()
export class TaskEffects {

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTask),
      exhaustMap(({ task }) =>
        this.kanbanService.addTask(task).pipe(
          map(savedTask => updateTask({ task: savedTask })),
          catchError(error => of(loadTasksFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private kanbanService: KanbanService) {}
}
