import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface LibroDatos {
  id: number;
  codigo: string;
  titulo: string;
  autor: string;
  anio: number;
}

@Component({
  imports: [],
  selector: 'app-libro',
  styleUrl: './libro.css',
  templateUrl: './libro.html',
})

export class Libro {

  libros: LibroDatos[] = [];

  constructor(private router: Router) {

    if(localStorage.getItem('sesionBiblioteca') !== 'si') {
      this.router.navigate(['/login']);
      return;
    }

    const datos = localStorage.getItem('librosBiblioteca');

    if (datos) {
      this.libros = JSON.parse(datos);
    }
  }
    cerrarSesion() {
    localStorage.removeItem('sesionBiblioteca');
    this.router.navigate(['/login']);
  }
}