import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {Cliente} from '../../../../models/cliente';
import {TranslateService} from '@ngx-translate/core';
import {Estado} from '../../../../../../shared/models/estado';
import {Cidade} from '../../../../../../shared/models/cidade';
import {Bairro} from '../../../../../../shared/models/bairro';
import {ClienteService} from '../../../../services/cliente.service';
import {FiltroPipe} from '../../../../../../shared/pipes/filtro.pipe';
import {OrdenarPipe} from '../../../../../../shared/pipes/ordenar.pipe';
import {ClienteNovoService} from '../../../../services/cliente-novo.service';
import {ToastService} from '../../../../../../shared/services/toast.service';
import {EstadoService} from '../../../../../../shared/services/estado.service';
import {CidadeService} from '../../../../../../shared/services/cidade.service';
import {BairroService} from '../../../../../../shared/services/bairro.service';
import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-clientes-grid',
  templateUrl: './clientes-grid.component.html',
  styleUrls: ['./clientes-grid.component.scss']
})

export class ClientesGridComponent implements OnInit, OnDestroy {

  @ViewChild('pesquisarInput') pesquisarInput: ElementRef;

  public item: Cliente;
  public isMobile = true;
  public isLoading = true;
  public pesquisar = false;
  public ordenarPorSelect: string;
  public fimInfiniteScroll = false;
  public estados: Estado[] = [];
  public bairros: Bairro[] = [];
  public cidades: Cidade[] = [];
  public clientes: Cliente[] = [];
  public listaClientes: Cliente[] = [];
  public auxListaClientes: Cliente[] = [];
  public estadosSelecionados: string[] = [];
  public cidadesSelecionadas: string[] = [];
  public bairrosSelecionados: string[] = [];
  public selects = {estado: [], cidade: [], bairro: []};
  public filtros = {
    estados: [], cidades: [], bairros: [],
    ordenar: [
      {campo: 'id', titulo: 'ID'},
      {campo: 'razaoSocial', titulo: 'Razão Social'},
      {campo: 'dtUltimaCompra', titulo: 'Data da última compra'}
    ]
  };

  private qtdRegistros = 0;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    public titulo: Title,
    private router: Router,
    private filtroPipe: FiltroPipe,
    private ordenarPipe: OrdenarPipe,
    private translate: TranslateService,
    private estadoService: EstadoService,
    private cidadeService: CidadeService,
    private bairroService: BairroService,
    private clienteService: ClienteService,
    private clienteNovoService: ClienteNovoService) {
  }

  ngOnInit(): void {
    this.get();
    this.loadSelects();
    window.scrollTo(0, 0);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public infiniteScroll(): void {
    this.addItens(this.qtdRegistros, this.qtdRegistros += 10);
  }

  public excluirCliente(cliente: Cliente): void {
    this.clienteNovoService.delete(cliente.numeroClienteJForce)
      .subscribe((res: any) => {
        if (res.isValid) {
          ToastService.ativarToast('Deletado com sucesso!');
        } else {
          ToastService.ativarToast('Erro. Tente novamente mais tarde.');
        }
      });
  }

  public abrirGoogleMaps(cliente: Cliente): void {
    window.open(encodeURI('https://www.google.com/maps/place/') + cliente.endereco, '_blank');
  }

  public abrirOrdensCliente(id: string): void {
    this.router.navigate(['/ordens', {cliente: id}]);
  }

  public criarOrdemCliente(cliente: Cliente): void {
    this.router.navigate(['/ordens/pedido', {cliente: cliente.id}]);
  }

  public abrirTitulosCliente(id: string): void {
    this.router.navigate(['/titulos', {cliente: id}]);
  }

  public abrirPlanejamentosCliente(id: string): void {
    this.router.navigate(['/planejamento', {cliente: id}]);
  }

  public editarCliente(cliente: Cliente): void {
    this.item = cliente;
    this.router.navigate(['/clientes', cliente]);
  }

  public verificarRaramenteComprando(statusLimiteDiasSemCompra: number): boolean {
    return !(statusLimiteDiasSemCompra >= 91);
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
    this.clientes = [];
    this.qtdRegistros = 0;
    if (busca.length > 0) {
      this.auxListaClientes = this.filtroPipe.transform(this.listaClientes, busca, 'razaoSocial');
      this.infiniteScroll();
    } else if (busca.length === 0) {
      this.auxListaClientes = this.listaClientes;
      this.infiniteScroll();
    }
  }

  public filtrar(): void {
    this.auxListaClientes = this.listaClientes;
    this.auxListaClientes = this.filtroPipe.transform(this.auxListaClientes, this.estadosSelecionados.length > 0 ? this.estadosSelecionados : '', 'idEstado');
    this.auxListaClientes = this.filtroPipe.transform(this.auxListaClientes, this.cidadesSelecionadas.length > 0 ? this.cidadesSelecionadas : '', 'idCidade');
    this.auxListaClientes = this.filtroPipe.transform(this.auxListaClientes, this.bairrosSelecionados.length > 0 ? this.bairrosSelecionados : '', 'bairro');
    this.auxListaClientes = this.ordenarPipe.transform(this.auxListaClientes, this.ordenarPorSelect);

    this.clientes = [];
    this.qtdRegistros = 0;
    this.infiniteScroll();
    window.scrollTo(0, 0);
  }

  public limparFiltro(): void {
    this.clientes = [];
    this.qtdRegistros = 0;
    this.selects.estado = [];
    this.selects.cidade = [];
    this.selects.bairro = [];
    this.estadosSelecionados = [];
    this.cidadesSelecionadas = [];
    this.bairrosSelecionados = [];
    this.filtrar();
  }

  public selecionarEstados(evento: string[]): void {
    this.estadosSelecionados = evento;
    this.filtros.cidades = this.filtroPipe.transform(this.cidades, this.estadosSelecionados.length > 0 ? this.estadosSelecionados : '', 'idPai');
  }

  public selecionarCidades(evento: string[]): void {
    this.cidadesSelecionadas = evento;
    this.filtros.bairros = this.filtroPipe.transform(this.bairros, this.cidadesSelecionadas.length > 0 ? this.cidadesSelecionadas : '', 'idPai');
  }

  public selecionarBairros(evento: string[]): void {
    this.bairrosSelecionados = evento;
  }

  private get(): void {
    this.isLoading = true;
    this.clienteService.get().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((clientes: Cliente[]) => {
        this.listaClientes = clientes;
        this.auxListaClientes = clientes;
        this.isLoading = false;
        this.infiniteScroll();
      });
  }

  private loadSelects(): void {
    this.estadoService.get().subscribe((estados: Estado[]) => {
      this.estados = estados;
      this.filtros.estados = estados;
    });

    this.cidadeService.get().subscribe((cidades: Cidade[]) => {
      this.cidades = cidades;
      this.filtros.cidades = cidades;
    });

    this.bairroService.get().subscribe((bairros: Bairro[]) => {
      this.bairros = bairros;
      this.filtros.bairros = bairros;
    });
  }

  private addItens(inicio: number, fim: number): void {
    for (let cont = inicio; cont < fim; cont++) {
      if (this.auxListaClientes.hasOwnProperty(cont)) {
        this.clientes.push(this.auxListaClientes[cont]);
      } else {
        this.fimInfiniteScroll = true;
      }
    }
  }

}
