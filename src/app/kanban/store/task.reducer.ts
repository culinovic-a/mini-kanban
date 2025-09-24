import {createReducer, on} from '@ngrx/store';
import {TaskState} from './task.state';
import {addTask, fetchPrioritySuccess} from './task.action';
import { Task } from '../models/task.model';
import { v4 as uuidv4 } from 'uuid';

export const initialState: TaskState = {
  tasks: [],
}

export const taskReducer = createReducer(
  initialState,
  on(addTask, (state, { task }) => {
    const newTask: Task = {
      id: uuidv4(),
      title: task.title,
      status: 'todo',
      loadingPriority: true,
      errorPriority: false
    };
    return {
      ...state,
      tasks: [...state.tasks, newTask]
    };
  }),

)
