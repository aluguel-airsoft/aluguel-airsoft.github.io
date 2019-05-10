import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AluguelComponent } from './aluguel/aluguel.component';

import { FirebaseConfig } from './../environments/firebase.config'
import { AngularFireModule } from 'angularfire2/index';

@NgModule({
  declarations: [
    AppComponent,
    AluguelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(FirebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
