import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PadraoRoutingModule} from './padrao-routing.module';
import {MetasComponent} from './pages/metas/metas.component';
import {ClientesComponent} from './pages/clientes/clientes.component';
import {SharedModule} from 'src/app/shared/shared.module';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {PlanejamentoComponent} from './pages/planejamento/planejamento.component';
import {OrdensComponent} from './pages/ordens/ordens.component';
import {StatusClientesComponent} from './pages/status-clientes/status-clientes.component';
import {ArquivosComponent} from './pages/arquivos/arquivos.component';
import {TitulosComponent} from './pages/titulos/titulos.component';
import {ClientesGridComponent} from './pages/clientes/components/clientes-grid/clientes-grid.component';
import {ClientesFormComponent} from './pages/clientes/components/clientes-form/clientes-form.component';
import {OrdensFormComponent} from './pages/ordens/components/ordens-form/ordens-form.component';
import {OrdensGridComponent} from './pages/ordens/components/ordens-grid/ordens-grid.component';
import {OrdensDetalhesComponent} from './pages/ordens/components/ordens-detalhes/ordens-detalhes.component';
import {StatusClientesGridComponent} from './pages/status-clientes/components/status-clientes-grid/status-clientes-grid.component';
import {PlanejamentoGridComponent} from './pages/planejamento/components/planejamento-grid/planejamento-grid.component';
import {PlanejamentoFormComponent} from './pages/planejamento/components/planejamento-form/planejamento-form.component';

@NgModule({
  declarations: [
    MetasComponent,
    ClientesComponent,
    DashboardComponent,
    PlanejamentoComponent,
    OrdensComponent,
    StatusClientesComponent,
    StatusClientesGridComponent,
    ArquivosComponent,
    TitulosComponent,
    ClientesGridComponent,
    ClientesFormComponent,
    OrdensFormComponent,
    OrdensGridComponent,
    OrdensDetalhesComponent,
    PlanejamentoGridComponent,
    PlanejamentoFormComponent
  ],
  imports: [
    CommonModule,
    PadraoRoutingModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PadraoModule {
}
