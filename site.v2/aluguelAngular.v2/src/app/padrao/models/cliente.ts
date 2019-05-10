import {Contato} from './contato';

export enum StatusClienteNovo {
  normal = 'normal',
  alterado = 'alterado',
  enviado = 'enviado',
  novo = 'novo'
}

export class Cliente {

  public id?: string;
  public cep?: string;
  public rua?: string;
  public nro?: string;
  public nome?: string;
  public cnpj?: string;
  public pais?: string;
  public email?: string;
  public idPais?: string;
  public cidade?: string;
  public estado?: string;
  public bairro?: string;
  public celular?: string;
  public empVend?: string;
  public suframa?: string;
  public empresa?: string;
  public idPessoa?: string;
  public telefone?: string;
  public endereco?: string;
  public idEstado?: string;
  public idCidade?: string;
  public emailNFE?: string;
  public idCliente?: string;
  public idEmpresa?: string;
  public obrigacao?: string;
  public observacao?: string;
  public grupoRisco?: string;
  public razaoSocial?: string;
  public tipoCliente?: string;
  public campoSelecao: string;
  public canalCliente?: string;
  public condExpedicao?: string;
  public dtUltimaCompra?: Date;
  public dtProximaVisita?: Date;
  public camposelecao?: string;
  public nomeFantasia?: string;
  public domicilioFiscal?: string;
  public inscricaoEstadual?: string;
  public numeroClienteJForce?: string;
  public contatoNovo?: Array<Contato>;
  public idCanalDistribuicao?: string;
  public statusTituloVencido?: boolean;
  public statusLimiteCredito?: boolean;
  public idClassificacaoCliente?: string;
  public statusBloqueioCredito?: boolean;
  public statusLimiteDiasSemCompra?: number;
  public statusClienteNovo?: StatusClienteNovo;

  constructor() {
  }
}
