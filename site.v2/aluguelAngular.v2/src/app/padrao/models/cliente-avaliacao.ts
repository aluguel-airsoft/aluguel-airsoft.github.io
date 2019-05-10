export interface IClienteAvaliacao {
  id?: string;
  descricao?: string;
}

export class ClienteAvaliacao implements IClienteAvaliacao {
  constructor(
    public id?: string,
    public descricao?: string
  ) {
  }
}
