export interface IClienteEndereco {
  id: number;
  tipo: string;
  telefone: string;
  fax: string;
  cep: string;
  estado: string;
  cidade: string;
  bairro: string;
  pais: string;
  endereco: string;
  numeroEnd: number;
  email: string;
  inscEstadual: string;
  clientId: string;
}

export class ClienteEndereco implements IClienteEndereco {
  constructor(
    public id: number = null,
    public tipo: string = null,
    public telefone: string = null,
    public fax: string = null,
    public cep: string = null,
    public estado: string = null,
    public cidade: string = null,
    public bairro: string = null,
    public pais: string = null,
    public endereco: string = null,
    public numeroEnd: number = null,
    public email: string = null,
    public inscEstadual: string = null,
    public clientId: string = null,
  ) {
  }
}
