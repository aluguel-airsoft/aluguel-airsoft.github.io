export interface ICidade {
  id: string;
  nome: string;
  idPai: string;
  estado_id: string;
  descricao: string;
}

export class Cidade implements ICidade {
  constructor(
    public id: string = null,
    public idPai: string = null,
    public nome: string = null,
    public estado_id: string = null,
    public descricao: string = null,
  ) {
  }
}
