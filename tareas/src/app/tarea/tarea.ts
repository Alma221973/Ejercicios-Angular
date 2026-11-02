
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  imports: [FormsModule],
  templateUrl: './tarea.html',
  styleUrl: './tarea.css'
})
export class Tarea {

  tareas: TareaDatos[] = [];

  titulo = '';
  descripcion = '';
  fechaLimite = '';
  estado = 'Pendiente';
  indiceEditar = -1;

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

  editar(indice: number) {
    const tarea = this.tareas[indice];

    this.titulo = tarea.titulo;
    this.descripcion = tarea.descripcion;
    this.fechaLimite = tarea.fechaLimite;
    this.estado = tarea.estado;

    this.indiceEditar = indice;
  }

  eliminar(indice: number) {
    if (confirm('¿Eliminar esta tarea?')) {
      this.tareas.splice(indice, 1);
      this.guardarEnLocalStorage();
      this.limpiar();
    }
  }
  guardar() {
    if (!this.titulo.trim() ||
      !this.descripcion.trim() ||
      !this.fechaLimite) {
      alert('Complete todos los campos');
      return;
    }

    if (this.estado !== 'Pendiente' &&
      this.estado !== 'Completada') {
      alert('Seleccione un estado válido');
      return;
    }

    if (this.indiceEditar === -1) {

      const nuevoId = this.tareas.length > 0
        ? Math.max(...this.tareas.map(tarea => tarea.id)) + 1
        : 1;

      const nuevaTarea: TareaDatos = {
        id: nuevoId,
        titulo: this.titulo.trim(),
        descripcion: this.descripcion.trim(),
        fechaLimite: this.fechaLimite,
        estado: this.estado
      };

      this.tareas.push(nuevaTarea);

    } else {

      this.tareas[this.indiceEditar].titulo = this.titulo.trim();
      this.tareas[this.indiceEditar].descripcion = this.descripcion.trim();
      this.tareas[this.indiceEditar].fechaLimite = this.fechaLimite;
      this.tareas[this.indiceEditar].estado = this.estado;

    }

    this.guardarEnLocalStorage();
    this.limpiar();
  }


  guardarEnLocalStorage() {
    localStorage.setItem(
      'agendaTareas',
      JSON.stringify(this.tareas)
    );
  }

  limpiar() {
    this.titulo = '';
    this.descripcion = '';
    this.fechaLimite = '';
    this.estado = 'Pendiente';
    this.indiceEditar = -1;
  }

  cerrarSesion() {
    localStorage.removeItem('sesionTareas');
    this.router.navigate(['/login']);
  }
}
