import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TitulosComponent} from './pages/titulos/titulos.component';

const routes: Routes = [
  {path: 'titulos', component: TitulosComponent},
  {path: '**', redirectTo: 'titulos'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PadraoRoutingModule {
}
