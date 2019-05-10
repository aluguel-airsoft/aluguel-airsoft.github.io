import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {BaseChartDirective, Color, Label} from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-grafico-linha',
  templateUrl: './grafico-linha.component.html',
  styleUrls: ['./grafico-linha.component.scss']
})
export class GraficoLinhaComponent implements OnInit {
  public lineChartData: ChartDataSets[] = [
    {data: [10, 30, 35, 25, 40, 60, 80], label: 'Atual'},
    {data: [15, 20, 45, 35, 50, 70, 60], label: 'Anterior'}
  ];
  public lineChartLabels: Label[] = ['Jan.', 'Fev.', 'Mar.', 'Apr.', 'Mai.', 'Jun.', 'Jul.'];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    legend: {position: 'bottom'},
    responsive: true,
    annotation: {},
  };
  public lineChartColors: Color[] = [
    {
      backgroundColor: 'rgba(243, 156, 18,0.2)',
      borderColor: 'rgba(243, 156, 18,1.0)',
      pointBackgroundColor: 'rgba(243, 156, 18,1.0)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(243, 156, 18,1.0)'
    },
    {
      backgroundColor: 'rgba(26, 188, 156,0.2)',
      borderColor: 'rgba(26, 188, 156,1.0)',
      pointBackgroundColor: 'rgba(26, 188, 156,1.0)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(26, 188, 156,1.0)'
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginDataLabels];

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  constructor() {
  }

  ngOnInit() {
  }

}
