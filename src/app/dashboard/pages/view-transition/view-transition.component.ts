import { Component } from '@angular/core';
import { TareasService } from '../../../services/tareas.service';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './view-transition.component.html',
  styles: ``
})
export default class ViewTransitionComponent {
  tareas:any = [];

  constructor(private tareasService: TareasService) { }
  ngOnInit(): void {
    this.obtenerTareas();
  }

  async obtenerTareas() {
    this.tareas = await this.tareasService.obtenerTareas();
    console.log(this.tareas = await this.tareasService.obtenerTareas());
  }
  async eliminar(idTarea: string){
    this.tareasService.eliminarTareaPorId(idTarea);
    this.obtenerTareas();
  }

}
