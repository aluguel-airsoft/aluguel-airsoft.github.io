import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import BaseService from '../../../shared/services/base.service';
import {HttpClient} from '@angular/common/http';
import {Meta} from '../models/meta';
import {AuthService} from '../../../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MetasService extends BaseService {

  private urlApi = environment;

  constructor(private http: HttpClient, private authService: AuthService) {
    super();
  }

  get(): Observable<Meta[]> {
    const usuario = this.authService.getUsuario();
    const url = this.urlApi.url + '/Metas/GetMetas?idpessoa=' + usuario.pessoa.idProprio + '&idcanaldistribuicao=10';
    return this.http.get(url, {headers: this.getAuthHeaders()}).pipe(
      map((res: any) => {
        if (res.isValid) {
          return res.data;
        }
        return of([]);
      })
    );
  }

  /* TODO remover getMock() após integrar com a API */
  getMock(): Meta[] {
    return [
      {
        id: 1,
        descricao: 'Descartáveis e Afins',
        idProprio: '0001',
        sequencia: 0,
        idPessoa: 1,
        idGrupoCliente: 1,
        idCliente: 0,
        idEstado: 'SC',
        idCanalCliente: 10,
        idGrupoProduto: 1,
        idProdutoHierarquia: 1,
        qtdePlanejada: 1038290,
        qtdeRealizada: 100,
        valorPlanejado: 79000,
        valorRealizado: 70000,
        pesoPlanejado: 0,
        pesoRealizado: 0,
        dtValidadeInicial: new Date(),
        dtValidadeFinal: new Date(),
        idStatus: 1,
        dtCriacao: new Date(),
        dtModificacao: new Date(),
        idEmpresa: 'CISER',
        idRegional: 30,
        idMaterial: '10'
      },
      {
        id: 1,
        descricao: 'Soluções para Banheiros',
        idProprio: '0002',
        sequencia: 0,
        idPessoa: 1,
        idGrupoCliente: 1,
        idCliente: 0,
        idEstado: 'SC',
        idCanalCliente: 10,
        idGrupoProduto: 1,
        idProdutoHierarquia: 1,
        qtdePlanejada: 90000,
        qtdeRealizada: 90,
        valorPlanejado: 2000,
        valorRealizado: 1400,
        pesoPlanejado: 0,
        pesoRealizado: 0,
        dtValidadeInicial: new Date(),
        dtValidadeFinal: new Date(),
        idStatus: 1,
        dtCriacao: new Date(),
        dtModificacao: new Date(),
        idEmpresa: 'CISER',
        idRegional: 30,
        idMaterial: '20'
      },
      {
        id: 1,
        descricao: 'Produtos Químicos',
        idProprio: '0001',
        sequencia: 0,
        idPessoa: 1,
        idGrupoCliente: 1,
        idCliente: 0,
        idEstado: 'SC',
        idCanalCliente: 10,
        idGrupoProduto: 1,
        idProdutoHierarquia: 1,
        qtdePlanejada: 1038290,
        qtdeRealizada: 33,
        valorPlanejado: 79000,
        valorRealizado: 70000,
        pesoPlanejado: 0,
        pesoRealizado: 0,
        dtValidadeInicial: new Date(),
        dtValidadeFinal: new Date(),
        idStatus: 1,
        dtCriacao: new Date(),
        dtModificacao: new Date(),
        idEmpresa: 'Escola Int. de Joinville',
        idRegional: 10,
        idMaterial: '30'
      },
      {
        id: 1,
        descricao: 'Soluções para Banheiros',
        idProprio: '0001',
        sequencia: 0,
        idPessoa: 1,
        idGrupoCliente: 1,
        idCliente: 0,
        idEstado: 'SC',
        idCanalCliente: 10,
        idGrupoProduto: 1,
        idProdutoHierarquia: 1,
        qtdePlanejada: 1038290,
        qtdeRealizada: 100,
        valorPlanejado: 79000,
        valorRealizado: 70000,
        pesoPlanejado: 0,
        pesoRealizado: 0,
        dtValidadeInicial: new Date(),
        dtValidadeFinal: new Date(),
        idStatus: 1,
        dtCriacao: new Date(),
        dtModificacao: new Date(),
        idEmpresa: 'Escola Int. de Joinville',
        idRegional: 10,
        idMaterial: '20'
      },
      {
        id: 1,
        descricao: 'Produtos Químicos',
        idProprio: '0001',
        sequencia: 0,
        idPessoa: 1,
        idGrupoCliente: 1,
        idCliente: 0,
        idEstado: 'SC',
        idCanalCliente: 10,
        idGrupoProduto: 1,
        idProdutoHierarquia: 1,
        qtdePlanejada: 1038290,
        qtdeRealizada: 21,
        valorPlanejado: 79000,
        valorRealizado: 70000,
        pesoPlanejado: 0,
        pesoRealizado: 0,
        dtValidadeInicial: new Date(),
        dtValidadeFinal: new Date(),
        idStatus: 1,
        dtCriacao: new Date(),
        dtModificacao: new Date(),
        idEmpresa: 'Beto Carreiro World',
        idRegional: 20,
        idMaterial: '30'
      },
      {
        id: 1,
        descricao: 'Soluções para Banheiros',
        idProprio: '0001',
        sequencia: 0,
        idPessoa: 1,
        idGrupoCliente: 1,
        idCliente: 0,
        idEstado: 'SC',
        idCanalCliente: 10,
        idGrupoProduto: 1,
        idProdutoHierarquia: 1,
        qtdePlanejada: 1038290,
        qtdeRealizada: 40,
        valorPlanejado: 79000,
        valorRealizado: 70000,
        pesoPlanejado: 0,
        pesoRealizado: 0,
        dtValidadeInicial: new Date(),
        dtValidadeFinal: new Date(),
        idStatus: 1,
        dtCriacao: new Date(),
        dtModificacao: new Date(),
        idEmpresa: 'Beto Carreiro World',
        idRegional: 20,
        idMaterial: '20'
      },
      {
        id: 1,
        descricao: 'Descartáveis e Afins',
        idProprio: '0001',
        sequencia: 0,
        idPessoa: 1,
        idGrupoCliente: 1,
        idCliente: 0,
        idEstado: 'PR',
        idCanalCliente: 10,
        idGrupoProduto: 1,
        idProdutoHierarquia: 1,
        qtdePlanejada: 1038290,
        qtdeRealizada: 76,
        valorPlanejado: 79000,
        valorRealizado: 70000,
        pesoPlanejado: 0,
        pesoRealizado: 0,
        dtValidadeInicial: new Date(),
        dtValidadeFinal: new Date(),
        idStatus: 1,
        dtCriacao: new Date(),
        dtModificacao: new Date(),
        idEmpresa: 'Tigre',
        idRegional: 10,
        idMaterial: '10'
      },
      {
        id: 1,
        descricao: 'Descartáveis e Afins',
        idProprio: '0001',
        sequencia: 0,
        idPessoa: 1,
        idGrupoCliente: 1,
        idCliente: 0,
        idEstado: 'PR',
        idCanalCliente: 10,
        idGrupoProduto: 1,
        idProdutoHierarquia: 1,
        qtdePlanejada: 1038290,
        qtdeRealizada: 60,
        valorPlanejado: 79000,
        valorRealizado: 70000,
        pesoPlanejado: 0,
        pesoRealizado: 0,
        dtValidadeInicial: new Date(),
        dtValidadeFinal: new Date(),
        idStatus: 1,
        dtCriacao: new Date(),
        dtModificacao: new Date(),
        idEmpresa: 'Tigre',
        idRegional: 10,
        idMaterial: '10'
      }
    ];
  }

}
