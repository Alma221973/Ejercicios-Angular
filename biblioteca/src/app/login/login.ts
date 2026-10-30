import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  usuario = '';
  clave = '';

  constructor (private router: Router) {}

  iniciarSesion() {
    if (this.usuario === 'bibliotecario' && this.clave === 'biblio123') {
      localStorage.setItem('sesionBiblioteca', 'si');
      alert('Sesión iniciada correctamente');
     } else {
      alert('Usuario o contraseña incorrectos')
    }
  }
}
