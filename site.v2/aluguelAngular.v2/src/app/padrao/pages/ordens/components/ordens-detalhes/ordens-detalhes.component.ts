import {Location} from '@angular/common';
import {Component, EventEmitter, OnInit} from '@angular/core';
import {OrdensService} from 'src/app/modulos/padrao/services/ordens.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {MaterializeAction} from 'angular2-materialize';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-ordens-detalhes',
  templateUrl: './ordens-detalhes.component.html',
  styleUrls: ['./ordens-detalhes.component.scss']
})
export class OrdensDetalhesComponent implements OnInit {

  public modalActions = new EventEmitter<string | MaterializeAction>();
  public isLoading: boolean;
  public detalhes = [];
  public infoOrdem = {
    idClienteJForce: '',
    cliente: '',
    numeroOrdemJForce: '',
    documentoVenda: ''
  };
  public listaDterminacaoCondicao = [];

  constructor(private api: OrdensService, private activatedRoute: ActivatedRoute, public titulo: Title, private location: Location) {
  }

  openModal(ordemDC) {
    this.listaDterminacaoCondicao = ordemDC;
    // @ts-ignore
    this.modalActions.emit({action: 'modal', params: ['open']});
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(params => {
        try {
          this.infoOrdem = JSON.parse(atob(params['id'])) || null;
        } catch (e) {
          return Observable.throw(e);
        }
      });
    this.get(this.infoOrdem.numeroOrdemJForce);
  }

  voltarPagina() {
    this.location.back();
  }

  private get(numeroOrdemJForce) {
    this.isLoading = true;
    this.api.getDetalhes(numeroOrdemJForce).subscribe(res => {
      this.detalhes = res;
      this.isLoading = false;
    });
  }
}
