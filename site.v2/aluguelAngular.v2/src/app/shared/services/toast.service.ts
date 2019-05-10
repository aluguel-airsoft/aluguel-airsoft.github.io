import {Injectable} from '@angular/core';

declare var Materialize: any;

@Injectable()
export class ToastService {

  constructor() {
  }

  static ativarToast(mensagem: string, duracao?: number) {
    Materialize.toast(mensagem, duracao || 5000);
  }

}
