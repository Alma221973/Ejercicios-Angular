import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface ProductoDatos {
  id: number;
  codigo: string;
  nombre: string;
  precio: number;
  existencias: number;
}


@Component({
  imports: [],
  selector: 'app-producto',
  styleUrl: './producto.css',
  templateUrl: './producto.html',
})

export class Producto {

  productos: ProductoDatos [] = [];

  constructor (private router: Router) {

    if(localStorage.getItem('sesionTienda') !== 'si'){
      this.router.navigate(['/login']);
      return;
    }

    const datos = localStorage.getItem('productosTienda');

    if(datos){
      this.productos = JSON.parse(datos);
    }

  }

  cerrarSesion() {
    localStorage.removeItem('sesionTienda');
    this.router.navigate(['/login']);
  }
}
