import {Injectable} from '@angular/core';
import {Titulo} from '../models/titulo';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import BaseService from 'src/app/shared/services/base.service';
import {AuthService} from '../../../shared/services/auth.service';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TitulosService extends BaseService {

  private urlApi = environment;

  constructor(private http: HttpClient, private authService: AuthService) {
    super();
  }

  get(): Observable<Titulo[]> {
    const url = this.urlApi.url + '/DocumentoContabil/GetDocumentoContabil?idpessoa=' + this.authService.getUsuario().pessoa.idProprio + '&idcanaldistribuicao=10';
    return this.http.get(url, {headers: this.getAuthHeaders()}).pipe(
      map((res: any) => {
        /* TODO: Corrigir após a resolução do Bug #351 */
        return res;
        if (res.isValid) {
          return res.data;
        }
        return of([]);
      })
    );
  }
}
