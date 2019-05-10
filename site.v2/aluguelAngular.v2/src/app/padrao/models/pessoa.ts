export enum StatusPessoa {
  normal = 'normal',
  alterado = 'alterado',
  enviado = 'enviado',
  novo = 'novo'
}

export class Pessoa {

  public id: number;
  public nome: string;
  public dtCriacao: Date;
  public idCargo: number;
  public idStatus: number;
  public idOrigem: number;
  public idProprio: number;
  public idRegional: string;

  constructor() {
  }
}
