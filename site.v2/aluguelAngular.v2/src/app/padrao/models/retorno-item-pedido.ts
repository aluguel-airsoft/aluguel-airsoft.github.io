import {DeterminacaoCondicao} from './determinacao-condicao';

export interface IRetornoItemPedido {
  id: number;
  categoriaItem: string;
  cfop: string;
  documentoVenda: string;
  grupoMercadoria: string;
  idCentroFornecedor: string;
  idMaterial: string;
  idProcesso: number;
  idProprio: string;
  nroItemVenda: number;
  qtdeRegistros: number;
  quantidadeVenda: number;
  textoBreveItem: string;
  unidadeVenda: string;
  tipoCondicao: string;
  baseCondicao: number;
  montantePercCondicao: number;

  valorVenda: number;
  descontoGeral: number;
  valorTotalVenda: number;
  valorST: number;
  valorIPI: number;

  determinacaoCondicao?: DeterminacaoCondicao;
}

export class RetornoItemPedido implements IRetornoItemPedido {
  constructor(
    public id: number = null,
    public categoriaItem: string = null,
    public cfop: string = null,
    public documentoVenda: string = null,
    public grupoMercadoria: string = null,
    public idCentroFornecedor: string = null,
    public idMaterial: string = null,
    public idProcesso: number = null,
    public idProprio: string = null,
    public nroItemVenda: number = null,
    public qtdeRegistros: number = null,
    public quantidadeVenda: number = null,
    public textoBreveItem: string = null,
    public unidadeVenda: string = null,
    public tipoCondicao: string = null,
    public baseCondicao: number = null,
    public montantePercCondicao: number = null,
    public valorVenda: number = null,
    public descontoGeral: number = null,
    public valorTotalVenda: number = null,
    public valorST: number = null,
    public valorIPI: number = null,
    public determinacaoCondicao: DeterminacaoCondicao = null
  ) {

  }
}
