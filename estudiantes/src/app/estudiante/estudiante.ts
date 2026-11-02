
import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface EstudianteDatos {
  id: number;
  cuenta: string;
  nombre: string;
  carrera: string;
  fechaIngreso: string;
}

@Component({
  selector: 'app-estudiante',
  imports: [],
  templateUrl: './estudiante.html',
  styleUrl: './estudiante.css'
})
export class Estudiante {

  estudiantes: EstudianteDatos[] = [];

  constructor(private router: Router) {

    if (localStorage.getItem('sesionEstudiantes') !== 'si') {
      this.router.navigate(['/login']);
      return;
    }

    const datos = localStorage.getItem('registrosEstudiantes');

    if (datos) {
      this.estudiantes = JSON.parse(datos);
    }
  }

  cerrarSesion() {
    localStorage.removeItem('sesionEstudiantes');
    this.router.navigate(['/login']);
  }
}
