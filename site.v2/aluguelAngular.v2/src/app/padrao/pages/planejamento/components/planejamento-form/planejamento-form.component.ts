import {Location} from '@angular/common';
import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from 'src/app/shared/services/auth.service';
import {ClienteService} from 'src/app/modulos/padrao/services/cliente.service';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute} from '@angular/router';
import {ToastService} from 'src/app/shared/services/toast.service';
import {Title} from '@angular/platform-browser';
import {MaterializeAction} from 'angular2-materialize';
import {Cliente} from 'src/app/modulos/padrao/models/cliente';
import {Planejamento, RecorrenciaVisita} from 'src/app/modulos/padrao/models/planejamento';
import {PlanejamentoService} from 'src/app/modulos/padrao/services/planejamento.service';

@Component({
  selector: 'app-planejamento-form',
  templateUrl: './planejamento-form.component.html',
  styleUrls: ['./planejamento-form.component.scss']
})
export class PlanejamentoFormComponent implements OnInit, ToastService {

  @Input() item: Planejamento;

  public isLoading = true;
  public novoCadastro: boolean;
  public planejamentoForm: FormGroup;
  public dtCad = new EventEmitter<string | MaterializeAction>();
  public dtFimPlan = new EventEmitter<string | MaterializeAction>();
  public hora = new EventEmitter<string | MaterializeAction>();
  public selectClientes: Cliente[];
  public selectRecorrencias: { id: number, label: string }[];
  public selectTipoVisita: { id: number, descricao: string }[];
  public mensagemBusca: string;

  constructor(
    public titulo: Title,
    private fb: FormBuilder,
    private authService: AuthService,
    private clienteService: ClienteService,
    private planejamentoService: PlanejamentoService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private location: Location) {
  }

  submitPlanejamento() {
    if (this.validarFormularioPlanejamento()) {
      if (this.novoCadastro) {
        this.postPlanejamento(this.planejamentoForm.value);
      } else {
        this.putPlanejamento(this.planejamentoForm.value);
      }
    } else {
      ToastService.ativarToast('Preencha corretamente o formulário');
    }
  }

  validarFormularioPlanejamento(): boolean {
    if (this.planejamentoForm.valid) {
      return true;
    } else {
      for (const control in this.planejamentoForm.controls) {
        if (this.planejamentoForm.controls.hasOwnProperty(control)) {
          if (!this.planejamentoForm.controls[control].valid) {
            this.planejamentoForm.controls[control].markAsTouched();
          }
        }
      }
    }
    return false;
  }

  postPlanejamento(planejamento: any) {
    this.planejamentoService.post(planejamento).subscribe((res: any) => {
      console.log(res);
    });
  }

  putPlanejamento(planejamento: Planejamento) {
    console.log('PUT', planejamento);
  }

  voltarPagina() {
    this.location.back();
  }

  public abrirDatePicker(item: string) {
    this[item].emit({action: 'pickadate', params: ['open']});
  }

  public abrirTimePicker(item: string) {
    this[item].emit({action: 'pickatime', params: ['show']});
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      params.novoCadastro ? this.novoCadastro = true : this.novoCadastro = false;
      this.buildForms();
    });
  }

  private getClientes() {
    this.mensagemBusca = 'Buscando clientes..';
    return new Promise((resolve) => {
      this.clienteService.get().subscribe(res => {
        this.selectClientes = res;
        resolve();
      });
    });
  }

  private getRecorrencias() {
    this.mensagemBusca = 'Buscando recorrências..';
    return new Promise((resolve) => {
      this.selectRecorrencias = [];
      var i = 1;
      while (RecorrenciaVisita[i]) {
        this.selectRecorrencias.push({id: i, label: RecorrenciaVisita[i]});
        i++;
      }
      resolve();
    });
  }

  private getTipoVisita() {
    this.mensagemBusca = 'Buscando Tipos de Visita..';
    return new Promise((resolve) => {
      var res = this.planejamentoService.getTipoVisita();
      this.selectTipoVisita = res;
      resolve();
    });

    // TODO: Esperando criação da chamada no Back
    // return new Promise((resolve) => {
    //   this.planejamentoService.getTipoVisita().subscribe(res => {
    //     this.selectTipoVisita = res;
    //     resolve();
    //   });
    // });
  }

  private buildForms() {
    this.getClientes().then(() => {
      this.getRecorrencias().then(() => {
        this.getTipoVisita().then(() => {
          this.planejamentoForm = this.fb.group({
            'idCliente': [this.item.idCliente || '', [Validators.required]],
            'dtCadastro': [this.item.dtCadastro || '', [Validators.required]],
            'horario': [this.item.horario || '', [Validators.required]],
            'recorrencia': [this.item.recorrencia || '', [Validators.required]],
            'diaSemana': [this.item.diaSemana || '', []],
            'dtFimPlanejamento': [this.item.dtFimPlanejamento || '', [Validators.required]],
            'idTipoVisita': [this.item.idTipoVisita || '', [Validators.required]],
            'observacao': [this.item.observacao || '', []],
          });
          this.isLoading = false;
          this.mensagemBusca = '';
        });
      });
    });
  }
}
