import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user.component.html',
  styles: ``
})
export default class UserComponent {
  tareasForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.tareasForm = this.fb.group({
      nombre_tarea: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion_tarea: ['', Validators.required],
      fechaInicio_tarea: ['', Validators.required],
      fechjaFin_tarea: [''] // Nota: fechjaFin_tarea parece tener un error tipográfico, considera corregirlo a fechaFin_tarea tanto aquí como en el HTML.
    });

}
  onSubmit(): void {
    if (this.tareasForm.valid) {
      console.log('Formulario de Tareas:', this.tareasForm.value);
      // Aquí iría la lógica para procesar los datos del formulario, como enviarlos a un backend.
    } else {
      console.log('Formulario no válido');
    }
  }
}
