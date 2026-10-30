
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface LibroDatos {
  id: number;
  codigo: string;
  titulo: string;
  autor: string;
  anio: number;
}

@Component({
  selector: 'app-libro',
  imports: [FormsModule],
  templateUrl: './libro.html',
  styleUrl: './libro.css'
})
export class Libro {

  libros: LibroDatos[] = [];
  
  //Crear
  codigo = '';
  titulo = '';
  autor = '';
  anio: number | null = null;
  //
  constructor(private router: Router) {

    if (localStorage.getItem('sesionBiblioteca') !== 'si') {
      this.router.navigate(['/login']);
      return;
    }

    const datos = localStorage.getItem('librosBiblioteca');

    if (datos) {
      this.libros = JSON.parse(datos);
    }
  }
  
  //Crear
  guardar() {

    if (!this.codigo.trim() ||
        !this.titulo.trim() ||
        !this.autor.trim() ||
        this.anio === null) {
      alert('Complete todos los campos');
      return;
    }

    if (!Number.isInteger(this.anio) ||
        this.anio < 1000 ||
        this.anio > 9999) {
      alert('El año debe ser entero entre 1000 y 9999');
      return;
    }

    const nuevoId = this.libros.length > 0
      ? Math.max(...this.libros.map(libro => libro.id)) + 1
      : 1;

    const nuevoLibro: LibroDatos = {
      id: nuevoId,
      codigo: this.codigo.trim(),
      titulo: this.titulo.trim(),
      autor: this.autor.trim(),
      anio: this.anio
    };

    this.libros.push(nuevoLibro);
    this.guardarEnLocalStorage();
    this.limpiar();
  }

  guardarEnLocalStorage() {
    localStorage.setItem(
      'librosBiblioteca',
      JSON.stringify(this.libros)
    );
  }

  limpiar() {
    this.codigo = '';
    this.titulo = '';
    this.autor = '';
    this.anio = null;
  } 
  //

  cerrarSesion() {
    localStorage.removeItem('sesionBiblioteca');
    this.router.navigate(['/login']);
  }
}
