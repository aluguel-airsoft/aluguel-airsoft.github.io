export enum StatusContatoNovo {
  normal = 'normal',
  alterado = 'alterado',
  enviado = 'enviado',
  novo = 'novo'
}

export class Contato {

  public id: string;
  public nome?: string;
  public email: string;
  public celular: string;
  public telefone: string;
  public sobrenome?: string;
  public nomeContatoV?: string;
  public numeroClienteJForce?: string;
  public numeroContatoJForce?: string;

  constructor() {
  }
}
