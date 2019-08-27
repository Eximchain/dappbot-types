import { XOR } from 'ts-xor';
import { apiBasePath } from '../methods';
import { DappBotResponse, MessageResponse, HttpMethods, HttpMethodNames } from '../responses/responses';
import { ChallengeType, UserResponseData, ChallengeData } from '../user';

export const authBasePath = `${apiBasePath}/auth`;

//////////////////////////////////
// Login Types
//////////////////////////////////

type UserOrChallengeResponse = DappBotResponse<XOR<UserResponseData, ChallengeData>>;

/**
 * Main login call which either produces a user
 * object and credentials, or returns a challenge.
 */
export namespace Login {
  export interface Args {
    username: string,
    password: string
  }
  export type Result = UserOrChallengeResponse
  export const HTTP:HttpMethodNames = 'POST';
  export const Path = `${authBasePath}/login`
}

/**
 * Refresh login call which only requires a token
 * and ought to produce fresh credentials, unless
 * it has been more than a month.
 */
export namespace Refresh {
  export interface Args {
    refreshToken: string
  }
  export type Result = UserOrChallengeResponse
  export const HTTP:HttpMethodNames = 'POST';
  export const Path = `${authBasePath}/login`;
}

/**
 * Corresponds to the initial challenge a user
 * receives after making their account so they
 * can create a new one.
 */
export namespace NewPassChallenge {
  /** 
   * Note that the session here would be from a
   * previous ChallengeResponse.  This is not the
   * Authorization token, these values are passed 
   * back and forth in each step of a Challenge
   * Response interaction.
   * */
  export interface Args {
    username: string,
    newPassword: string,
    session: string
  }
  export type Result = UserOrChallengeResponse;
  export const HTTP:HttpMethods = HttpMethods.POST;
  export const Path = `${authBasePath}/login`;
}

//////////////////////////////////
// Password Reset Types
//////////////////////////////////

/**
 * Initiate a password reset.  This call will trigger
 * an email containing the passwordResetCode which
 * must be provided to confirm the reset.
 */
export namespace BeginPassReset {
  export interface Args {
    username: string
  }
  export type Result = MessageResponse;
  export const HTTP:HttpMethods = HttpMethods.POST;
  export const Path = `${authBasePath}/password-reset`;
}

/**
 * Conclude a password reset by supplying the code
 * from the email along with a new password.
 */
export namespace ConfirmPassReset {
  export interface Args {
    username:string
    newPassword: string,
    passwordResetCode: string
  }
  export type Result = MessageResponse;
  export const HTTP:HttpMethods = HttpMethods.POST;
  export const Path = `${authBasePath}/password-reset`;
}

export default this.exports;