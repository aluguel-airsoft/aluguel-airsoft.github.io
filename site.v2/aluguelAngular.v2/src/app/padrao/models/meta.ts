export class Meta {

  public id: number;
  public descricao: string;
  public idProprio: string;
  public sequencia: number;
  public idPessoa?: number;
  public idGrupoCliente?: number;
  public idCliente?: number;
  public idEstado?: string;
  public idCanalCliente?: number;
  public idGrupoProduto?: number;
  public idMaterial: string;
  public idProdutoHierarquia?: number;
  public idCategoriaProduto?: number;
  public qtdePlanejada: number;
  public qtdeRealizada: number;
  public valorPlanejado: number;
  public valorRealizado: number;
  public pesoPlanejado: number;
  public pesoRealizado: number;
  public dtValidadeInicial: Date;
  public dtValidadeFinal: Date;
  public idStatus: number;
  public dtCriacao: Date;
  public dtModificacao: Date;
  public idEmpresa: string;
  public idRegional: number;

  constructor() {
  }
}
