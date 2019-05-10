import {HttpHeaders} from '@angular/common/http';

export class BaseService {

  constructor() {
  }

  static getAuthentication(): any {
    if (JSON.parse(sessionStorage.getItem('authentication')) || JSON.parse(localStorage.getItem('authentication'))) {
      return JSON.parse(sessionStorage.getItem('authentication')).data.access_token || JSON.parse(localStorage.getItem('authentication')).data.access_token;
    }
  }

  getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Accept-Language': 'pt-BR',
      'x-api-version': '1.0'
    };
  }

  getAuthHeaders(): HttpHeaders {
    const options = this.getHeaders();
    const token = BaseService.getAuthentication();
    return new HttpHeaders(
      {
        'Content-Type': options['Content-Type'],
        'Accept-Language': options['Accept-Language'],
        'x-api-version': options['x-api-version'],
        'Authorization': 'Bearer ' + token
      },
    );
  }

}

export default BaseService;
