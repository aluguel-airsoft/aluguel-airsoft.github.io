import BaseService from './base.service';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import { Usuario } from 'src/app/padrao/models/usuario';

@Injectable()

export class AuthService extends BaseService {

  private urlApi = environment;

  constructor(private http: HttpClient, private router: Router) {
    super();
  }

  public fazerLogout(): void {
    this.router.navigate(['/login']);
    sessionStorage.removeItem('usuario');
    localStorage.removeItem('authentication');
    sessionStorage.removeItem('authentication');
  }

  public fazerLogin(model: { usuario: string, senha: string }): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = this.urlApi.url + `/Account/Login`;
      this.http.post(url, model, {headers: this.getAuthHeaders()})
        .subscribe((res: any) => {
          if (res.isValid) {
            this.setAutentificacao(res, false);
            resolve(true);
          }
          reject();
        });
    });
  }

  public getUsuario(): Usuario {
    if (localStorage.getItem('authentication') || sessionStorage.getItem('authentication')) {
      return JSON.parse(sessionStorage.getItem('usuario')).data;
    } else {
      this.fazerLogout();
    }
  }

  public estaAutenticado(): boolean {
    if (sessionStorage.getItem('usuario')) {
      return true;
    } else if (this.router.url !== '/' && this.router.url !== '/login') {
      this.fazerLogout();
    }
    return false;
  }

  private setUsuario(): void {
    const url = this.urlApi.url + `/Account/getUser`;
    this.http.get(url, {headers: this.getAuthHeaders()})
      .subscribe((usuario: any) => {
        usuario.data.idCanalDistribuicao = 10;
        sessionStorage.setItem('usuario', JSON.stringify(usuario));
        if (this.router.url === '/login') {
          this.router.navigate(['/dashboard']);
        }
      });
  }

  private getAutentificacao(): any {
    return JSON.parse(sessionStorage.getItem('authentication'));
  }

  private setAutentificacao(autentificacao: any, lembrar: boolean): void {
    lembrar ? localStorage.setItem('authentication', JSON.stringify(autentificacao)) : sessionStorage.setItem('authentication', JSON.stringify(autentificacao));
    this.setUsuario();
  }

  private refreshTokens(): void {
    const url = this.urlApi.url + '/account/refreshToken';
    const auth = this.getAutentificacao();
    const usuario = this.getUsuario().username;

    if (auth.isValid) {
      this.http.post(url, {username: usuario, refresh_token: auth.data.refresh_token}, {headers: this.getAuthHeaders()}).pipe(
        map(res => res)
      ).subscribe((autentificacao: any) => {
        if (autentificacao.isValid) {
          this.setAutentificacao(autentificacao, false);
        }
      });
    } else {
      this.fazerLogout();
    }
  }

}
