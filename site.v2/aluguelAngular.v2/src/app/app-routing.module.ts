import {NgModule} from '@angular/core';
import {AuthGuard} from './shared/guard/auth.guard';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './autentificacao/login/login.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', canActivate: [AuthGuard], loadChildren: './modulos/padrao/padrao.module#PadraoModule'},
  {path: 'sap', loadChildren: './modulos/sap/sap.module#SapModule'},
  {path: 'linx', loadChildren: './modulos/linx/linx.module#LinxModule'},
  {path: 'jforce', loadChildren: './modulos/jforce/jforce.module#JforceModule'},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
