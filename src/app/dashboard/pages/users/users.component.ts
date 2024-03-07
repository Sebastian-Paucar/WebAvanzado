import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TareasService } from '../../../services/tareas.service';
import { Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './users.component.html',
  styles: ``
})
export default class UsersComponent implements OnInit, OnDestroy {
  tareasForm!: FormGroup;
  tareasSubscription: Subscription | undefined;

  constructor(private fb: FormBuilder, private tareasService: TareasService) {
    this.tareasForm = this.fb.group({
      nombre_tarea: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion_tarea: ['', Validators.required],
      fechainicio: ['', Validators.required],
      fechafin: ['']
    });
  }

  ngOnInit(): void {
    // Empieza a observar los cambios en las tareas
    this.startObservingTareasChanges();
  }

  ngOnDestroy(): void {
    // Cancela la suscripción al destruir el componente para evitar memory leaks
    if (this.tareasSubscription) {
      this.tareasSubscription.unsubscribe();
    }
  }

  onSubmit(): void {
    if (this.tareasForm.valid) {
      console.log('Formulario de Tareas:', this.tareasForm.value);
      this.tareasService.insertarTarea(this.tareasForm);
      this.tareasForm.reset();
    } else {
      console.log('Formulario no válido');
    }
  }

  private startObservingTareasChanges(): void {
    // Crea una suscripción que se actualiza cada 5 segundos y verifica los cambios en las tareas
    this.tareasSubscription = interval(5000).pipe(
      switchMap(() => this.tareasService.obtenerTareas())
    ).subscribe(tareas => {
      console.log('Tareas actualizadas:', tareas);
      // Aquí puedes realizar cualquier acción que necesites con las tareas actualizadas,
      // como actualizar la vista del componente.
    });
  }
}
