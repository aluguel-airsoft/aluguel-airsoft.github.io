export class RetornoPedido {
  public idTipoDocumento: string;
  public idCondicaoPagamento: string;
  public nroOrdemRecebedor: string;
  public numeroOrdemJForce: string;
  public idClienteJForce: number;
  public observacao: string;
  public dtCriacao: Date;
  public numeroReferencia: string;
  public bloqueioCondicaoPagamento: string;
  public bloqueioDuplicataValorMinimo: string;
  public bloqueioFrete: string;
  public bloqueioMixMinimoPedido: string;
  public bloqueioPercentualEletroduto: string;
  public bloqueioPreco: string;
  public bloqueioValorMinimoPedido: string;
  public revenda: string;
  public copias: string;
  public copiarGestor: boolean;
  public enviarParaEmpresa: boolean;
  public confirmaSalvar: boolean;
}
