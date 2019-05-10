import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Cliente} from '../../models/cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})

export class ClientesComponent implements OnInit {

  public item: Cliente = null;
  public novoCadastro = false;

  constructor(public titulo: Title, private translateService: TranslateService, private router: Router, private route: ActivatedRoute) {
    titulo.setTitle(this.translateService.instant('clientes.titulo'));
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params.novoCadastro) {
        this.item = new Cliente();
      } else if (!params.novoCadastro && Object.keys(params).length > 0) {
        this.editar(params);
      } else {
        this.item = null;
      }
    });
  }

  novo(): void {
    this.item = null;
    this.novoCadastro = true;
    this.router.navigate(['/clientes', {novoCadastro: true}]);
  }

  editar(cliente: any): void {
    this.item = cliente;
    this.novoCadastro = false;
  }

}
