import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createClient, PostgrestResponse, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  insertarTarea(tareaForm: FormGroup) {
    if (tareaForm.valid) {
      const { nombre_tarea, descripcion_tarea, fechainicio, fechafin } = tareaForm.value;
      const id_tarea = this.generarUUID();
      this.supabase
        .from('tareas')
        .insert([{ id_tarea, nombre_tarea, descripcion_tarea, fechainicio, fechafin }])
        .then(response => {
          console.log('Tarea insertada correctamente:', response);
        })

    } else {
      console.log('Formulario no válido');
    }
  }
  private generarUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  async obtenerTareas() {
    const { data } = await this.supabase.from('tareas')
      .select();
    return data;
  }

  async eliminarTareaPorId(idTarea: string) {
    return this.supabase.from('tareas').delete().eq('id_tarea', idTarea);
  }
}
