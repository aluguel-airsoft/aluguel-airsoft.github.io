import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {TitulosService} from '../../services/titulos.service';
import {Titulo} from '../../models/titulo';
import {TranslateService} from '@ngx-translate/core';
import {MaterializeAction} from 'angular2-materialize';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-titulos',
  templateUrl: './titulos.component.html',
  styleUrls: ['./titulos.component.scss']
})
export class TitulosComponent implements OnInit, OnDestroy {

  @ViewChild('pesquisarInput') pesquisarInput: ElementRef;

  public teste = {};
  public teste2 = {};
  public isMobile = true;
  public isLoading = true;
  public dtVencimentoAction = new EventEmitter<string | MaterializeAction>();
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    public titulo: Title,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private titulosService: TitulosService) {
    titulo.setTitle(this.translate.instant('titulos.titulo'));
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.teste2 = params['cliente'];
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

  private get(): void {
    this.isLoading = true;
    this.titulosService.get().subscribe((titulos: Titulo[]) => {
        this.teste = titulos;
      });
  }

}
