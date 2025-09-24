import {createAction, props} from '@ngrx/store';
import { Task } from '../models/task.model';

export const loadTasksFailure = createAction('[Task API] Load Tasks Failure', props<{ error: any }>());

export const addTask = createAction('[Task] Add Task', props<{ task: Task }>());

export const fetchPriority = createAction('[Kanban] Fetch Priority', props<{ taskId: string }>());

export const fetchPrioritySuccess = createAction('[Kanban] Fetch Priority Success', props<{ taskId: string; priority: 'High' | 'Medium' | 'Low'}>());

export const fetchPriorityFailure = createAction('[Kanban] Fetch Priority Failure', props<{ taskId: string; error: string }>());

export const updateTask = createAction('[Task] Update Task]', props<{task: Task}>());

export const deleteTask = createAction('[Task] Delete ', props<{id: string}>());

export const updateTaskStatus = createAction('[Task] Move', props<{id: string, status: Task['status']}>());
