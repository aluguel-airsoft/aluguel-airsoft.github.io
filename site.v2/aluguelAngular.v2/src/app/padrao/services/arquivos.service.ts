import {Injectable} from '@angular/core';
import {Arquivo} from '../models/arquivo';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import BaseService from '../../../shared/services/base.service';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArquivosService extends BaseService {

  private urlApi = environment;

  constructor(private http: HttpClient) {
    super();
  }

  get(): Observable<Arquivo[]> {
    const url = this.urlApi.url + '/GerenciadorArquivo/listfiles';
    return this.http.get(url, {headers: this.getAuthHeaders()}).pipe(
      map((res: any) => {
        if (res.isValid) {
          return res.data;
        }
        return of([]);
      })
    );
  }

  download(item: string): any {
    const url = this.urlApi.url + '/GerenciadorArquivo/downloadfile/' + item;
    return this.http.get(url, {headers: this.getAuthHeaders()}).pipe(
      map((res: any) => {
        if (res.isValid) {
          return res.data;
        }
        return null;
      })
    );
  }
}
