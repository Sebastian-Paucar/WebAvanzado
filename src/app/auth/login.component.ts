import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
})
export default class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: fb.control('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      password: fb.control('', [Validators.required ]),
    });
  }

  public async onSubmit() {
    try {
      const res = await this.auth.signIn(this.loginForm.value.email, this.loginForm.value.password);
      if (res.error) {
        console.error('Error de inicio de sesión:', res.error.message);
        // Aquí podrías, por ejemplo, mostrar un mensaje de error en la interfaz de usuario.
        return;
      }
      // Verifica si hay un usuario y luego verifica el rol del usuario.
      // Asegúrate de que el objeto de usuario y la lógica de roles sean correctos según tu implementación.
      // La siguiente línea asume que la estructura de `res` contiene un usuario directamente.
      // Es posible que necesites ajustar esto según cómo tu método `signIn` estructura la respuesta.
      if (res.user && res.user.role === 'authenticated') {
        this.router.navigate(['/dashboard']);
      } else {
        // Manejar el caso de que el usuario no esté autenticado o no haya información de rol
        console.error('El usuario no está autenticado o no tiene rol.');
      }
    } catch (err) {
      console.error('Error de inicio de sesión:', err);
      // Aquí también podrías manejar el error mostrando un mensaje de error en la interfaz de usuario.
    }
  }
  
  isValidField(field:string): boolean | null{
    return this.loginForm.controls[field].errors && this.loginForm.controls[field].touched;
  }

  getFieldsError(field:string): string | null{
    if ( !this.loginForm.controls[field].errors ) return null;
    const errors = this.loginForm.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Minimo  ${ errors['minlength'].requiredLength}  caracteres`;

      }
    }

    return '';
  }


}
