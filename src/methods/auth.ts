import { XOR } from 'ts-xor';
import { DappBotResponse } from '../responses/responses';
import { ChallengeType, UserResponseData, ChallengeData } from '../user';

//////////////////////////////////
// Login Types
//////////////////////////////////

export type LoginArgs = XOR<SignInArgs, XOR<RefreshArgs, NewPasswordArgs>>;

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

export interface ForgotPasswordChallenge extends ChallengeData {
  ChallengeName : ChallengeType.ForgotPassword
}

export type SignInResponse = DappBotResponse<XOR<UserResponseData, ChallengeData>>

export type UserResponse = DappBotResponse<UserResponseData>

export type ChallengeResponse = DappBotResponse<ChallengeData>

//////////////////////////////////
// Password Reset Types
//////////////////////////////////

export type PasswordResetReqBody = XOR<BeginPasswordResetArgs, ConfirmPasswordResetArgs>;

export interface BeginPasswordResetArgs {
  username:string
}
export interface ConfirmPasswordResetArgs {
  username:string
  newPassword: string,
  passwordResetCode: string
}