import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './defer-views.component.html',
  styles: ``
})
export default class DeferViewsComponent {
  clienteForm: FormGroup;

  constructor() {
    this.clienteForm = new FormGroup({
      id: new FormControl(null, Validators.required),
      avatar_url: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      rol: new FormControl(null, Validators.required),
      user: new FormControl(null, [Validators.required, Validators.maxLength(25)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(256)]),
      direccion_cliente: new FormControl(null, Validators.required),
      telefono_cliente: new FormControl(null, Validators.required),
      nombre_empresa: new FormControl(null, Validators.required),
    });
  }
  onSubmit(): void {
    console.log(this.clienteForm.value);
  }
}
