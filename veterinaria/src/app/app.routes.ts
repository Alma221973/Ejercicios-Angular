
import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Mascota } from './mascota/mascota';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'mascota', component: Mascota },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
