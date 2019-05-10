import {NgModule} from '@angular/core';
import {AuthGuard} from './shared/guard/auth.guard';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './autentificacao/login/login.component';

const routes: Routes = [
  // {path: 'login', component: LoginComponent},
  {path: '', canActivate: [AuthGuard], loadChildren: './padrao/padrao.module#PadraoModule'},
  // {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
