import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  public usuario: any;
  public padraoRotas = [
    {nome: 'sidebar.opcoes.dashboard', routerLink: '/dashboard', icone: 'home'},
    {nome: 'sidebar.opcoes.listaClientes', routerLink: '/clientes', icone: 'supervisor_account'},
    {nome: 'sidebar.opcoes.planejamentoVisitas', routerLink: '/planejamento', icone: 'today'},
    {nome: 'sidebar.opcoes.statusMetas', routerLink: '/metas', icone: 'assignment_turned_in'},
    {nome: 'sidebar.opcoes.statusOrdens', routerLink: '/ordens', icone: 'assignment'},
    {nome: 'sidebar.opcoes.statusTitulos', routerLink: '/titulos', icone: 'book'},
    // {nome: 'sidebar.opcoes.statusClientes', routerLink: '/status-clientes', icone: 'group'},
    {nome: 'sidebar.opcoes.gerenciamentoArquivos', routerLink: '/arquivos', icone: 'folder'},
  ];

  /* Exemplo de futuros módulos
  public sapRotas = [
    { nome: 'SAP Test', routerLink: '/sap/test', icone: 'crop_3_2' }
    ];
  public linxRotas = [
    { nome: 'Linx Test', routerLink: '/linx/test', icone: 'crop_3_2' }
  ];
  public jforceRotas = [
    { nome: 'JForce Test', routerLink: '/jforce/test', icone: 'crop_3_2' }
  ];
  */

  constructor(private translate: TranslateService, private authService: AuthService) {
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  public fazerLogout() {
    this.authService.fazerLogout();
  }

  ngOnInit() {
    this.usuario = this.authService.getUsuario();
  }

}
