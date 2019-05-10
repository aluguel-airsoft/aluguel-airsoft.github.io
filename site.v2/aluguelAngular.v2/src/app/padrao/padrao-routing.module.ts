import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MetasComponent} from './pages/metas/metas.component';
import {OrdensComponent} from './pages/ordens/ordens.component';
import {TitulosComponent} from './pages/titulos/titulos.component';
import {ArquivosComponent} from './pages/arquivos/arquivos.component';
import {ClientesComponent} from './pages/clientes/clientes.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {PlanejamentoComponent} from './pages/planejamento/planejamento.component';
import {StatusClientesComponent} from './pages/status-clientes/status-clientes.component';
import {OrdensFormComponent} from './pages/ordens/components/ordens-form/ordens-form.component';
import {OrdensDetalhesComponent} from './pages/ordens/components/ordens-detalhes/ordens-detalhes.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'planejamento', component: PlanejamentoComponent},
  {path: 'ordens', component: OrdensComponent},
  {path: 'ordens/detalhes/:id', component: OrdensDetalhesComponent},
  {path: 'ordens/pedido', component: OrdensFormComponent},
  {path: 'titulos', component: TitulosComponent},
  {path: 'metas', component: MetasComponent},
  {path: 'status-clientes', component: StatusClientesComponent},
  {path: 'arquivos', component: ArquivosComponent},
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PadraoRoutingModule {
}
