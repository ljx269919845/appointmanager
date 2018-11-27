export class LoginUser {
  constructor(
    public username?: string,
    public password?: string
  ) {}
}

export class LoginInfo extends LoginUser {
  constructor(
    public username?: string,
    public password?: string,
    public remember?: Array<string>
  ) {
    super(username, password);
  }
}
