import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService, UsuarioD } from '../core/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  // constructor(private readonly loginService: LoginService) {}
  private readonly loginService = inject(LoginService);
  private readonly router = inject(Router);

  ngOnInit() {
    localStorage.clear();
  }

  login() {
    const a = this.loginService.login(this.usuario, this.clave).subscribe({
      next: (data) => {},
      error: (e: any) => {
        console.log(e);
        alert('Error de login ' + JSON.stringify(e));
      },
      complete: () => {
        this.router.navigate(['/home']);
      },
    });
  }

  usuario!: string;
  clave!: string;
}
