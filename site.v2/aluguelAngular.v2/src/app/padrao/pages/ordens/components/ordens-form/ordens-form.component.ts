import {Location} from '@angular/common';
import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MaterializeAction} from 'angular2-materialize';
import {OrdensService} from 'src/app/modulos/padrao/services/ordens.service';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {TipoOrdem} from 'src/app/modulos/padrao/models/tipo-ordem';
import {CondicaoPagamento} from 'src/app/modulos/padrao/models/condicao-pagamento';
import {ClienteService} from 'src/app/modulos/padrao/services/cliente.service';
import {Cliente} from 'src/app/modulos/padrao/models/cliente';
import {ToastService} from 'src/app/shared/services/toast.service';
import {ItemPedido} from 'src/app/modulos/padrao/models/item-pedido';
import {RetornoPedido} from 'src/app/modulos/padrao/models/retorno-pedido';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-ordens-form',
  templateUrl: './ordens-form.component.html',
  styleUrls: ['./ordens-form.component.scss']
})
export class OrdensFormComponent implements OnInit, ToastService {

  public isLoading: boolean;
  public isLoadingItemAdd: boolean;
  public mostrarBarraPedido: boolean = false;

  public mensagemBusca: String;
  public ordensForm: FormGroup;
  public listaDeterminacaoCondicao = [];
  public modalDetCond = new EventEmitter<string | MaterializeAction>();
  public modalEmail = new EventEmitter<string | MaterializeAction>();
  public modalPendencias = new EventEmitter<string | MaterializeAction>();
  public emailAdd: string;
  public listaEmailCopia: string[] = [];
  public listaPendencias: any[] = [];
  public listaTipoOrdem: TipoOrdem[] = [];
  public listaCondPagamento: CondicaoPagamento[] = [];
  //----- Lançamentos -----
  public lancamentos: ItemPedido[] = [];
  public listaLancamentos: ItemPedido[] = [];
  public fimInfiniteScrollLancamentos = false;
  //----- Carrinho -----
  public carrinho: ItemPedido[] = [];
  //----- Catálogo -----
  public catalogo: ItemPedido[] = [];
  public listaCatalogo: ItemPedido[] = [];
  public fimInfiniteScrollCatalogo = false;
  //----- Histórico -----
  public historico: ItemPedido[] = [];
  public listaHistorico: ItemPedido[] = [];
  public fimInfiniteScrollHistorico = false;
  //----- Campanha -----
  public campanha = [];
  public listaCampanha = [];
  public fimInfiniteScrollCampanha = false;
  public itemAdd: ItemPedido;
  private idCliente: number;
  private cliente: Cliente;
  private dataCriacao: Date;
  private retornoPedido: RetornoPedido;
  private numOrdem: string;
  private qtdRegistrosLancamentos = 0;
  private qtdRegistrosCatalogo = 0;
  private qtdRegistrosHistorico = 0;
  private qtdRegistrosCampanha = 0;

