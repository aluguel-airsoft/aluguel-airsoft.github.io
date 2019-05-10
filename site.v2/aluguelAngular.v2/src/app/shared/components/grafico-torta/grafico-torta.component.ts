import {Component, OnInit} from '@angular/core';
import {ChartOptions, ChartType} from 'chart.js';
import {Label} from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-grafico-torta',
  templateUrl: './grafico-torta.component.html',
  styleUrls: ['./grafico-torta.component.scss']
})
export class GraficoTortaComponent implements OnInit {
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {position: 'bottom'}
  };
  public pieChartLabels: Label[] = ['Vendas', 'Restante'];
  public pieChartData: number[] = [750, 250];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(39, 174, 96,0.5)', 'rgba(52, 152, 219,0.5)'],
    },
  ];

  constructor() {
  }

  ngOnInit() {
  }
}
