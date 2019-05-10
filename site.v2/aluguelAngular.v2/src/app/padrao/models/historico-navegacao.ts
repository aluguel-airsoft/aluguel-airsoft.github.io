export interface IHistoricoNavegacao {
  path: string;
  componentName: string;
  state?: any;
}

export class historicoNavegacao implements IHistoricoNavegacao {
  constructor(
    public path: string = null,
    public componentName: string = null,
    public state: any = null
  ) {
  }
}
