import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class ViaCepService {

  constructor(private http: HttpClient) {
  }

  get(cep: string): Observable<any> {
    return this.http.get('https://viacep.com.br/ws/' + cep + '/json/').pipe(
      map(res => res)
    );
  }

}
