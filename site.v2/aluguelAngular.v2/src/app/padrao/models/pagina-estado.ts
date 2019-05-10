export interface IPaginaEstado {
  readonly data: any;

  markForRemoval(): void;
}

export class PaginaEstado implements IPaginaEstado {
  private _removal = false;

  constructor(
    data: any = null,
  ) {
  }

  private _data: any;

  get data() {
    return this._data;
  }

  get remove() {
    return this._removal;
  }

  markForRemoval() {
    this._removal = true;
  }

  setData(data: any) {
    this._data = data;
  }
}
