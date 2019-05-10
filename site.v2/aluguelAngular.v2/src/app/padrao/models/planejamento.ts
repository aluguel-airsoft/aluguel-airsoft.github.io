export enum RecorrenciaVisita {
  'Sem recorrencia' = 1,
  'Diário' = 2,
  'Semanal' = 3,
  'Quinzenal' = 4,
  'Mensal' = 5,
  'Anual' = 6
}

export enum StatusPlanejamento {
  'HomeOffice' = 1,
  'Justificado' = 2,
  'Não Justificado' = 3,
  'Não Planejado' = 4,
  'Planejado' = 5
}

export class Planejamento {
  constructor(
    public id?: number,
    public idProprio?: string,
    public idCliente?: number,
    public razaoSocial?: string,
    public enderecoCliente?: string,
    public idTipoVisita?: number,
    public recorrencia?: RecorrenciaVisita,
    public diaSemana?: number,
    public horario?: number,
    public dtCadastro?: Date,
    public dtRecerecia?: Date,
    public dtFimPlanejamento?: Date,
    public valorPlanejado?: number,
    public valorRealizado?: number,
    public observacao?: string,
    public idStatus?: number,
    public dtCriacao?: Date,
    public dtModificacao?: Date,
    public naoVisita?: string,
    public naoVenda?: string,
    public statusPlan?: StatusPlanejamento
  ) {
  }
}
