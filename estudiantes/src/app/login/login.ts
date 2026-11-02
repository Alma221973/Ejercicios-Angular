
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
    if (this.usuario === 'registro' &&
        this.clave === 'alumnos123') {

      localStorage.setItem('sesionEstudiantes', 'si');
      this.router.navigate(['/estudiante']);

    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }
}
