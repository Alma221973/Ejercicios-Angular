
import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface TareaDatos {
  id: number;
  titulo: string;
  descripcion: string;
  fechaLimite: string;
  estado: string;
}

@Component({
  selector: 'app-tarea',
  imports: [],
  templateUrl: './tarea.html',
  styleUrl: './tarea.css'
})
export class Tarea {

  tareas: TareaDatos[] = [];

  constructor(private router: Router) {

    if (localStorage.getItem('sesionTareas') !== 'si') {
      this.router.navigate(['/login']);
      return;
    }

    const datos = localStorage.getItem('agendaTareas');

    if (datos) {
      this.tareas = JSON.parse(datos);
    }
  }

  cerrarSesion() {
    localStorage.removeItem('sesionTareas');
    this.router.navigate(['/login']);
  }
}
