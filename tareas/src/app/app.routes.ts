
import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Tarea } from './tarea/tarea';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'tarea', component: Tarea },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
