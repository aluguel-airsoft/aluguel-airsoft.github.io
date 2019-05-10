import {Component, EventEmitter} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from './shared/services/auth.service';
import {MaterializeAction} from 'angular2-materialize';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public globalActions = new EventEmitter<string | MaterializeAction>();

  constructor(private translate: TranslateService, private authService: AuthService) {
    translate.setDefaultLang('pt-BR');
  }

  public estaAutenticado(): boolean {
    return this.authService.estaAutenticado();
  }

}
