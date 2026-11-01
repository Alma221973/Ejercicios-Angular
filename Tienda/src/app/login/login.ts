
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {

  usuario = '';
  clave = '';

  constructor(private router: Router) {}

  iniciarSesion() {
    if (this.usuario === 'vendedor' && this.clave === 'tienda123') {

      localStorage.setItem('sesionTienda', 'si');
      this.router.navigate(['/producto']);

    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }
}
