import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {Cliente} from '../../../../models/cliente';
import {Contato} from '../../../../models/contato';
import {TranslateService} from '@ngx-translate/core';
import {MaterializeAction} from 'angular2-materialize';
import {Estado} from '../../../../../../shared/models/estado';
import {Bairro} from '../../../../../../shared/models/bairro';
import {Cidade} from '../../../../../../shared/models/cidade';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClienteService} from '../../../../services/cliente.service';
import {AuthService} from '../../../../../../shared/services/auth.service';
import {ToastService} from '../../../../../../shared/services/toast.service';
import {ClienteNovoService} from '../../../../services/cliente-novo.service';
import {ClassificacaoCliente} from '../../../../models/classificacao-cliente';
import {CidadeService} from '../../../../../../shared/services/cidade.service';
import {EstadoService} from '../../../../../../shared/services/estado.service';
import {BairroService} from '../../../../../../shared/services/bairro.service';
import {ViaCepService} from '../../../../../../shared/services/viacep.service';
import {Component, EventEmitter, Input, OnDestroy, OnInit} from '@angular/core';
import {DomicilioFiscalService} from '../../../../../../shared/services/domicilioFiscal.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.scss']
})

export class ClientesFormComponent implements OnInit, OnDestroy, ToastService {

  @Input() item: Cliente;
  @Input() cnpjCpfMask: Subject<string> = new Subject();

