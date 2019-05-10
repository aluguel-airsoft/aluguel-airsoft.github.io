export class TokenAutentificacao {
  constructor(
    public token_type: string = null,
    public access_token: string = null,
    public expires_in: number = null,
    public refresh_token: string = null,
    public id_token: string = null,
    public error: string = null,
    public error_description: string = null,
    public expiration_date: string = null,
    public remember: boolean = null,
  ) {
  }
}
