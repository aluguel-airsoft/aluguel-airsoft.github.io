import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import BaseService from './base.service';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {Observable, Subscriber} from 'rxjs';
import {Estado} from '../models/estado';
import {AuthService} from './auth.service';
import {Bairro} from '../models/bairro';

@Injectable()
export class EstadoService extends BaseService {

  private urlApi = environment;

  constructor(private http: HttpClient, private authService: AuthService) {
    super();
  }

  get(idPai?: string): Observable<Estado[]> {
    if (localStorage.getItem('estados')) {
      return Observable.create((observer: Subscriber<Bairro[]>) => {
        observer.next(JSON.parse(localStorage.getItem('estados')));
        observer.complete();
      });
    } else {
      const url = this.urlApi.url + '/Cliente/GetFiltroCliente?idpessoa=' + this.authService.getUsuario();
      return this.http.get(url, {headers: this.getAuthHeaders()}).pipe(
        map((res: any) => {
          if (res.isValid) {
            localStorage.setItem('estados', JSON.stringify(res.data));
            return this.filtrar(res.data, idPai);
          }
        })
      );
    }
  }

  private filtrar(estados: Estado[], idPai?: string): Estado[] {
    if (idPai) {
      return estados.filter(estado => estado.idPai === idPai);
    }
    return estados;
  }

}
