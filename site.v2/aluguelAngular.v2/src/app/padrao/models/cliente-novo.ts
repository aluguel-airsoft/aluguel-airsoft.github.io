export class ClienteNovo {
  constructor(
    public id: number = null,
    public razaoSocial: string = null,
    public idProprio: string = null,
    public idEmpresa: number = null,
    public tipoPessoa: string = null,
    public cpfCnpj: string = null,
    public inscricaoEstadual: string = null,
    public inscricaoMunicipal: string = null,
    public nomeFantasia: string = null,
    public telefone: string = null,
    public fax: string = null,
    public logradouro: string = null,
    public numero: string = null,
    public bairro: string = null,
    public cep: string = null,
    public idCidade: number = null,
    public idEstado: string = null,
    public idPais: number = null,
    public emailNotaFiscal: string = null,
    public emailComercial: string = null,
    public idCanalCliente: number = null,
    public observacao: string = null,
    public idStatus: number = null,
    public dtCriacao: Date = null,
    public dtModificacao: Date = null,
    public idPessoa: number = null,
    public contatoNovo?: any[]
  ) {
  }

  // public empresa: Empresa;
  // public cidade: Cidade;
  // public estado: Estado;
  // public pais: Bairro;
  // public canalCliente: CanalCliente;
  // public status: Status;
  // public pessoa: Pessoa;

}