  public isLoading = true;
  public novoCadastro: boolean;
  public clienteForm: FormGroup;
  public contatoForm: FormGroup;
  public estados: Estado[] = [];
  public cidades: Cidade[] = [];
  public bairros: Bairro[] = [];
  public contatos: Contato[] = [];
  public classificacaoCliente: ClassificacaoCliente[] = [];
  public modalActions = new EventEmitter<string | MaterializeAction>();

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    public titulo: Title,
    private fb: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private authService: AuthService,
    private translate: TranslateService,
    private viaCepService: ViaCepService,
    private bairrosService: BairroService,
    private cidadesService: CidadeService,
    private estadosService: EstadoService,
    private clienteService: ClienteService,
    private clienteNovoService: ClienteNovoService,
    private domicilioFiscalService: DomicilioFiscalService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      params.novoCadastro ? this.novoCadastro = true : this.novoCadastro = false;
      this.loadSelects();
      this.buildForms();
    });
    window.scrollTo(0, 0);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public submitCliente() {
    if (this.validarFormularioCliente()) {
      if (this.novoCadastro) {
        this.postCliente(this.clienteForm.getRawValue());
      } else {
        this.putCliente(this.clienteForm.getRawValue());
      }
    }
  }

  public submitContato() {
    if (!this.contatoForm.controls['numeroContatoJForce'].value) {
      this.postContato(this.contatoForm.getRawValue());
    } else {
      this.putContato(this.contatoForm.getRawValue());
    }
  }

  public deleteContato(contato: Contato) {
    const index = this.contatos.indexOf(contato);
    this.contatos.splice(index, 1);
  }

  public openModal(contato?: Contato): void {
    if (!contato) {
      contato = new Contato();
    }

    this.contatoForm.setValue({
      'id': '',
      'nome': contato.nome || '',
      'email': contato.email || '',
      'celular': contato.celular || '',
      'telefone': contato.telefone || '',
      'sobrenome': contato.sobrenome || '',
      'numeroContatoJForce': contato.numeroContatoJForce || '',
      'numeroClienteJForce': contato.numeroClienteJForce || this.clienteForm.controls['numeroClienteJForce'].value
    });
    // @ts-ignore
    this.modalActions.emit({action: 'modal', params: ['open']});
  }

  public voltarPagina(): void {
    this.item = new Cliente;
    this.location.back();
  }

  private postCliente(cliente: Cliente): void {
    cliente.contatoNovo = this.contatos;
    this.clienteNovoService.post(cliente).subscribe((res: any) => {
      if (res) {
        ToastService.ativarToast('Cliente cadastrado com sucesso!');
        this.clienteForm.reset();
      } else {
        res.errors.forEach((erro: any) => {
          ToastService.ativarToast(erro.message);
        });
      }
    });
  }

  private putCliente(cliente: Cliente): void {
    cliente.contatoNovo = this.contatos;
    this.clienteNovoService.put(cliente).subscribe((res: any) => {
      if (res) {
        ToastService.ativarToast('Cliente atualizado com sucesso!');
        this.clienteForm.reset();
      } else {
        res.errors.forEach((erro: any) => {
          ToastService.ativarToast(erro.message);
        });
      }
    });
  }

  private postContato(contato: Contato): void {
    contato.numeroContatoJForce = this.gerarCodigo();
    this.contatos.push(contato);
    this.contatoForm.reset();
  }

  private putContato(contato: Contato): void {
    const index = this.contatos.findIndex(c => c.numeroContatoJForce === contato.numeroContatoJForce);
    this.contatos.splice(index, 1);
    this.contatos.push(contato);
  }

  private validarFormularioCliente(): boolean {
    if (this.clienteForm.valid) {
      return true;
    } else {
      for (const control in this.clienteForm.controls) {
        if (this.clienteForm.controls.hasOwnProperty(control)) {
          if (!this.clienteForm.controls[control].valid) {
            this.clienteForm.controls[control].markAsTouched();
          }
        }
      }
      ToastService.ativarToast('Preencha corretamente o formulário');
    }
    return false;
  }

  private getContatos(idCliente: string) {
    this.contatos = [
      {id: '', nome: 'Jomar', sobrenome: 'Ribeiro', celular: '47121131499', telefone: '4712113149', email: 'jomar@jwrcomsultoria.com.br'},
      {id: '', nome: 'João', sobrenome: 'Silva', celular: '47121131499', telefone: '4712113149', email: 'joao@jwrcomsultoria.com.br'}
    ];
    /*
    this.clienteService.getClienteContato(idCliente).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((contatos: Contato[]) => {
        this.contatos = contatos;
      });
     */
  }

  private getEstados(): void {
    this.estadosService.get().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((estados: Estado[]) => {
        this.estados = estados;
      });
  }

  private getCidades(estado?: string): void {
    if (estado && this.clienteForm.controls.cep.value) {
      this.getDomicilioFiscal(this.clienteForm.controls.cep.value, estado);
    } else {
      this.cidadesService.get(estado).pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((cidades: Cidade[]) => {
          this.cidades = cidades;
        });
    }
  }

  private getBairros(cidade?: string): void {
    this.bairrosService.get(cidade).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((bairros: Bairro[]) => {
        this.bairros = bairros;
      });
  }

  private getEndereco(cep: string): void {
    if (cep.length === 9) {
      this.viaCepService.get(cep).subscribe((res) => {
        if (!res.erro) {
          this.clienteForm.controls.estado.setValue(res.uf);
          this.clienteForm.controls.rua.setValue(res.logradouro.toUpperCase());
          this.clienteForm.controls.bairro.setValue(res.bairro.toUpperCase());
          this.clienteForm.controls.cidade.setValue(res.localidade.toUpperCase());
          this.getDomicilioFiscal(cep, res.uf);
        }
      });
    } else {
      this.clienteForm.controls.rua.setValue('');
      this.clienteForm.controls.estado.setValue('');
      this.clienteForm.controls.cidade.setValue('');
      this.clienteForm.controls.bairro.setValue('');
      this.clienteForm.controls.domicilioFiscal.setValue('');
    }
  }

  private getDomicilioFiscal(cep: string, idEstado: string): void {
    this.domicilioFiscalService.get(cep, idEstado).subscribe((dmFiscal) => {
      if (dmFiscal.isValid) {
        this.clienteForm.controls.domicilioFiscal.setValue(dmFiscal.data);
      }
    });
  }

  private getClassificacaoCliente(): void {
    this.clienteNovoService.getClassificacaoCliente().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: ClassificacaoCliente[]) => {
        this.classificacaoCliente = res;
      });
  }

  private gerarCodigo(): string {
    return this.authService.getUsuario().username + Math.floor(Math.random() * 9999) + 1;
  }

  private getMascara(cnpjCpf: string): void {
    if (cnpjCpf.length <= 14) {
      this.cnpjCpfMask.next('000.000.000-009');
    } else {
      this.cnpjCpfMask.next('00.000.000/0000-00');
    }
  }

  private loadSelects(): void {
    this.getEstados();
    this.getCidades();
    this.getBairros();
    this.getClassificacaoCliente();
  }

  private buildForms(): void {
    this.getContatos(this.item.idCliente);
    this.clienteForm = this.fb.group({
      'observacao': [this.item.observacao, []],
      'contatoNovo': [this.item.contatoNovo || [], []],
      'nro': [this.item.nro, [Validators.required]],
      'cep': [this.item.cep, [Validators.required]],
      'rua': [this.item.rua, [Validators.required]],
      'cnpj': [this.item.cnpj, [Validators.required]],
      'email': [this.item.email, [Validators.required]],
      'bairro': [this.item.bairro, [Validators.required]],
      'estado': [this.item.idEstado, [Validators.required]],
      'cidade': [this.item.idCidade, [Validators.required]],
      'celular': [this.item.celular, [Validators.required]],
      'telefone': [this.item.telefone, [Validators.required]],
      'pais': [this.item.idPais || 'BR', [Validators.required]],
      'emailNFE': [this.item.emailNFE, [Validators.required, Validators.email]],
      'inscricaoEstadual': [this.item.inscricaoEstadual, [Validators.required]],
      'idClassificacaoCliente': [this.item.idClassificacaoCliente, [Validators.required]],
      'domicilioFiscal': [{value: this.item.domicilioFiscal, disabled: true}, [Validators.required]],
      'numeroClienteJForce': [{value: this.item.numeroClienteJForce || this.gerarCodigo(), disabled: true}],
      'nome': [this.item.nome, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      'campoSelecao': [this.item.campoSelecao, [Validators.required, Validators.minLength(5), Validators.maxLength(10)]]
    });

    this.contatoForm = this.fb.group({
      'id': [{value: '', disabled: true}],
      'nome': [null, [Validators.required, Validators.maxLength(50)]],
      'celular': [null, [Validators.required, Validators.maxLength(50)]],
      'telefone': [null, [Validators.required, Validators.maxLength(50)]],
      'sobrenome': [null, [Validators.required, Validators.maxLength(50)]],
      'email': [null, [Validators.required, Validators.email, Validators.maxLength(50)]],
      'numeroContatoJForce': [{value: '', disabled: true}, [Validators.required]],
      'numeroClienteJForce': [{
        value: this.clienteForm.controls['numeroClienteJForce'].value,
        disabled: true
      }, [Validators.required]]
    });

    if (Object.keys(this.item).length && !this.novoCadastro) {
      this.clienteForm.disable();
    }

    this.isLoading = false;
  }

}
