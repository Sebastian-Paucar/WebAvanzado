import { Component, OnDestroy, OnInit } from '@angular/core';
import { TareasService } from '../../../services/tareas.service';
import { Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './view-transition.component.html',
  styles: ``
})
export default class ViewTransitionComponent implements OnInit, OnDestroy {
  tareas: any = [];
  tareasSubscription: Subscription | undefined;

  constructor(private tareasService: TareasService) { }

  ngOnInit(): void {
    // Comienza a observar las tareas con una actualización periódica
    this.startObservingTareas();
  }

  ngOnDestroy(): void {
    // Cancela la suscripción al destruir el componente para evitar memory leaks
    if (this.tareasSubscription) {
      this.tareasSubscription.unsubscribe();
    }
  }

  private startObservingTareas(): void {
    // Crea una suscripción que se actualiza cada 5 segundos y verifica los cambios en las tareas
    this.tareasSubscription = interval(1000).pipe(
      switchMap(() => this.tareasService.obtenerTareas())
    ).subscribe(tareas => {

      this.tareas = tareas; // Actualiza las tareas en el componente
    });
  }

  async eliminar(idTarea: string): Promise<void> {
    await this.tareasService.eliminarTareaPorId(idTarea);
  }
}
