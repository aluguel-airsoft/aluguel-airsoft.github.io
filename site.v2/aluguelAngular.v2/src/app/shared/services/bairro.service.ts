import {Injectable} from '@angular/core';
import {Bairro} from '../models/bairro';
import BaseService from './base.service';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, Subscriber} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class BairroService extends BaseService {

  private urlApi = environment;

  constructor(private http: HttpClient, private authService: AuthService) {
    super();
  }

  get(idPai?: string): Observable<Bairro[]> {
    if (localStorage.getItem('bairros')) {
      return Observable.create((observer: Subscriber<Bairro[]>) => {
        observer.next(this.filtrar(JSON.parse(localStorage.getItem('bairros')), idPai));
        observer.complete();
      });
    } else {
      const url = this.urlApi.url + '/Cliente/GetFiltroCliente?idpessoa=' + this.authService.getUsuario();
      return this.http.get(url, {headers: this.getAuthHeaders()}).pipe(
        map((res: any) => {
          if (res.isValid) {
            localStorage.setItem('bairros', JSON.stringify(res.data));
            return this.filtrar(res.data, idPai);
          }
        })
      );
    }
  }

  private filtrar(bairros: Bairro[], idPai?: string): Bairro[] {
    if (idPai) {
      return bairros.filter(bairro => bairro.idPai === idPai);
    }
    return bairros;
  }

}
