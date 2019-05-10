export interface ICampanhaDetalhe {
  id?: number;
  descontoPermitido?: number;
  dtCriacao?: Date;
  dtModificacao?: Date;
  idCampanha?: number;
  idMaterial?: string;
  idProdutoHierarquia?: number;
  idProprio?: string;
  idStatus?: number;
  quantidadeVenda?: number;
}

export class CampanhaDetalhe implements ICampanhaDetalhe {

}
