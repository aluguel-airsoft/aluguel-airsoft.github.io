import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {TitulosService} from '../../services/titulos.service';
import {Titulo} from '../../models/titulo';
import {TranslateService} from '@ngx-translate/core';
import {Cliente} from '../../models/cliente';
import {FiltroPipe} from '../../../../shared/pipes/filtro.pipe';
import {ClienteService} from '../../services/cliente.service';
import {MaterializeAction} from 'angular2-materialize';
import {ActivatedRoute} from '@angular/router';
import {FiltroPeriodoPipe} from '../../../../shared/pipes/filtro-periodo.pipe';
import {OrdenarPipe} from '../../../../shared/pipes/ordenar.pipe';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-titulos',
  templateUrl: './titulos.component.html',
  styleUrls: ['./titulos.component.scss']
})
export class TitulosComponent implements OnInit, OnDestroy {

  @ViewChild('pesquisarInput') pesquisarInput: ElementRef;

  public total = 0;
  public totalAVencer = 0;
  public qtdRegistros = 0;
  public totalVencidos = 0;
  public pesquisar = false;
  public isMobile = true;
  public isLoading = true;
  public titulos: Titulo[] = [];
  public clientes: Cliente[] = [];
  public ordenarPorSelect: string;
  public fimInfiniteScroll = false;
  public dtVencimentoAction = new EventEmitter<string | MaterializeAction>();
  public filtros = {
    checkVencidos: false, checkAVencer: false, cliente: null, dtVencimento: null,
    ordenar: [{campo: 'razaoSocial', label: 'Razão Social'}]
  };

  private clienteParam: string;
  private listaTitulos: Titulo[] = [];
  private auxListaTitulos: Titulo[] = [];
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    public titulo: Title,
    private route: ActivatedRoute,
    private filtroPipe: FiltroPipe,
    private ordenarPipe: OrdenarPipe,
    private translate: TranslateService,
    private titulosService: TitulosService,
    private clientesService: ClienteService,
    private filtroPeriodoPipe: FiltroPeriodoPipe) {
    titulo.setTitle(this.translate.instant('titulos.titulo'));
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

  public abrirDatePicker(): void {
    this.dtVencimentoAction.emit({action: 'pickadate', params: ['open']});
  }

  public abrirPesquisa(): void {
    this.pesquisar = !this.pesquisar;
    setTimeout(() => {
      if (window.screen.width <= 992) {
        this.isMobile = !this.isMobile;
      }
      this.pesquisarInput.nativeElement.focus();
    }, 0);
  }

  public fazerPesquisa(busca: string): void {
    this.titulos = [];
    this.qtdRegistros = 0;
    if (busca.length > 0) {
      this.auxListaTitulos = this.filtroPipe.transform(this.listaTitulos, busca, 'razaoSocial');
      this.infiniteScroll();
    } else if (busca.length === 0) {
      this.auxListaTitulos = this.listaTitulos;
      this.infiniteScroll();
    }
  }

  public filtrar(): void {
    const data = new Date();
    this.auxListaTitulos = this.listaTitulos;
    this.auxListaTitulos = this.filtroPeriodoPipe.transform(this.auxListaTitulos, this.filtros.checkVencidos ? data.getFullYear() + '-' + data.getMonth() + '-' + (data.getDate() - 1) : null, 'dtPlanejamento', 'menor');
    this.auxListaTitulos = this.filtroPeriodoPipe.transform(this.auxListaTitulos, this.filtros.checkAVencer ? data.getFullYear() + '-' + data.getMonth() + '-' + (data.getDate()) : null, 'dtPlanejamento', 'maior');
    this.auxListaTitulos = this.filtroPeriodoPipe.transform(this.auxListaTitulos, this.filtros.dtVencimento ? this.filtros.dtVencimento + 'T00:00:00' : null, 'dtPlanejamento', 'igual');
    this.auxListaTitulos = this.filtroPipe.transform(this.auxListaTitulos, this.filtros.cliente ? this.filtros.cliente : null, 'idCliente');
    this.auxListaTitulos = this.ordenarPipe.transform(this.auxListaTitulos, this.ordenarPorSelect ? this.ordenarPorSelect : null);

    this.titulos = [];
    this.qtdRegistros = 0;
    this.verificaDatainvalida();
    this.infiniteScroll();
  }

  public limparFiltro(): void {
    this.titulos = [];
    this.qtdRegistros = 0;
    this.filtros.cliente = null;
    this.filtros.checkAVencer = null;
    this.filtros.checkVencidos = null;
    this.filtros.dtVencimento = null;
    this.ordenarPorSelect = '';
    this.filtrar();
  }

  public infiniteScroll(): void {
    this.addItens(this.qtdRegistros, this.qtdRegistros += 10);
  }

  private get(): void {
    this.isLoading = true;
    this.titulosService.get().subscribe((titulos: Titulo[]) => {
      this.listaTitulos = this.filtrarTitulosCliente(titulos);
      this.auxListaTitulos = this.filtrarTitulosCliente(titulos);
      this.clientesService.get().subscribe((clientes: Cliente[]) => {
        this.clientes = clientes;
        this.infiniteScroll();
        this.verificaDatainvalida();
      });
    });
  }

  private filtrarTitulosCliente(res: any[]): any {
    if (this.clienteParam) {
      return res.filter(it => {
        if (it['idCliente'].toString() === this.clienteParam.toString()) {
          return it;
        }
      });
    }
    return res;
  }

  private calcularTotal(): void {
    this.total = 0;
    this.totalAVencer = 0;
    this.totalVencidos = 0;

    if (this.auxListaTitulos) {
      const dataVazia: Date = new Date(0);
      this.auxListaTitulos.forEach(titulo => {
        const data: Date = new Date(titulo.dtCompensacao) || dataVazia;
        this.total += titulo.montanteMoeda;
        if ((!data.getTime()) && titulo.diasAtraso >= 0) {
          this.totalVencidos += titulo.montanteMoeda;
        } else if (!data.getTime() && titulo.diasAtraso < 0) {
          this.totalAVencer += titulo.montanteMoeda;
        }
      });
      this.isLoading = false;
    }
  }

  private verificaDatainvalida(): void {
    this.auxListaTitulos.forEach(titulo => {
      if (new Date(titulo.dtCompensacao).getTime() < 0) {
        titulo.dtCompensacao = null;
      }
    });
    this.calcularTotal();
  }

  private addItens(inicio: number, fim: number): void {
    for (let cont = inicio; cont < fim; cont++) {
      if (this.auxListaTitulos.hasOwnProperty(cont)) {
        this.titulos.push(this.auxListaTitulos[cont]);
      } else {
        this.fimInfiniteScroll = true;
      }
    }
  }

}
