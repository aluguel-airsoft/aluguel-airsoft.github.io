import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import BaseService from 'src/app/shared/services/base.service';
import {AuthService} from '../../../shared/services/auth.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ItemPedido} from '../models/item-pedido';
import {RetornoPedido} from '../models/retorno-pedido';

@Injectable({
  providedIn: 'root'
})
export class OrdensService extends BaseService {

  private urlApi = environment;
  private usuario = this.authService.getUsuario();

  constructor(private http: HttpClient, private authService: AuthService) {
    super();
  }

  get(): Observable<any[]> {
    const datainicial = '2017-09-09';
    const datafinal = '2019-03-16';
    const url = this.urlApi.url + '/RetornoOrdem/GetStatusOrdemAsync?idpessoa=' + this.usuario.pessoa.idProprio + '&datainicial=' + datainicial + '&datafinal=' + datafinal + '&idcanaldistribuicao=' + this.usuario.idCanalDistribuicao;
    return this.http.get(url, {headers: this.getAuthHeaders()})
      .pipe(
        map((res: any) => {
          return res.data;
        })
      );
  }

  post(ordem: RetornoPedido) {
    const url = this.urlApi.url + '/OrdemSalvar/InsertOrUpdateOrdemVenda';
    return this.http.post(url, ordem, {headers: this.getAuthHeaders()}).pipe(
      map(res => res)
    );
  }

  getById(): Observable<any[]> {
    // /RetornoOrdem/GetStatusOrdemAsync?idpessoa={idpessoa}&datainicial={datainicial}&datafinal={datafinal}&idcanaldistribuicao=10
    const datainicial = '2017-09-09';
    const datafinal = '2019-03-16';
    return null;
  }

  getDetalhes(numeroOrdemJForce: string): Observable<any[]> {
    const url = this.urlApi.url + '/RetornoOrdem/GetStatusOrdemDetalheAsync?numeroordem=' + numeroOrdemJForce;
    return this.http.get(url, {headers: this.getAuthHeaders()})
      .pipe(
        map((res: any) => {
          return res.data;
        })
      );
  }

  getLancamentos(idtipoordem: string): Observable<any[]> {
    const url = this.urlApi.url + '/OrdemItem/GetItemLancamento?idtipoordem=' + idtipoordem;
    return this.http.get(url, {headers: this.getAuthHeaders()})
      .pipe(
        map((res: any) => {
          return res.data;
        })
      );
  }

  getCatalogo(idclientejforce: number, idtipoordem: string): Observable<any[]> {
    const url = this.urlApi.url + '/OrdemItem/GetItemVendaAsync?idclientejforce=' + idclientejforce + '&idtipoordem=' + idtipoordem;
    return this.http.get(url, {headers: this.getAuthHeaders()})
      .pipe(
        map((res: any) => {
          return res.data;
        })
      );
  }

  getCampanha(idclientejforce: number): Observable<any[]> {
    const url = this.urlApi.url + '/OrdemItem/GetCampanhaAsync?idclientejforce=' + idclientejforce;
    return this.http.get(url, {headers: this.getAuthHeaders()})
      .pipe(
        map((res: any) => {
          return res.data;
        })
      );
  }

  getNumOrdem() {
    const idpessoa = this.usuario.pessoa.idProprio;
    const url = this.urlApi.url + '/OrdemCabecalho/GetNumeroOrdemJForce/' + idpessoa;
    return this.http.get(url, {headers: this.getAuthHeaders()})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getOrdemVenda(idclientejforce: number, nrOrdem: String) {
    const url = this.urlApi.url + '/OrdemSalvar/GetOrdemVenda?idclientejforce=' + idclientejforce + '&nroordemjforce=' + nrOrdem;
    return this.http.get(url, {headers: this.getAuthHeaders()})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getTipoOrdens(idclientejforce: number) {
    const url = this.urlApi.url + '/OrdemCabecalho/GetTipoOrdemAsync/' + idclientejforce;
    return this.http.get(url, {headers: this.getAuthHeaders()})
      .pipe(
        map((res: any) => {
          return res.data;
        })
      );
  }

  getFormaPagamento() {
    const url = this.urlApi.url + '/OrdemCabecalho/GetFormaPagamentoAsync';
    return this.http.get(url, {headers: this.getAuthHeaders()})
      .pipe(
        map((res: any) => {
          return res.data;
        })
      );
  }

  getCondPagamento(idclientejforce: number) {
    const url = this.urlApi.url + '/OrdemCabecalho/GetCondicaoPagamentoAsync?idclientejforce=' + idclientejforce;
    return this.http.get(url, {headers: this.getAuthHeaders()})
      .pipe(
        map((res: any) => {
          return res.data;
        })
      );
  }

  postItemRascunho(item: ItemPedido) {
    const url = this.urlApi.url + '/OrdemSalvar/InsertOrUpdateRascunho';
    return this.http.post(url, item, {headers: this.getAuthHeaders()}).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  postItemRascunhoValor(item: ItemPedido) {
    const url = this.urlApi.url + '/OrdemSalvar/InsertOrUpdateRascunhoValor';
    return this.http.post(url, item, {headers: this.getAuthHeaders()}).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  postRemoverItemRascunho(item: ItemPedido) {
    var url = this.urlApi.url + '/OrdemSalvar/DeleteRascunho';
    url += '?nroordemjforce=' + item.nroOrdemJForce + '&nroitem=' + item.nroItem + '&idtipoordem=' + item.idTipoOrdem;
    return this.http.post(url, item, {headers: this.getAuthHeaders()}).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

}
