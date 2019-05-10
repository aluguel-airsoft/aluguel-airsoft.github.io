import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ordens',
  templateUrl: './ordens.component.html',
  styleUrls: ['./ordens.component.scss']
})
export class OrdensComponent implements OnInit {

  public item = false;

  constructor(
    public titulo: Title,
    public translate: TranslateService,
    private router: Router
  ) {
    titulo.setTitle(translate.instant('ordens.titulo'));
  }

  ngOnInit() {
  }

  public funcaotemporaria() {
    this.router.navigate(['/ordens/pedido']);
  }

}
