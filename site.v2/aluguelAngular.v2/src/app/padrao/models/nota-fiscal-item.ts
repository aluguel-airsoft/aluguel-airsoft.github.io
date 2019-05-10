export class NotaFiscalItem {
  constructor(
    public id: string = null,
    public idItem: string = null,
    public descricao: string = null,
    public valorBruto: number = null,
    public kgTotal: number = null,
    public icms: number = null,
    public st: number = null
  ) {
  }
}
