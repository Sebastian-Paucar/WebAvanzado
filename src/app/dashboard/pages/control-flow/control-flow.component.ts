import { Component, signal } from '@angular/core';
import { TitleComponent } from '../../../shared/title/title.component';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill';
@Component({
  standalone: true,
  imports: [TitleComponent, CommonModule, ReactiveFormsModule, RouterModule,QuillModule],
  templateUrl: './control-flow.component.html',
  styles: ``
})
export default class ControlFlowComponent {
  informeForm!: FormGroup;
  constructor(private fb: FormBuilder) {

    this.informeForm = this.fb.group({
      id_informe: [null, Validators.required],
      fecha_informe: [null, Validators.required],
      procedimiento_informe: [null, Validators.required],
      desarrollo_informe: [null, Validators.required],
      concluciones_informe: [null, Validators.required],
      imagenes: this.fb.array([])
    });
  }

  get imagenes(): FormArray {
    return this.informeForm.get('imagenes') as FormArray;
  }

  nuevaImagen(): FormGroup {
    return this.fb.group({
      archivo: [null, Validators.required],
      descripcion: [null, Validators.required]
    });
  }

  agregarImagen(): void {
    this.imagenes.push(this.nuevaImagen());
  }

  eliminarImagen(index: number): void {
    this.imagenes.removeAt(index);
  }

  onSubmit(): void {
    console.log(this.informeForm.value);
    // Aquí manejar la lógica de envío del formulario, como enviar los datos a un servidor.
  }


}
