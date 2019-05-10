import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Planejamento, RecorrenciaVisita } from 'src/app/modulos/padrao/models/planejamento';
import { Subject } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FiltroPipe } from 'src/app/shared/pipes/filtro.pipe';
import { OrdenarPipe } from 'src/app/shared/pipes/ordenar.pipe';
import { PlanejamentoService } from 'src/app/modulos/padrao/services/planejamento.service';
import { MaterializeAction } from 'angular2-materialize';
import { FiltroPeriodoPipe } from 'src/app/shared/pipes/filtro-periodo.pipe';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-planejamento-grid',
  templateUrl: './planejamento-grid.component.html',
  styleUrls: ['./planejamento-grid.component.scss']
})
export class PlanejamentoGridComponent implements OnInit {


  @ViewChild('pesquisarInput') pesquisarInput: ElementRef;

  public qtdRegistros = 0;
  public isLoading = true;
  public pesquisar = false;
  public mensagemBusca = '';
  public valorPlanejado: number;
  public fimInfiniteScroll = false;
  public planejamento: Planejamento;
  public planejamentos: Planejamento[] = [];
  public listaPlanejamentos: Planejamento[] = [];
  public auxListaPlanejamentos: Planejamento[] = [];
  public modalPlanejamentoVenda = new EventEmitter<string | MaterializeAction>();

  public ordenarPorSelect = 'razaoSocial';
  public filtros = {
    dtInicial: '', dtFinal: '', cliente: [], empresas: [], status: [],
    ordenar: [
      {campo: 'status', label: 'Status'},
      {campo: 'idCliente', label: 'Cliente'},
      {campo: 'idEmpresa', label: 'Empresa'},
    ]
  };

  public barraTotal = {
    valorPlanejado: 0,
    valorRealizado: 0,
    cotacoes: 0,
    percentual: ''
  };
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
    private filtroPeriodoPipe: FiltroPeriodoPipe,
    private planejamentoService: PlanejamentoService,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.clienteParam = params['cliente'];
      this.get();
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public onClickDia() {
    this.get();
  }

  public onClickSemana() {
    this.get();
  }

  public onClickMes() {
    this.get();
  }

  public infiniteScroll() {
    this.addItens(this.qtdRegistros, this.qtdRegistros += 10);
  }

  public excluirPlanejamento(planejamento: Planejamento) {
    console.log(this.planejamentoService.delete(planejamento));
  }

  public abrirGoogleMaps(planejamento: Planejamento) {
    window.open(encodeURI('https://www.google.com/maps/place/') + planejamento, '_blank');
  }

  public abrirCliente(id: string) {
    this.router.navigate(['/clientes', { cliente: id }]);
  }

  public abrirOrdensCliente(id: string) {
    this.router.navigate(['/ordens', {cliente: id}]);
  }

  public criarOrdemCliente(planejamento: Planejamento) {
    this.router.navigate(['/ordens/pedido', { cliente: planejamento.idCliente }]);
  }

  public abrirTitulosCliente(id: string) {
    this.router.navigate(['/titulos', {cliente: id}]);
  }

  public abrirPesquisa() {
    this.pesquisar = !this.pesquisar;
    setTimeout(() => {
      this.pesquisarInput.nativeElement.focus();
    }, 0);
  }

  public fazerPesquisa(busca: string) {
    this.planejamentos = [];
    this.qtdRegistros = 0;
    if (busca.length > 0) {
      this.auxListaPlanejamentos = this.filtroPipe.transform(this.listaPlanejamentos, busca, 'razaoSocial');
      this.infiniteScroll();
    } else if (busca.length === 0) {
      this.auxListaPlanejamentos = this.listaPlanejamentos;
      this.infiniteScroll();
    }
  }

