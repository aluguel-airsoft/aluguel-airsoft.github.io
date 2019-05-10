export interface IPais {
  id: string;
  nome: string;
  sigla: string;
  idPai: string;
  descricao: string;
}

export class Bairro implements IPais {
  constructor(
    public id: string = null,
    public nome: string = null,
    public sigla: string = null,
    public idPai: string = null,
    public descricao: string = null
  ) {
  }
}
