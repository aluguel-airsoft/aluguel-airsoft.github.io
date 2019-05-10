import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'filtro'})
export class FiltroPipe implements PipeTransform {

  transform(items: any[], searchText: any, campo: string, searchList?: any[]): any[] {
    let listToFilter = [];
    if (!searchList && !items) {
      return [];
    }
    if (!searchList) {
      listToFilter = items;
    } else {
      listToFilter = searchList;
    }
    if (!searchText) {
      return items;
    }
    if (searchText.length < 3 && !Array.isArray(searchText)) {
      return items;
    }
    if (!campo) {
      return items;
    }

    if (Array.isArray(searchText)) {
      const t = [];
      const f = [];

      searchText.forEach((st: string) => {
        t.push(listToFilter.filter(it => {
          return it[campo].toString().toUpperCase().includes(st);
        }));
      });

      t.forEach((i) => {
        i.forEach((s) => {
          f.push(s);
        });
      });
      return f;
    } else {
      searchText = searchText.toLowerCase();
      return listToFilter.filter(it => {
        return it[campo].toLowerCase().includes(searchText);
      });
    }
  }

}
