
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface MascotaDatos {
  id: number;
  nombre: string;
  especie: string;
  edad: number;
  propietario: string;
}

@Component({
  selector: 'app-mascota',
  imports: [FormsModule],
  templateUrl: './mascota.html',
  styleUrl: './mascota.css'
})
export class Mascota {

  mascotas: MascotaDatos[] = [];

  nombre = '';
  especie = '';
  edad: number | null = null;
  propietario = '';
  indiceEditar = -1;

  constructor(private router: Router) {

    if (localStorage.getItem('sesionVeterinaria') !== 'si') {
      this.router.navigate(['/login']);
      return;
    }

    const datos = localStorage.getItem('mascotasVeterinaria');

    if (datos) {
      this.mascotas = JSON.parse(datos);
    }
  }

  editar(indice: number) {
    const mascota = this.mascotas[indice];

    this.nombre = mascota.nombre;
    this.especie = mascota.especie;
    this.edad = mascota.edad;
    this.propietario = mascota.propietario;

    this.indiceEditar = indice;
  }


  guardar() {
    if (!this.nombre.trim() ||
      !this.especie.trim() ||
      this.edad === null ||
      !this.propietario.trim()) {
      alert('Complete todos los campos');
      return;
    }

    if (!Number.isInteger(this.edad) || this.edad < 0) {
      alert('La edad debe ser un número entero mayor o igual a cero');
      return;
    }

    if (this.indiceEditar === -1) {

      const nuevoId = this.mascotas.length > 0
        ? Math.max(...this.mascotas.map(mascota => mascota.id)) + 1
        : 1;

      const nuevaMascota: MascotaDatos = {
        id: nuevoId,
        nombre: this.nombre.trim(),
        especie: this.especie.trim(),
        edad: this.edad,
        propietario: this.propietario.trim()
      };

      this.mascotas.push(nuevaMascota);

    } else {

      this.mascotas[this.indiceEditar].nombre = this.nombre.trim();
      this.mascotas[this.indiceEditar].especie = this.especie.trim();
      this.mascotas[this.indiceEditar].edad = this.edad;
      this.mascotas[this.indiceEditar].propietario = this.propietario.trim();

    }

    this.guardarEnLocalStorage();
    this.limpiar();
  }


  guardarEnLocalStorage() {
    localStorage.setItem(
      'mascotasVeterinaria',
      JSON.stringify(this.mascotas)
    );
  }

  limpiar() {
    this.nombre = '';
    this.especie = '';
    this.edad = null;
    this.propietario = '';
    this.indiceEditar = -1;
  }

  cerrarSesion() {
    localStorage.removeItem('sesionVeterinaria');
    this.router.navigate(['/login']);
  }
}
