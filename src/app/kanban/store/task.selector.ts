import {createFeatureSelector, createSelector} from '@ngrx/store';
import { TaskState } from './task.state';

export const getTasksState = createFeatureSelector<TaskState>('tasks');

export const getTasksByStatus = (status: string) => createSelector(getTasksState, state => state.tasks.filter((task) => task.status === status));

export const getTaskById = (id: string) => createSelector(getTasksState, state => state.tasks.find((task) => task.id === id));
