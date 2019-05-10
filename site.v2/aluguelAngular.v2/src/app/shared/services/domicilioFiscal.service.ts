import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import BaseService from './base.service';

@Injectable()
export class DomicilioFiscalService extends BaseService {

  private urlApi = environment;

  constructor(private http: HttpClient) {
    super();
  }

  get(cep: string, idEstado: string): Observable<any> {
    const url = this.urlApi.url + '/ClienteNovo/GetDomicilioFiscal?idestado=' + idEstado + '&cep=' + cep;
    return this.http.get(url, {headers: this.getAuthHeaders()}).pipe(
      map(res => res)
    );
  }

}
