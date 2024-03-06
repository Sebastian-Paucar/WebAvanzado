import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TitleComponent } from '../../../shared/title/title.component';
import { Router, RouterModule } from '@angular/router';
@Component({
  standalone: true,
  imports: [TitleComponent, CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './change-detection.component.html',
  styles: ``
})
export default class ChangeDetectionComponent {
  empleadoForm!: FormGroup;
  previewUrl!: string | ArrayBuffer | null;
  constructor(private fb: FormBuilder,
    private router: Router) {

  this.empleadoForm = this.fb.group({
    id:  fb.control(null, Validators.required),
    avatar_url:  fb.control(null, Validators.required),
    correo:  fb.control(null, [Validators.required, Validators.email]),
    rol:  fb.control(null, [Validators.required, Validators.pattern(/^(Cliente|Empleado|Administrador)$/)]),
    user:  fb.control(null, [Validators.required, Validators.maxLength(25)]),
    password:  fb.control(null, [Validators.required, Validators.minLength(8), Validators.maxLength(256)]),
    nombre_empleado:  fb.control(null, [Validators.required, Validators.maxLength(50)]),
    apellido_empleado:  fb.control(null, [Validators.required, Validators.maxLength(50)]),
  });
}
  ngOnInit(): void {
  }

  onSubmit(): void {
    // Aquí manejar la lógica de envío del formulario, como enviar los datos a un servidor.
    console.log(this.empleadoForm.value);
  }
  onFileSelect(event:any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      // Asegurar que el archivo es de tipo imagen
      if (file.type.match(/image\/(jpg|jpeg|png)/)) {
        const reader = new FileReader();
        reader.onload = (e) => this.previewUrl = reader.result;
        reader.readAsDataURL(file);
      } else {
        alert('Solo se permiten imágenes en formato JPG o PNG.');
        this.resetAvatarInput();
      }
    }
  }
  resetAvatarInput(): void {
    this.previewUrl = null;
    // Opcionalmente, resetear el input del archivo aquí si es necesario
  }


}
