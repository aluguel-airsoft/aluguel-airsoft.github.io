import {ItemPedido} from './item-pedido';

export interface IPedido {
  id?: number;
  ordem_id?: string;
  jforce_id?: string;
  tipo_ordem?: number;
  client_id?: string;
  dt_emissao?: Date;
  dt_valid_cota?: Date;
  flg_envia_empresa?: number;
  flg_envia_gestor?: number;
  forma_pagto?: string;
  cond_pagto?: string;
  end_entrega?: string;
  // desconto_camp?: number;
  desconto_prazo_cab?: number;
  parc_distrib?: number;
  obs?: string;

  numeroOrdemJForce?: string;
  idTipoDocumento?: string;
  idCondicaoPagamento?: string;
  nroOrdemRecebedor?: string;
  idClienteJForce?: number;
  observacao?: string;
  dtCriacao?: string | Date;
  bloqueioCondicaoPagamento?: string;
  bloqueioValorMinimoPedido?: string;

  itens?: Array<ItemPedido>;

  copias?: string;
  copiarGestor?: boolean;
  enviarParaEmpresa?: boolean;

  confirmaSalvar?: boolean;
}

export class Pedido implements IPedido {
  constructor(
    public id: number = null,
    public ordem_id: string = null,
    public jforce_id: string = null,
    public tipo_ordem: number = null,
    public client_id: string = null,
    public dt_emissao: Date = null,
    public dt_valid_cota: Date = null,
    public flg_envia_empresa: number = null,
    public forma_pagto: string = null,
    public cond_pagto: string = null,
    public end_entrega: string = null,
    // public desconto_camp: number = null,
    public desconto_prazo_cab = null,
    public parc_distrib: number = null,
    public obs: string = null,
    public numeroOrdemJForce: string = null,
    public idTipoDocumento: string = null,
    public idCondicaoPagamento: string = null,
    public nroOrdemRecebedor: string = null,
    public idClienteJForce: number = null,
    public observacao: string = null,
    public dtCriacao: string | Date = null,
    public bloqueioCondicaoPagamento: string = null,
    public bloqueioValorMinimoPedido: string = null,
    public flg_envia_gestor: number = null,
    public itens: Array<ItemPedido> = null,
    public copias: string = null,
    public confirmaSalvar: boolean = null
  ) {
  }

}