  public filtrar() {
    this.auxListaPlanejamentos = this.listaPlanejamentos;
    this.auxListaPlanejamentos = this.filtroPipe.transform(this.auxListaPlanejamentos, this.statusSelecionados.length > 0 ? this.statusSelecionados : null, 'status');
    this.auxListaPlanejamentos = this.filtroPipe.transform(this.auxListaPlanejamentos, this.empresasSelecionadas.length > 0 ? this.empresasSelecionadas : null, 'idEmpresa');
    this.auxListaPlanejamentos = this.filtroPeriodoPipe.transform(this.auxListaPlanejamentos, this.filtros.dtInicial ? this.filtros.dtInicial : null, 'dtPedido', 'maior');
    this.auxListaPlanejamentos = this.filtroPeriodoPipe.transform(this.auxListaPlanejamentos, this.filtros.dtFinal ? this.filtros.dtFinal : null, 'dtPedido', 'menor');
    this.auxListaPlanejamentos = this.ordenarPipe.transform(this.auxListaPlanejamentos, this.ordenarPorSelect ? this.ordenarPorSelect : null);
    this.auxListaPlanejamentos = this.ordenarPipe.transform(this.auxListaPlanejamentos, this.ordenarPorSelect);

    this.planejamentos = [];
    this.qtdRegistros = 0;
    this.infiniteScroll();
  }

  public limparFiltro() {
    this.planejamentos = [];
    this.qtdRegistros = 0;
    this.filtrar();
  }

  public planejarValor(valor: any) {
    valor = valor.replace(',', '.');
    this.planejamento.valorPlanejado = parseFloat(valor);
    this.calculaBarraTotal();
  }

  public openModalPlanejamentoVenda(planejamento: Planejamento) {
    this.planejamento = planejamento;
    this.modalPlanejamentoVenda.emit({action: 'modal', params: ['open']});
  }

  public funcTesteClass(planejamento: Planejamento) {
    // if (planejamento.naoVisita == 'HomeOffice') {
    //   planejamento.statusPlan = 'HomeOffice';
    //   return 'home-color';
    // } else if (planejamento.naoVisita == 'Justificado') {
    //   planejamento.statusPlan = 'Justificado';
    //   return 'yellow lighten-1';
    // } else if (planejamento.naoVisita == 'Não Justificado') {
    //   planejamento.statusPlan = 'Não Justificado';
    //   return 'orange';
    // } else if (planejamento.valorPlanejado <= 0) {
    //   planejamento.statusPlan = 'Não Planejado';
    //   return 'red lighten-1';
    // } else if (planejamento.valorPlanejado > 0) {
    //   planejamento.statusPlan = 'Planejado';
    //   return 'green';
    // }
  }

  public retornaRecorrencia(rec: number) {
    return RecorrenciaVisita[rec];
  }

  private get() {
    this.isLoading = true;
    this.mensagemBusca = 'Buscando planejamentos...';
    this.planejamentoService.get().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: Planejamento[]) => {
        this.listaPlanejamentos = this.filtrarPlanejamentosCliente(res);
        this.auxListaPlanejamentos = this.filtrarPlanejamentosCliente(res);
        this.calculaBarraTotal();
        this.infiniteScroll();
        this.isLoading = false;
        this.mensagemBusca = '';
      });
  }

  private filtrarPlanejamentosCliente(items: any): any {
    if (this.clienteParam) {
      return items.filter(item => {
        if (item['idCliente'].toString() === this.clienteParam.toString()) {
          return item;
        }
      });
    }
    return items;
  }

  private addItens(inicio: number, fim: number) {
    for (let cont = inicio; cont < fim; cont++) {
      if (this.auxListaPlanejamentos.hasOwnProperty(cont)) {
        this.planejamentos.push(this.auxListaPlanejamentos[cont]);
      } else {
        this.fimInfiniteScroll = true;
      }
    }
  }

  private calculaBarraTotal() {
    this.barraTotal = {
      valorPlanejado: 0,
      valorRealizado: 0,
      cotacoes: 0,
      percentual: ''
    };
    this.listaPlanejamentos.forEach(i => {
      this.barraTotal.valorPlanejado += i.valorPlanejado;
      this.barraTotal.valorRealizado += i.valorRealizado;
      // this.barraTotal.cotacoes += i.cotacao;
    });
    if (this.barraTotal.valorRealizado > 0 && this.barraTotal.valorPlanejado > 0) {
      this.barraTotal.percentual = ((this.barraTotal.valorRealizado * 100) / this.barraTotal.valorPlanejado).toFixed(2);
    }

  }

}
