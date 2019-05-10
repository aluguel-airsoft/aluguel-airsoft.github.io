
export class Usuario {

  public email: string;
  public idUser: string;
  public blocked: boolean;
  public enabled: boolean;
  public password: string;
  public username: string;
  public lastName: string;
  public firstName: string;
  public logonDate: Date;
  public creationDate: Date;
  public lastActionDate: Date;
  public emailConfirmed: boolean;
  public invalidLogonAmount: number;
  public idCanalDistribuicao: number;

  constructor() {
  }
}
