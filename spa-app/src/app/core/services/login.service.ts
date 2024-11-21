import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs';

export interface LoginResponse {
  token: string;
  usuario: UsuarioD;
}

export interface UsuarioD {
  id: number;
  usuario: string;
  nombre: string;
  apellido: string;
  dni: number;
  competencia: string;
  fecha_nacimiento: Date;
  clave: string;
  push_token: string;
  correo: string;
  telefono: number;
  localidad: string;
  prefered_language: string;
  activo: number;
  fecha_hora_carga: Date;
  imagen_perfil: string;
  superadmin: number;
}

@Injectable({ providedIn: 'root' })
export class LoginService {
  //constructor(private readonly http: HttpClient) {}
  private readonly http = inject(HttpClient);
  // URL de nuestra API Rest
  private readonly url = 'http://localhost:3000/api/';

  login(email: string, pass: string) {
    const direction = this.url + 'usuarios/auth/login/';
    return this.http
      .post<{ ok: boolean; token: string; msg: string }>(direction, {
        email,
        pass,
      })
      .pipe(
        catchError((e) => {
          console.log(e);
          throw new Error(e);
        }),
        tap((data) => {
          console.log(data);
          localStorage.setItem('x-token', data.token);
        })
      );
  }
}
