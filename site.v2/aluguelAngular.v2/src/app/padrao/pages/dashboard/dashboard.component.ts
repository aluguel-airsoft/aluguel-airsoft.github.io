import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public titulo: Title, private translateService: TranslateService) {
    titulo.setTitle(this.translateService.instant('dashboard.titulo'));
  }

  ngOnInit() {
  }

}
