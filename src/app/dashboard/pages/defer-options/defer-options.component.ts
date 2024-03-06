import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './defer-options.component.html',
  styles: ``
})
export default class DeferOptionsComponent {
  equiposForm: FormGroup;

  constructor() {
    // Inicializa el formulario con estructura y validaciones básicas
    this.equiposForm = new FormGroup({
      id_equipo: new FormControl(null, Validators.required),
      id_informe: new FormControl(null),
      nombre_equipo: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      marca_equipo: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      modelo_equipo: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      serie_equipo: new FormControl(null, Validators.maxLength(25)),
      refrigerante_equipo: new FormControl(null, Validators.maxLength(25)),
      voltaje_equipo: new FormControl(null, Validators.required),
      presionA_equipo: new FormControl(null, Validators.required),
      presionB_equipo: new FormControl(null, Validators.required),
      Amperaje_equipo: new FormControl(null, Validators.required),
    });
  }
  onSubmit(): void {
    if (this.equiposForm.valid) {
      console.log(this.equiposForm.value);
      // Aquí iría la lógica para procesar los datos del formulario, como enviarlos a un backend.
    }
  }
}
