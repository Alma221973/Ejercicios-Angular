import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Producto } from './producto/producto';

export const routes: Routes = [
    {path: 'login', component: Login},
    {path: 'producto', component: Producto},
    {path: "", redirectTo: 'login', pathMatch: 'full'},
    {path: "**", redirectTo: 'login'}
];
