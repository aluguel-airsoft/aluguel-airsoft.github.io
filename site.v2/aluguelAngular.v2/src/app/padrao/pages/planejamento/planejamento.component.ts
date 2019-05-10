import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Planejamento} from '../../models/planejamento';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-planejamento',
  templateUrl: './planejamento.component.html',
  styleUrls: ['./planejamento.component.scss']
})
export class PlanejamentoComponent implements OnInit {

  public item: Planejamento = null;
  public novoCadastro = false;

  constructor(public titulo: Title, private translate: TranslateService, private router: Router, private route: ActivatedRoute) {
    titulo.setTitle(this.translate.instant('planejamento.titulo'));
  }

  novo() {
    this.item = null;
    this.novoCadastro = true;
    this.router.navigate(['/planejamento', {novoCadastro: true}]);
  }

  editar(planejamento: Planejamento) {
    this.item = planejamento;
    this.novoCadastro = false;
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params.novoCadastro) {
        this.item = new Planejamento();
        // } else if (!params.novoCadastro && Object.keys(params).length > 0) {
        //   this.editar(params);
      } else {
        this.item = null;
      }
    });
  }
}
