import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface ProductoDatos {
  id: number;
  codigo: string;
  nombre: string;
  precio: number;
  existencias: number;
}


@Component({
  imports: [FormsModule],
  selector: 'app-producto',
  styleUrl: './producto.css',
  templateUrl: './producto.html',
})

export class Producto {

  productos: ProductoDatos[] = [];
  codigo = '';
  nombre = '';
  precio: number | null = null;
  existencias: number | null = null;

  indiceEditar = -1;


  constructor(private router: Router) {

    if (localStorage.getItem('sesionTienda') !== 'si') {
      this.router.navigate(['/login']);
      return;
    }

    const datos = localStorage.getItem('productosTienda');

    if (datos) {
      this.productos = JSON.parse(datos);
    }

  }

  eliminar(indice: number) {
    if (confirm('¿Eliminar este producto?')) {
      this.productos.splice(indice, 1);
      this.guardarEnLocalStorage();
      this.limpiar();
    }
  }

  editar(indice: number) {
    const producto = this.productos[indice];

    this.codigo = producto.codigo;
    this.nombre = producto.nombre;
    this.precio = producto.precio;
    this.existencias = producto.existencias;

    this.indiceEditar = indice;
  }


  guardar() {
    if (!this.codigo.trim() ||
      !this.nombre.trim() ||
      this.precio === null ||
      this.existencias === null) {
      alert('Complete todos los campos');
      return;
    }

    if (!Number.isFinite(this.precio) || this.precio <= 0) {
      alert('El precio debe ser mayor que cero');
      return;
    }

    if (!Number.isInteger(this.existencias) ||
      this.existencias < 0) {
      alert('Las existencias deben ser un entero mayor o igual a cero');
      return;
    }

    if (this.indiceEditar === -1) {

      const nuevoId = this.productos.length > 0
        ? Math.max(...this.productos.map(producto => producto.id)) + 1
        : 1;

      const nuevoProducto: ProductoDatos = {
        id: nuevoId,
        codigo: this.codigo.trim(),
        nombre: this.nombre.trim(),
        precio: this.precio,
        existencias: this.existencias
      };

      this.productos.push(nuevoProducto);

    } else {

      this.productos[this.indiceEditar].codigo = this.codigo.trim();
      this.productos[this.indiceEditar].nombre = this.nombre.trim();
      this.productos[this.indiceEditar].precio = this.precio;
      this.productos[this.indiceEditar].existencias = this.existencias;

    }

    this.guardarEnLocalStorage();
    this.limpiar();
  }


  guardarEnLocalStorage() {
    localStorage.setItem(
      'productosTienda',
      JSON.stringify(this.productos)
    );
  }

  limpiar() {
    this.codigo = '';
    this.nombre = '';
    this.precio = null;
    this.existencias = null;
    this.indiceEditar = -1;
  }

  cerrarSesion() {
    localStorage.removeItem('sesionTienda');
    this.router.navigate(['/login']);
  }
}
