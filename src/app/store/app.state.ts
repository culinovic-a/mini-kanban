import { TaskState } from "../kanban/store/task.state"
import {taskReducer} from '../kanban/store/task.reducer';

export interface AppState {
  tasks: TaskState
}

export const AppReducer = {
  tasks: taskReducer
}
