import {Injectable} from '@angular/core';
import {Cidade} from '../models/cidade';
import BaseService from './base.service';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, Subscriber} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class CidadeService extends BaseService {

  private urlApi = environment;

  constructor(private http: HttpClient, private authService: AuthService) {
    super();
  }

  get(idPai?: string): Observable<Cidade[]> {
    if (localStorage.getItem('cidades')) {
      return Observable.create((observer: Subscriber<Cidade[]>) => {
        observer.next(this.filtrar(JSON.parse(localStorage.getItem('cidades')), idPai));
        observer.complete();
      });
    } else {
      const url = this.urlApi.url + '/Cliente/GetFiltroCliente?idpessoa=' + this.authService.getUsuario();
      return this.http.get(url, {headers: this.getAuthHeaders()}).pipe(
        map((res: any) => {
          if (res.isValid) {
            localStorage.setItem('cidades', JSON.stringify(res.data));
            return this.filtrar(res.data, idPai);
          }
        })
      );
    }
  }

  private filtrar(cidades: Cidade[], idPai?: string): Cidade[] {
    if (idPai) {
      return cidades.filter(cidade => cidade.idPai === idPai);
    }
    return cidades;
  }

}
