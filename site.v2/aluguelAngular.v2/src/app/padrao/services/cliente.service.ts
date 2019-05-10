import {Injectable} from '@angular/core';
import {Cliente} from '../models/cliente';
import {Contato} from '../models/contato';
import {HttpClient} from '@angular/common/http';
import BaseService from '../../../shared/services/base.service';
import {environment} from '../../../../environments/environment';
import {AuthService} from '../../../shared/services/auth.service';
import {map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends BaseService {

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

  getById(idCliente: number): Observable<Cliente> {
    const usuario = this.authService.getUsuario();
    const url = this.urlApi.url + '/Cliente/GetCliente?idpessoa=' + usuario.pessoa.idProprio + '&idcanaldistribuicao=' + usuario.idCanalDistribuicao + '&idcliente=' + idCliente;
    return this.http.get(url, {headers: this.getAuthHeaders()}).pipe(
      map((res: any) => {
        if (res.data) {
          return res.data;
        }
        return of([]);
      })
    );
  }

  getClienteContato(idCliente: string): Observable<Contato[]> {
    const url = this.urlApi.url + '/Cliente/GetClienteContato?idcliente=' + idCliente;
    return this.http.get(url, {headers: this.getAuthHeaders()}).pipe(
      map((res: any) => {
        if (res.data) {
          return res.data;
        }
        return of([]);
      })
    );
  }

}
