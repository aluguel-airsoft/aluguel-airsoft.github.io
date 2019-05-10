import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'filtroPeriodo'})
export class FiltroPeriodoPipe implements PipeTransform {

  transform(itens: any[], data: any, campo: any, periodo: string): any {
    if (data) {
      if (periodo.toLocaleLowerCase() === 'menor') {
        return itens.filter(item => {
          return new Date(item[campo]) <= new Date(data);
        });
      } else if (periodo.toLocaleLowerCase() === 'maior') {
        return itens.filter(item => {
          return new Date(item[campo]) >= new Date(data);
        });
      } else if (periodo.toLocaleLowerCase() === 'igual') {
        return itens.filter(item => {
          return new Date(item[campo]).toString() === new Date(data).toString();
        });
      }
    }
    return itens;
  }

}
