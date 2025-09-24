import { Routes } from '@angular/router';
import {BoardComponent} from './kanban/components/board/board.component';

export const routes: Routes = [
  {
    path: '',
    component: BoardComponent,
  }
];
