import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PadraoRoutingModule} from './padrao-routing.module';
import {SharedModule} from 'src/app/shared/shared.module';
import {TitulosComponent} from './pages/titulos/titulos.component';

@NgModule({
  declarations: [
    TitulosComponent
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
