export interface ITitulo {
  id: number;
  idProprio: string;
  idCliente: string;

  dtCompensacao: Date;
  dtGeracao: string;
  dtPlanejamento: Date;
  exercicio: number;
  idEmpresa: string;
  idProcesso: number;
  montanteMoeda: number;
  montanteMoedaPAG: number;
  montanteMoedaSLD: number;
  nroDocumentoContabil: string;
  nroLinhaDocContabil: number;
  qtdeRegistros: number;
  razaoSocial: string;
  diasAtraso: number;
}

export class Titulo implements ITitulo {
  constructor(
    public id: number = null,
    public idProprio: string = null,
    public idCliente: string = null,
    public dtCompensacao: Date = null,
    public dtGeracao: string = null,
    public dtPlanejamento: Date = null,
    public exercicio: number = null,
    public idEmpresa: string = null,
    public idProcesso: number = null,
    public montanteMoeda: number = null,
    public montanteMoedaPAG: number = null,
    public montanteMoedaSLD: number = null,
    public nroDocumentoContabil: string = null,
    public nroLinhaDocContabil: number = null,
    public qtdeRegistros: number = null,
    public razaoSocial: string = null,
    public diasAtraso: number = null
  ) {
  }

}
