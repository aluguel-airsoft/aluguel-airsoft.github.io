export interface IApiResultadoBasico {
  exception: {};
  key: string;
  message: string;
  type: string;
}

export interface IApiMensagemBasica {
  key: string;
  message: string;
  type: string;
}

export interface IApiResultado {
  isValid: boolean;
  data: any;
  errors: Array<IApiResultadoBasico>;
  messages: Array<IApiMensagemBasica>;
}

export class ApiBasicResult implements IApiResultado {
  constructor(
    public isValid: boolean = null,
    public data: any = null,
    public errors: Array<IApiResultadoBasico> = null,
    public messages: Array<IApiMensagemBasica> = null
  ) {
  }
}
