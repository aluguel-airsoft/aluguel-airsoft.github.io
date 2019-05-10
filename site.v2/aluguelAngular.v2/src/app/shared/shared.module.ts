import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToastService} from './services/toast.service';
import {ModuleWithProviders} from '@angular/compiler/src/core';
import {TranslateModule} from '@ngx-translate/core';
import {FiltroPipe} from './pipes/filtro.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoadingComponent} from '../layouts/loading/loading.component';
import {MaterializeModule} from 'angular2-materialize';
import {NgxMaskModule} from 'ngx-mask';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {EstadoService} from './services/estado.service';
import {BairroService} from './services/bairro.service';
import {ViaCepService} from './services/viacep.service';
import {DomicilioFiscalService} from './services/domicilioFiscal.service';
import {CidadeService} from './services/cidade.service';
import {OrdenarPipe} from './pipes/ordenar.pipe';
import {FiltroPeriodoPipe} from './pipes/filtro-periodo.pipe';
import {GraficoBarraComponent} from './components/grafico-barra/grafico-barra.component';
import {ChartsModule} from 'ng2-charts';
import {GraficoTortaComponent} from './components/grafico-torta/grafico-torta.component';
import {GraficoLinhaComponent} from './components/grafico-linha/grafico-linha.component';

@NgModule({
  declarations: [
    FiltroPipe,
    OrdenarPipe,
    LoadingComponent,
    FiltroPeriodoPipe,
    GraficoBarraComponent,
    GraficoTortaComponent,
    GraficoLinhaComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ChartsModule,
    TranslateModule,
    MaterializeModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [
    FiltroPipe,
    OrdenarPipe,
    FormsModule,
    NgxMaskModule,
    TranslateModule,
    LoadingComponent,
    MaterializeModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    GraficoBarraComponent,
    GraficoTortaComponent,
    GraficoLinhaComponent
  ],
  providers: [
    FiltroPipe,
    OrdenarPipe,
    EstadoService,
    CidadeService,
    BairroService,
    ViaCepService,
    FiltroPeriodoPipe,
    DomicilioFiscalService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ToastService]
    };
  }
}
