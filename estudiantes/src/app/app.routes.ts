
import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Estudiante } from './estudiante/estudiante';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'estudiante', component: Estudiante },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
