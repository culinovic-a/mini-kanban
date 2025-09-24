import {createReducer, on} from '@ngrx/store';
import {TaskState} from './task.state';
import {addTask, deleteTask, fetchPrioritySuccess, updateTask, updateTaskStatus} from './task.action';
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
  on(updateTask, (state, {task}) => {
    return {
      ...state,
      tasks: state.tasks.map(t => t.id === task.id ? task : t),
    }
  }),
  on(deleteTask, (state, {id}) => {
    return {
      ...state,
      tasks: state.tasks.filter(t => t.id !== id)
    }
  }),
  on(updateTaskStatus, (state, {id, status}) => {
    return {
      ...state,
      tasks: state.tasks.map(t => t.id === id ? {...t, status} : t)
    }
  })
)
