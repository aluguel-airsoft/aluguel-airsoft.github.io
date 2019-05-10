export class NotaFiscal {
  constructor(
    public id: string = null,
    public idNotaFiscal: string = null,
    public numDocumento: number = null,
    public valor: number = null,
    public idCondicaoPagto: string = null,
    public naturezaOp: string = null,
    public tipoNf: string = null,
    public transportadora: string = null) {
  }
}
