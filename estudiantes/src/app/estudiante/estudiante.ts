
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  imports: [FormsModule],
  templateUrl: './estudiante.html',
  styleUrl: './estudiante.css'
})
export class Estudiante {

  estudiantes: EstudianteDatos[] = [];

  cuenta = '';
  nombre = '';
  carrera = '';
  fechaIngreso = '';
  indiceEditar = -1;

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

  editar(indice: number) {
  const estudiante = this.estudiantes[indice];

  this.cuenta = estudiante.cuenta;
  this.nombre = estudiante.nombre;
  this.carrera = estudiante.carrera;
  this.fechaIngreso = estudiante.fechaIngreso;

  this.indiceEditar = indice;
 }

 
guardar() {
  if (!this.cuenta.trim() ||
      !this.nombre.trim() ||
      !this.carrera.trim() ||
      !this.fechaIngreso) {
    alert('Complete todos los campos');
    return;
  }

  if (this.indiceEditar === -1) {

    const nuevoId = this.estudiantes.length > 0
      ? Math.max(...this.estudiantes.map(e => e.id)) + 1
      : 1;

    const nuevoEstudiante: EstudianteDatos = {
      id: nuevoId,
      cuenta: this.cuenta.trim(),
      nombre: this.nombre.trim(),
      carrera: this.carrera.trim(),
      fechaIngreso: this.fechaIngreso
    };

    this.estudiantes.push(nuevoEstudiante);

  } else {

    this.estudiantes[this.indiceEditar].cuenta = this.cuenta.trim();
    this.estudiantes[this.indiceEditar].nombre = this.nombre.trim();
    this.estudiantes[this.indiceEditar].carrera = this.carrera.trim();
    this.estudiantes[this.indiceEditar].fechaIngreso = this.fechaIngreso;

  }

  this.guardarEnLocalStorage();
  this.limpiar();
}


  guardarEnLocalStorage() {
    localStorage.setItem(
      'registrosEstudiantes',
      JSON.stringify(this.estudiantes)
    );
  }

  limpiar() {
    this.cuenta = '';
    this.nombre = '';
    this.carrera = '';
    this.fechaIngreso = '';
    this.indiceEditar = -1;
  }

  cerrarSesion() {
    localStorage.removeItem('sesionEstudiantes');
    this.router.navigate(['/login']);
  }
}
