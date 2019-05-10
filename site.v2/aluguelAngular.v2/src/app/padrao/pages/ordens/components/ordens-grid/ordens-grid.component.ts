import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {OrdensService} from 'src/app/modulos/padrao/services/ordens.service';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {MaterializeAction} from 'angular2-materialize';
import {FiltroPipe} from '../../../../../../shared/pipes/filtro.pipe';
import {OrdenarPipe} from '../../../../../../shared/pipes/ordenar.pipe';
import {FiltroPeriodoPipe} from '../../../../../../shared/pipes/filtro-periodo.pipe';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-ordens-grid',
  templateUrl: './ordens-grid.component.html',
  styleUrls: ['./ordens-grid.component.scss']
})
export class OrdensGridComponent implements OnInit, OnDestroy {

  public isLoading: boolean;
  public searchText: string;
  public pesquisarInput = false;
  public fimInfiniteScroll = false;
  public ordens: any[] = [];
  public listaOrdens: any[] = [];
  public auxListaOrdens: any[] = [];
  public filtros = {
    dtInicial: '', dtFinal: '', empresas: [], status: [],
    ordenar: [
      {campo: 'status', label: 'Status'},
      {campo: 'idCliente', label: 'Cliente'},
      {campo: 'idEmpresa', label: 'Empresa'},
    ]
  };
  public ordenarPorSelect: string;
  public selects = {status: [], empresas: []};
  public dtFinalAction = new EventEmitter<string | MaterializeAction>();
  public dtInicialAction = new EventEmitter<string | MaterializeAction>();

  private qtdRegistros = 0;
  private clienteParam: string;
  private statusSelecionados: string[] = [];
  private empresasSelecionadas: string[] = [];
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    public titulo: Title,
    private router: Router,
    private route: ActivatedRoute,
    private filtroPipe: FiltroPipe,
    private ordenarPipe: OrdenarPipe,
    public translate: TranslateService,
    private ordensService: OrdensService,
    private filtroPeriodoPipe: FiltroPeriodoPipe) {
    titulo.setTitle(translate.instant('status-ordens.titulo'));
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.clienteParam = params['cliente'];
      this.get();
      this.loadSelects();
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public verItensOrdem(ordem): void {
    const infoOrdem = {
      idClienteJForce: ordem.idClienteJForce,
      cliente: ordem.cliente,
      numeroOrdemJForce: ordem.numeroOrdemJForce,
      documentoVenda: ordem.documentoVenda
    };
    if ((infoOrdem.documentoVenda || infoOrdem.numeroOrdemJForce) && infoOrdem.idClienteJForce && infoOrdem.cliente) {
      this.router.navigate(['./ordens/detalhes/' + btoa(JSON.stringify(infoOrdem))]);
    } else {
      console.log('Dados insuficiêntes.');
    }
  }

  public abrirDatePicker(item: string): void {
    this[item].emit({action: 'pickadate', params: ['open']});
  }

  public filtrar(): void {
    this.auxListaOrdens = this.listaOrdens;
    this.auxListaOrdens = this.filtroPipe.transform(this.auxListaOrdens, this.statusSelecionados.length > 0 ? this.statusSelecionados : null, 'status');
    this.auxListaOrdens = this.filtroPipe.transform(this.auxListaOrdens, this.empresasSelecionadas.length > 0 ? this.empresasSelecionadas : null, 'idEmpresa');
    this.auxListaOrdens = this.filtroPeriodoPipe.transform(this.auxListaOrdens, this.filtros.dtInicial ? this.filtros.dtInicial : null, 'dtPedido', 'maior');
    this.auxListaOrdens = this.filtroPeriodoPipe.transform(this.auxListaOrdens, this.filtros.dtFinal ? this.filtros.dtFinal : null, 'dtPedido', 'menor');
    this.auxListaOrdens = this.ordenarPipe.transform(this.auxListaOrdens, this.ordenarPorSelect ? this.ordenarPorSelect : null);

    this.ordens = [];
    this.qtdRegistros = 0;
    this.infiniteScroll();
  }

  public limparFiltro(): void {
    this.ordens = [];
    this.qtdRegistros = 0;
    this.filtros.dtFinal = null;
    this.filtros.dtInicial = null;
    this.selects.status = null;
    this.selects.empresas = null;
    this.statusSelecionados = [];
    this.empresasSelecionadas = [];
    this.ordenarPorSelect = '';
    this.filtrar();
  }

  public infiniteScroll(): void {
    this.addItems(this.qtdRegistros, this.qtdRegistros += 10);
  }

  public selecionarEmpresa(evento: string[]): void {
    this.empresasSelecionadas = evento;
  }

  public selecionarStatus(evento: string[]): void {
    this.statusSelecionados = evento;
  }

  private get(): void {
    this.isLoading = true;
    this.ordensService.get().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(ordens => {
        this.listaOrdens = this.filtrarOrdensCliente(ordens);
        this.auxListaOrdens = this.filtrarOrdensCliente(ordens);
        this.infiniteScroll();
        this.isLoading = false;
      });
  }

  private loadSelects(): void {
    /* TODO: Fazer as requisições para a API quando estiverem prontas */
    this.filtros.status = [
      {id: 'PEDIDO APROVADO AUTOMATICAMENTE', descricao: 'PEDIDO APROVADO AUTOMATICAMENTE'},
      {id: 'PEDIDO EM ANÁLISE COMERCIAL', descricao: 'PEDIDO EM ANÁLISE COMERCIAL'}
    ];

    this.filtros.empresas = [
      {id: 1000, razaoSocial: 'Empresa 1000'},
      {id: 2000, razaoSocial: 'Empresa 2000'}
    ];
  }

  private filtrarOrdensCliente(items: any[]): any {
    if (this.clienteParam) {
      return items.filter(item => {
        if (item['idClienteJForce'].toString() === this.clienteParam.toString()) {
          return item;
        }
      });
    }
    return items;
  }

  private addItems(inicio: number, fim: number): void {
    for (let cont = inicio; cont < fim; cont++) {
      if (this.auxListaOrdens.hasOwnProperty(cont)) {
        this.ordens.push(this.auxListaOrdens[cont]);
      } else {
        this.fimInfiniteScroll = true;
      }
    }
  }
}
