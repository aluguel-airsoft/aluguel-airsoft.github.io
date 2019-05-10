import {Injectable} from '@angular/core';
import {Cliente} from '../models/cliente';
import {Contato} from '../models/contato';
import {HttpClient} from '@angular/common/http';
import BaseService from '../../../shared/services/base.service';
import {environment} from '../../../../environments/environment';
import {AuthService} from '../../../shared/services/auth.service';
import {ClassificacaoCliente} from '../models/classificacao-cliente';
import {map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteNovoService extends BaseService {

  private urlApi = environment;

  constructor(private http: HttpClient, private authService: AuthService) {
    super();
  }

  get(): Observable<Cliente[]> {
    const usuario = this.authService.getUsuario();
    const url = this.urlApi.url + '/Cliente/GetCliente?idpessoa=' + usuario.pessoa.idProprio + '&idcanaldistribuicao=' + usuario.idCanalDistribuicao;
    return this.http.get(url, {headers: this.getAuthHeaders()}).pipe(
      map((res: any) => {
        if (res.data) {
          return res.data;
        }
        return of([]);
      })
    );
  }

  post(cliente: Cliente): Observable<any> {
    const url = this.urlApi.url + '/ClienteNovo/InsertOrUpdateCliente';
    return this.http.post(url, cliente, {headers: this.getAuthHeaders()}).pipe(
      map((res: any) => {
        if (res.data) {
          return res.data;
        }
        return of([]);
      })
    );
  }

  put(cliente: Cliente): any {
    const url = this.urlApi.url + '/ClienteNovo/InsertOrUpdateCliente';
    return this.http.put(url, cliente, {headers: this.getAuthHeaders()}).pipe(
      map((res: any) => {
        if (res.data) {
          return res.data;
        }
        return of([]);
      })
    );
  }

  delete(numeroClienteJForce: string): Observable<any> {
    const url = this.urlApi.url + '/ClienteNovo/DeleteCliente?numeroClienteJForce=' + numeroClienteJForce;
    return this.http.delete(url, {headers: this.getAuthHeaders()}).pipe(
      map((res: any) => {
        if (res.data) {
          return res.data;
        }
        return of([]);
      })
    );
  }

  getClassificacaoCliente(): Observable<ClassificacaoCliente[]> {
    const url = this.urlApi.url + '/ClienteNovo/GetClassificacaoCliente';
    return this.http.get(url, {headers: this.getAuthHeaders()}).pipe(
      map((res: any) => {
        if (res.data) {
          return res.data;
        }
        return of([]);
      })
    );
  }

  getClienteContato(numeroClienteJForce: string): any {
    const url = this.urlApi.url + '/ClienteNovo/GetClienteContato?numeroClienteJForce=' + numeroClienteJForce;
    return this.http.get(url, {headers: this.getAuthHeaders()}).pipe(
      map((res: any) => {
        if (res.data) {
          return res.data;
        }
        return of([]);
      })
    );
  }

  postClienteContato(contato: Contato): any {
    const url = this.urlApi.url + '/ClienteNovo/InsertOrUpdateContato';
    return this.http.post(url, contato, {headers: this.getAuthHeaders()}).pipe(
      map((res: any) => {
        if (res.data) {
          return res.data;
        }
        return of([]);
      })
    );
  }

  putClienteContato(contato: Contato): any {
    const url = this.urlApi.url + '/ClienteNovo/InsertOrUpdateContato';
    return this.http.post(url, contato, {headers: this.getAuthHeaders()}).pipe(
      map((res: any) => {
        if (res.data) {
          return res.data;
        }
        return of([]);
      })
    );
  }

  deleteClienteContato(numeroContatoJForce: Contato): any {
    const url = this.urlApi.url + '/ClienteNovo/DeleteCliente?numeroContatoJForce=' + numeroContatoJForce;
    return this.http.delete(url, {headers: this.getAuthHeaders()}).pipe(
      map((res: any) => {
        if (res.data) {
          return res.data;
        }
        return of([]);
      })
    );
  }

}
