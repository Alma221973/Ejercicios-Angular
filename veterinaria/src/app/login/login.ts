
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  usuario = '';
  clave = '';

  constructor(private router: Router) {}

  iniciarSesion() {
    if (this.usuario === 'veterinario' &&
        this.clave === 'mascotas123') {

      localStorage.setItem('sesionVeterinaria', 'si');
      this.router.navigate(['/mascota']);

    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }
}
