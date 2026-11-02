
import { Component } from '@angular/core';
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
  imports: [],
  templateUrl: './mascota.html',
  styleUrl: './mascota.css'
})
export class Mascota {

  mascotas: MascotaDatos[] = [];

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

  cerrarSesion() {
    localStorage.removeItem('sesionVeterinaria');
    this.router.navigate(['/login']);
  }
}
