import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {MetasService} from '../../services/metas.service';
import {FiltroPipe} from '../../../../shared/pipes/filtro.pipe';
import {Meta} from '../../models/meta';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Cliente} from '../../models/cliente';
import {ClienteService} from '../../services/cliente.service';
import {Estado} from '../../../../shared/models/estado';
import {EstadoService} from '../../../../shared/services/estado.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-metas',
  templateUrl: './metas.component.html',
  styleUrls: ['./metas.component.scss']
})
export class MetasComponent implements OnInit, OnDestroy {

  @ViewChild('pesquisarInput') pesquisarInput: ElementRef;

  public isLoading = false;
  public pesquisar: boolean;
  public metas: Meta[] = [];
  public listaMetas: Meta[] = [];
  public auxListaMetas: Meta[] = [];
  public fimInfiniteScroll: boolean;
  public estados: Estado[] = [];
  public clientes: Cliente[] = [];
  public empresas: any[] = [];
  public materiais: any[] = [];
  public regionais: any[] = [];
  public filtros = {clientes: [], empresas: [], estados: [], materiais: [], regionais: []};

  private qtdRegistros = 0;
  private estadosSelecionados: string[] = [];
  private empresasSelecionadas: string[] = [];
  private clientesSelecionados: string[] = [];
  private regionaisSelecionadas: string[] = [];
  private materiaisSelecionados: string[] = [];
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(public titulo: Title,
              private filtroPipe: FiltroPipe,
              private metasService: MetasService,
              private estadoService: EstadoService,
              private clientesService: ClienteService,
              private translateService: TranslateService) {
    titulo.setTitle(this.translateService.instant('metas.titulo'));
  }

  ngOnInit(): void {
    this.getMock();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public infiniteScroll(): void {
    this.addItens(this.qtdRegistros, this.qtdRegistros += 10);
  }

  public verificarRealizado(realizado: number): boolean {
    return realizado >= 100;
  }

  public selecionarCliente(evento: string[]): void {
    this.clientesSelecionados = evento;
  }

  public selecionarEstado(evento: string[]): void {
    this.estadosSelecionados = evento;
  }

  public selecionarRegional(evento: string[]): void {
    this.regionaisSelecionadas = evento;
  }

  public selecionarMaterial(evento: string[]): void {
    this.materiaisSelecionados = evento;
  }

  public filtrar(): void {
    this.auxListaMetas = this.listaMetas;
    this.auxListaMetas = this.filtroPipe.transform(this.auxListaMetas, this.estadosSelecionados.length > 0 ? this.estadosSelecionados : null, 'idEstado');
    this.auxListaMetas = this.filtroPipe.transform(this.auxListaMetas, this.empresasSelecionadas.length > 0 ? this.empresasSelecionadas : null, 'idEmpresa');
    this.auxListaMetas = this.filtroPipe.transform(this.auxListaMetas, this.clientesSelecionados.length > 0 ? this.clientesSelecionados : null, 'idEmpresa');
    this.auxListaMetas = this.filtroPipe.transform(this.auxListaMetas, this.materiaisSelecionados.length > 0 ? this.materiaisSelecionados : null, 'idMaterial');
    this.auxListaMetas = this.filtroPipe.transform(this.auxListaMetas, this.regionaisSelecionadas.length > 0 ? this.regionaisSelecionadas : null, 'idRegional');

    this.metas = [];
    this.qtdRegistros = 0;
    this.infiniteScroll();
  }

  public limparFiltro(): void {
    this.metas = [];
    this.qtdRegistros = 0;
    this.estados = null;
    this.empresas = null;
    this.clientes = null;
    this.materiais = null;
    this.regionais = null;
    this.estadosSelecionados = [];
    this.empresasSelecionadas = [];
    this.clientesSelecionados = [];
    this.regionaisSelecionadas = [];
    this.materiaisSelecionados = [];
    this.filtrar();
  }

  private get(): void {
    this.isLoading = true;
    this.metasService.get().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((metas: Meta[]) => {
        this.listaMetas = metas;
        this.auxListaMetas = metas;
        this.infiniteScroll();
      });
  }

  /* TODO remover getMock() após integrar com a API */
  private getMock(): void {
    this.listaMetas = this.metasService.getMock();
    this.auxListaMetas = this.metasService.getMock();
    this.loadSelects();
    this.infiniteScroll();
  }

  private loadSelects(): void {
    this.clientesService.get().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((clientes: Cliente[]) => {
        this.filtros.clientes = clientes;
      });

    this.estadoService.get().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((estados: Estado[]) => {
        this.filtros.estados = estados;
      });
  }

  private addItens(inicio: number, fim: number): void {
    for (let cont = inicio; cont < fim; cont++) {
      if (this.auxListaMetas.hasOwnProperty(cont)) {
        this.metas.push(this.auxListaMetas[cont]);
      } else {
        this.fimInfiniteScroll = true;
      }
    }
  }

}
