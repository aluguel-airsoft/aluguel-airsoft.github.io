export class TipoOrdem {
  public id: number;
  public descricao: string;
  public dtCriacao: Date;
  public dtModificacao: Date;
  public idEmpresa: number;
  public idProprio: string;
  public idStatus: number;
  public valorMinimo: number;
  public tipoOrdem: string;

  constructor() {
  }
}
