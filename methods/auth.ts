export interface BeginPasswordResetArgs {
  username:string
}
export interface ConfirmPasswordResetArgs {
  username:string
  newPassword: string,
  passwordResetCode: string
}
export interface NewPasswordArgs {
  username: string,
  newPassword: string,
  session: string
}
export interface SignInArgs {
  username: string,
  password: string
}

export interface RefreshArgs {
  refreshToken: string
}