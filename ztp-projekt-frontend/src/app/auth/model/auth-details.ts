export class AuthDetails {
  public readonly isLoggedIn: boolean;
  public readonly userId: number | null;
  public readonly email: string | null;
  public readonly username: string | null;

  constructor(isLoggedIn: boolean, userId: number | null, email: string | null, username: string | null) {
    this.isLoggedIn = isLoggedIn;
    this.userId = userId;
    this.email = email;
    this.username = username;
  }
}
