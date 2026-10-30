
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

  //Editar
  indiceEditar = -1;
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

  //Editar
  editar(indice: number) {
    const libro = this.libros[indice];

    this.codigo = libro.codigo;
    this.titulo = libro.titulo;
    this.autor = libro.autor;
    this.anio = libro.anio;

    this.indiceEditar = indice;
  }
  //

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

    if (this.indiceEditar === -1) {

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

    } else {

      this.libros[this.indiceEditar].codigo = this.codigo.trim();
      this.libros[this.indiceEditar].titulo = this.titulo.trim();
      this.libros[this.indiceEditar].autor = this.autor.trim();
      this.libros[this.indiceEditar].anio = this.anio;

    }

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
    this.indiceEditar = -1; //Editar
  } 
  //

  //Eliminar
  eliminar(indice: number) {
  if (confirm('¿Eliminar este libro?')) {
    this.libros.splice(indice, 1);
    this.guardarEnLocalStorage();
    this.limpiar();
    }
  }
  //

  cerrarSesion() {
    localStorage.removeItem('sesionBiblioteca');
    this.router.navigate(['/login']);
  }
}
