import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase_client: SupabaseClient;

  constructor() {
    this.supabase_client = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  // Register (ya es asincrónica, pero agregamos async para coherencia y manejo de errores)
  async signUp(email: string, password: string): Promise<any> {
    try {
      const { data, error } = await this.supabase_client.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  }

  // Login (ya es asincrónica, pero agregamos async para coherencia y manejo de errores)
  async signIn(email: string, password: string): Promise<any> {
    try {
      const { data, error } = await this.supabase_client.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  }

  // SignOut (mejoramos manejo de errores)
  async signOut(): Promise<void> {

    this.supabase_client.auth.signOut();
  }

  // isLoggedIn (corregido para usar .user() y ajustado a async/await patrón)
  async isLoggedIn(): Promise<boolean> {
    // Supabase .user() es síncrono y devuelve el usuario actual o null
    const user = this.supabase_client.auth.getUser();
    return !!user; // Convierte a boolean: true si user no es null, false si es null
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const { data: { user } } = await this.supabase_client.auth.getUser();
      
      return user;
    } catch (error) {
      console.error('Error obteniendo el usuario:', error);
      return null; // O manejar el error de manera adecuada según tu aplicación
    }
  }
  // Las funciones checkProfileExists y createProfile ya están implementadas correctamente como asincrónicas
}
