import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';
import {ToastService} from '../../shared/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, ToastService {

  public esqueci = false;
  public loginForm: FormGroup;
  public isLoading: boolean;
  public emailRecuperacao: string;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
  }

  login(credenciais: any) {
    this.isLoading = true;
    this.authService.fazerLogin(credenciais).then((res) => {
      if (!res) {
        this.loginForm.reset();
        ToastService.ativarToast('Usuário ou senha inválidos. Tente novamente.');
      }
      this.isLoading = false;
    });
  }

  recuperarSenha(email: string) {
  }

  estaAutenticado(): boolean {
    return this.authService.estaAutenticado();
  }

  buildForm() {
    this.loginForm = this.fb.group({
      'username': [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(100)])]
    });
  }

  ngOnInit() {
    if (this.router.url === '/login' && this.estaAutenticado()) {
      this.router.navigate(['/dashboard']);
    } else {
      this.buildForm();
    }
  }

}