  constructor(
    public titulo: Title,
    private router: Router,
    private fb: FormBuilder,
    private api: OrdensService,
    private location: Location,
    private route: ActivatedRoute,
    public translate: TranslateService,
    private apiCliente: ClienteService
  ) {
    titulo.setTitle(translate.instant('ordens.titulo'));
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.cliente) {
        this.idCliente = params.cliente;
      } else {
        ToastService.ativarToast('Erro ao selecionar o cliente');
        this.router.navigate(['/clientes', {}]);
      }
      this.isLoadingItemAdd = false;
      this.buildForms();
    });
  }

  public adicionarCarrinho(item: ItemPedido) {
    this.catalogo.find(el => el.idMaterial === item.idMaterial) ? this.catalogo.find(el => el.idMaterial === item.idMaterial).quantidadeVenda = item.quantidadeVenda : undefined;
    this.listaCatalogo.find(el => el.idMaterial === item.idMaterial) ? this.listaCatalogo.find(el => el.idMaterial === item.idMaterial).quantidadeVenda = item.quantidadeVenda : undefined;
    this.lancamentos.find(el => el.idMaterial === item.idMaterial) ? this.lancamentos.find(el => el.idMaterial === item.idMaterial).quantidadeVenda = item.quantidadeVenda : undefined;
    this.listaLancamentos.find(el => el.idMaterial === item.idMaterial) ? this.listaLancamentos.find(el => el.idMaterial === item.idMaterial).quantidadeVenda = item.quantidadeVenda : undefined;
    this.historico.find(el => el.idMaterial === item.idMaterial) ? this.historico.find(el => el.idMaterial === item.idMaterial).quantidadeVenda = item.quantidadeVenda : undefined;
    this.listaHistorico.find(el => el.idMaterial === item.idMaterial) ? this.listaHistorico.find(el => el.idMaterial === item.idMaterial).quantidadeVenda = item.quantidadeVenda : undefined;

    const itemExistente = this.carrinho.find(el => el.idMaterial === item.idMaterial);
    if (itemExistente) {
      this.carrinho.splice(this.carrinho.indexOf(itemExistente), 1);
    }
    this.carrinho.push(item);
  }

  public removerItemCarrinho(item: ItemPedido) {
    item.nroOrdemJForce = this.numOrdem;
    item.idTipoOrdem = 'ZVMI'; //TODO: Verificar como obter este campo
    this.api.postRemoverItemRascunho(item).subscribe(res => {
      if (res.isValid) {
        const itemExistente = this.carrinho.find(el => el.idMaterial === item.idMaterial);
        if (itemExistente) {
          this.carrinho.splice(this.carrinho.indexOf(itemExistente), 1);
        }
        if (res.messages) {
          for (var i in res.messages) {
            ToastService.ativarToast(res.messages[i].message, 9000);
          }
        }
      } else {
        ToastService.ativarToast(res.errors[0].message, 9000);
      }
      this.isLoadingItemAdd = false;
    });
  }

  public calcularTotalCarrinho(): number {
    var totalCarrinho = 0;
    this.carrinho.forEach(e => {
      totalCarrinho += (e.valorTotalVenda);
    });
    return totalCarrinho;
  }

  public carregarLancamentos() {
    this.isLoading = true;
    this.mensagemBusca = 'Buscando lançamentos ...';
    this.qtdRegistrosLancamentos = 0;
    if (this.listaCatalogo.length > 0) {
      this.lancamentos = [];
      this.listaLancamentos = [];
      for (const key in this.listaCatalogo) {
        if (this.listaCatalogo[key].lancamento === 1) {
          this.listaLancamentos.push(this.listaCatalogo[key]);
        }
      }
      this.infiniteScrollLancamentos();
      this.isLoading = false;
    } else {
      this.carregarCatalogo().then(() => {
        this.carregarLancamentos();
      });
    }
  }

  public carregarCatalogo() {
    return new Promise((resolve, reject) => {
      if (this.listaCatalogo.length <= 0) {
        this.isLoading = true;
        this.mensagemBusca = 'Buscando produtos ...';
        this.api.getCatalogo(this.idCliente, 'ZVMI').subscribe(res => {
          this.listaCatalogo = res;
          this.catalogo = [];
          this.infiniteScrollCatalogo();
          this.isLoading = false;
          resolve();
        });
      } else {
        this.qtdRegistrosCatalogo = 0;
        this.catalogo = [];
        this.infiniteScrollCatalogo();
      }
    });
  }

  public carregarHistorico() {
    this.isLoading = true;
    this.mensagemBusca = 'Buscando histórico ...';
    this.qtdRegistrosHistorico = 0;
    if (this.listaCatalogo.length > 0) {
      this.historico = [];
      this.listaHistorico = [];
      for (const key in this.listaCatalogo) {
        if (this.listaCatalogo[key].qtdeDiasSemVenda > 0) {
          this.listaHistorico.push(this.listaCatalogo[key]);
        }
      }
      this.infiniteScrollHistorico();
      this.isLoading = false;
    } else {
      this.carregarCatalogo().then(() => {
        this.carregarHistorico();
      });
    }
  }

  public carregarCampanha() {
    return new Promise((resolve, reject) => {
      if (this.listaCampanha.length <= 0) {
        this.isLoading = true;
        this.mensagemBusca = 'Buscando campanhas ...';
        this.api.getCampanha(this.idCliente).subscribe(res => {
          this.listaCampanha = res;
          this.infiniteScrollCampanha();
          this.isLoading = false;
          resolve();
        });
      } else {
        this.qtdRegistrosCampanha = 0;
        this.campanha = [];
        this.infiniteScrollCampanha();
      }
    });
  }

  public buscarNumOrdem(): any {
    return new Promise((resolve, reject) => {
      this.mensagemBusca = 'Buscando número da ordem ...';
      this.api.getNumOrdem().subscribe(res => {
        this.numOrdem = res;
        this.ordensForm.controls.numeroOrdemJforce.setValue(res);
        resolve();
      });
    });
  }

  public buscarCliente() {
    return new Promise((resolve, reject) => {
      this.mensagemBusca = 'Buscando cliente ...';
      this.apiCliente.getById(this.idCliente).subscribe(res => {
        this.cliente = res;
        resolve();
      });
    });
  }

  public buscarOrdemVenda() {
    return new Promise((resolve, reject) => {
      this.mensagemBusca = 'Buscando rascunho da ordem ...';
      this.api.getOrdemVenda(this.idCliente, this.numOrdem).subscribe(res => {
        if (res.isValid) {
          this.carrinho = res.data.material;
          this.dataCriacao = res.data.dtCriacao;
        } else {
          this.dataCriacao = new Date();
          this.carrinho = [];
        }
        resolve();
      });
    });
  }

  public buscarTipoOrdens(): any {
    return new Promise((resolve, reject) => {
      this.mensagemBusca = 'Buscando tipos de ordem ...';
      this.api.getTipoOrdens(this.idCliente).subscribe(res => {
        this.listaTipoOrdem = res;
        resolve();
      });
    });
  }

  public buscarCondPagamento(): any {
    return new Promise((resolve, reject) => {
      this.mensagemBusca = 'Buscando condições de pagamento ...';
      this.api.getCondPagamento(this.idCliente).subscribe(res => {
        this.listaCondPagamento = res;
        resolve();
      });
    });
  }

  public verificarItemAdd(item) {
    // item.codigoImpostoSD = "I4"; //TODO: Verifical qual campo é esse
    this.isLoadingItemAdd = true;
    item.idClienteJforce = this.idCliente;
    item.idCondicaoPagamento = this.ordensForm.controls.numeroOrdemJforce.get('condPagamento');
    item.idOrder = this.numOrdem;
    item.idTipoOrdem = 'ZVMI'; //TODO: Verificar como obter este campo
    item.nroOrdemJForce = this.numOrdem;
    if (!Number.isInteger(item.quantidadeVenda)) {
      item.facilitador = item.quantidadeVenda.replace(/[0-9]/g, '');
    }
    item.quantidadeVenda = parseInt(item.quantidadeVenda);
    this.api.postItemRascunho(item).subscribe(res => {
      if (res.isValid) {
        this.itemAdd = res.data;
        this.adicionarCarrinho(res.data);
        if (res.messages) {
          for (var i in res.messages) {
            ToastService.ativarToast(res.messages[i].message, 9000);
          }
        }
      } else {
        ToastService.ativarToast(res.errors[0].message, 9000);
      }
      this.isLoadingItemAdd = false;
    });
  }

  public verificarItemAddValor(item) {
    // item.codigoImpostoSD = "I4"; //TODO: Verifical qual campo é esse
    item.idClienteJforce = this.idCliente;
    item.idCondicaoPagamento = this.ordensForm.controls.numeroOrdemJforce.get('condPagamento');
    item.idOrder = this.numOrdem;
    item.idTipoOrdem = 'ZVMI'; //TODO: Verificar como obter este campo
    item.nroOrdemJForce = this.numOrdem;
    item.valorVenda = parseFloat(item.valorVenda);
    item.valorDigitado = parseFloat(item.valorVenda);
    this.api.postItemRascunhoValor(item).subscribe(res => {
      if (res.isValid) {
        this.itemAdd = res.data;
      } else {
        ToastService.ativarToast(res.errors[0].message);
      }
    });
  }

  public selecionarItem(item: ItemPedido) {
    this.itemAdd = item;
    this.mostrarBarraPedido = true;
    // document.getElementById('quantidadeVenda').focus();
  }

  public voltarPagina() {
    this.location.back();
  }

  public submitOrdem() {
    this.isLoading = true;
    this.mensagemBusca = 'Enviando Ordem ...';
    this.openModalEmail();
  }

  public confirmaEmail() {
    if (this.listaEmailCopia.length > 0) {
      if (this.validarCabecalhoOrdem()) {
        this.retornoPedido = new RetornoPedido;
        this.retornoPedido.idTipoDocumento = this.ordensForm.controls.tipoOrdem.value;
        this.retornoPedido.idCondicaoPagamento = this.ordensForm.controls.condPagamento.value;
        this.retornoPedido.nroOrdemRecebedor = '';
        this.retornoPedido.numeroOrdemJForce = this.ordensForm.controls.numeroOrdemJforce.value;
        this.retornoPedido.idClienteJForce = this.idCliente;
        this.retornoPedido.observacao = this.ordensForm.controls.observacao.value;
        this.retornoPedido.dtCriacao = this.ordensForm.controls.dataEmissao.value;
        this.retornoPedido.numeroReferencia = this.ordensForm.controls.numeroPedido.value;
        this.retornoPedido.bloqueioCondicaoPagamento = null;
        this.retornoPedido.bloqueioDuplicataValorMinimo = null;
        this.retornoPedido.bloqueioFrete = null;
        this.retornoPedido.bloqueioMixMinimoPedido = null;
        this.retornoPedido.bloqueioPercentualEletroduto = null;
        this.retornoPedido.bloqueioPreco = null;
        this.retornoPedido.bloqueioValorMinimoPedido = null;
        this.retornoPedido.revenda = null;
        this.retornoPedido.copias = this.listaEmailCopia.toString().replace(',', ';');
        this.retornoPedido.copiarGestor = this.ordensForm.controls.enviarGestor.value;
        this.retornoPedido.enviarParaEmpresa = this.ordensForm.controls.enviarEmpresa.value;
        this.retornoPedido.confirmaSalvar = false;

        this.postOrdem(this.retornoPedido);
      } else {
        this.mensagemBusca = '';
        this.isLoading = false;
        ToastService.ativarToast('Preencha corretamente o formulário do cabeçalho');
      }
    } else {
      this.mensagemBusca = '';
      this.isLoading = false;
      ToastService.ativarToast('Necessário inclusão de ao menos 1(um) e-mail.');
      // this.openModalEmail();
    }
  }

  public confirmaPendencias() {
    this.isLoading = true;
    this.mensagemBusca = 'Enviando Ordem com pendências...';
    this.retornoPedido.confirmaSalvar = true;
    this.postOrdem(this.retornoPedido);
  }

  public validarCabecalhoOrdem(): boolean {
    if (this.ordensForm.valid) {
      return true;
    } else {
      for (const control in this.ordensForm.controls) {
        if (this.ordensForm.controls.hasOwnProperty(control)) {
          if (!this.ordensForm.controls[control].valid) {
            this[control + 'Invalido'] = true;
            this.ordensForm.controls[control].markAsTouched();
          }
        }
      }
    }
    return false;
  }

  public openModal(ordemDC) {
    this.listaDeterminacaoCondicao = ordemDC;
    this.modalDetCond.emit({action: 'modal', params: ['open']});
  }

  public openModalEmail() {
    this.modalEmail.emit({action: 'modal', params: ['open']});
  }

  //TODO: Criar função para confirmar saida da tela -> CancelarRascunho

  public openModalPendencias() {
    this.modalPendencias.emit({action: 'modal', params: ['open']});
  }

  public adicionarEmail(email: string) {
    this.emailAdd = '';
    this.listaEmailCopia.push(email);
  }

  public editarEmail(email: string) {
    if (this.emailAdd) {
      this.listaEmailCopia.push(this.emailAdd);
    }
    this.emailAdd = email;
    this.listaEmailCopia.splice(this.listaEmailCopia.indexOf(email), 1);
  }

  public removerEmail(email: string) {
    this.listaEmailCopia.splice(this.listaEmailCopia.indexOf(email), 1);
  }

  private postOrdem(ordem: RetornoPedido) {
    this.api.post(ordem).subscribe((res: any) => {
      if (res.isValid) {
        ToastService.ativarToast('Ordem gravada com sucesso');
        this.mensagemBusca = '';
        this.isLoading = false;
        this.voltarPagina();
      } else {
        this.listaPendencias = res.errors;
        this.openModalPendencias();
        this.mensagemBusca = '';
        this.isLoading = false;
      }
    });
  }

  private putOrdem(cliente: Cliente) {
    console.log('PUT', cliente);
  }

  private infiniteScrollLancamentos() {
    this.addItems(this.qtdRegistrosLancamentos, this.qtdRegistrosLancamentos += 10, this.listaLancamentos, this.lancamentos, 'fimInfiniteScrollLancamentos');
  }

  private infiniteScrollCatalogo() {
    this.addItems(this.qtdRegistrosCatalogo, this.qtdRegistrosCatalogo += 10, this.listaCatalogo, this.catalogo, 'fimInfiniteScrollCatalogo');
  }

  private infiniteScrollHistorico() {
    this.addItems(this.qtdRegistrosHistorico, this.qtdRegistrosHistorico += 10, this.listaHistorico, this.historico, 'fimInfiniteScrollHistorico');
  }

  private infiniteScrollCampanha() {
    this.addItems(this.qtdRegistrosCampanha, this.qtdRegistrosCampanha += 10, this.listaCampanha, this.campanha, 'fimInfiniteScrollCampanha');
  }

  private buildForms() {
    this.isLoading = true;
    this.buscarNumOrdem().then(() => {
      this.buscarCliente().then(() => {
        this.buscarOrdemVenda().then(() => {
          this.buscarTipoOrdens().then(() => {
            this.buscarCondPagamento().then(() => {
              // this.ordensForm.controls.tipoOrdem.setValue("ZVMI", {onlySelf: true});
              // this.ordensForm.controls.condPagamento.setValue(this.listaCondPagamento);
              //   this.ordensForm.controls.dataEmissao.setValue(new Date());
              this.mensagemBusca = '';
              this.isLoading = false;
            });
          });
        });
      });
    });
    this.ordensForm = this.fb.group({
      'numeroOrdemJforce': [{value: '', disabled: true}, []],
      'numeroPedido': ['', []],
      'dataEmissao': [{value: this.dataCriacao ? this.dataCriacao : new Date(), disabled: true}, []],
      'tipoOrdem': ['', [Validators.required]],
      'enviarEmpresa': [true, []],
      'enviarGestor': [false, []],
      'observacao': ['', []],
      // 'condPagamento': ['', [Validators.required]],
      'condPagamento': ['', []],
      'prazo': ['', []],
    });
  }

  private addItems(inicio: number, fim: number, listaAux: any[], lista: any[], fimInfinite: string) {
    for (let cont = inicio; cont < fim; cont++) {
      if (listaAux.hasOwnProperty(cont)) {
        lista.push(listaAux[cont]);
      } else {
        this[fimInfinite] = true;
      }
    }
  }
}
