import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {AuthService} from 'src/app/shared/services/auth.service';
import BaseService from 'src/app/shared/services/base.service';
import {Planejamento} from '../models/planejamento';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanejamentoService extends BaseService {

  private urlApi = environment;

  constructor(private http: HttpClient, private authService: AuthService) {
    super();
  }

  get(idPlanejamento?: number, periodo?: string): Observable<Planejamento[]> {
    // TODO: Esperando implementação no Back-end 
    // --------------------------------------------------------
    const usuario = this.authService.getUsuario();
    var url = this.urlApi.url + '/Planejamento?idpessoa=' + usuario.pessoa.idProprio + '&idcanaldistribuicao=' + usuario.idCanalDistribuicao;
    return this.http.get(url, {headers: this.getAuthHeaders()}).pipe(
      map((res: any) => {
        return res;
      })
    );
    // --------------------------------------------------------
  }

  delete(planejamento: Planejamento): any {
    return 'DELETE';
  }

  post(planejamento: Planejamento) {
    const url = this.urlApi.url + '/Planejamento/InsertOrUpdatePlanejamento';
    return this.http.post(url, planejamento, {headers: this.getAuthHeaders()}).pipe(
      map(res => res)
    );
  }


  getTipoVisita() {
    var obj = [{id: 6, descricao: 'TESTE'}, {id: 4, descricao: 'Teste 123'}];
    return obj;
    // TODO: Esperando implementação no Back-end 
    // --------------------------------------------------------
    // const url = this.urlApi.url + '/Planejamento/GetTipoVisita';
    // return this.http.get(url, { headers: this.getAuthHeaders() }).pipe(
    //   map((res: any) => {
    //     return res;
    //   })
    // );
    // --------------------------------------------------------
  }

}
