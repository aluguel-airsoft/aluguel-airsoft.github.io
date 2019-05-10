import {Component, OnInit} from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {Color, Label} from 'ng2-charts';

@Component({
  selector: 'app-grafico-barra',
  templateUrl: './grafico-barra.component.html',
  styleUrls: ['./grafico-barra.component.scss'],
})
export class GraficoBarraComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    legend: {position: 'bottom'},
    responsive: true,
    scales: {xAxes: [{}], yAxes: [{}]},
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['Jan.', 'Fev.', 'Mar.', 'Abr.', 'Mai.', 'Jun.', 'Jul.'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  public barChartColors: Color[] = [
    {
      backgroundColor: 'rgba(26, 188, 156,0.5)',
      borderColor: 'rgba(26, 188, 156,0.5)',
      pointBackgroundColor: 'rgba(26, 188, 156,0.5)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(26, 188, 156,1.0)'
    },
    {
      backgroundColor: 'rgba(243, 156, 18,1.0)',
      borderColor: 'rgba(243, 156, 18,1.0)',
      pointBackgroundColor: 'rgba(243, 156, 18,1.0)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(243, 156, 18,1.0)'
    },
  ];

  public barChartData: ChartDataSets[] = [
    {data: [25, 59, 80, 51, 56, 55, 40], label: 'Planejado'},
    {data: [28, 48, 80, 39, 86, 27, 90], label: 'Realizado'}
  ];

  constructor() {
  }

  ngOnInit() {
  }
}
