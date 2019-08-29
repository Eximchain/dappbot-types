import { XOR } from 'ts-xor';
import { apiBasePath, RootResources } from '..';
import { ApiResponse, MessageResponse, HttpMethods, MessageData } from '../../responses';
import { AuthData, Challenges } from '../../user';

/**
 * Baseline path from which more specific auth
 * paths are built on top of.
 */
export const authBasePath = `${apiBasePath}/${RootResources.auth}`;

/**
 * Subpaths available on the auth endpoint.
 * Built into an enum for easy change later on.
 */
export enum ResourcePaths {
  login = 'login',
  passReset = 'password-reset'
}

/**
 * Response from a call to our login endpoint.  It
 * either contains successful authentication or
 * a challenge for the user to respond to.
 */
export type UserOrChallengeResult = XOR<AuthData, Challenges.Data>;

/**
 * Decoded API response from a call to our login
 * endpoint.  It either contains successful 
 * authentication ora challenge for the user 
 * to respond to.
 */
export type UserOrChallengeResponse = ApiResponse<UserOrChallengeResult>;

/**
 * Main login call which either produces a user
 * object and credentials, or returns a challenge.
 */
export namespace Login {
  export interface Args {
    username: string,
    password: string
  }
  export type Result = UserOrChallengeResult
  export type Response = UserOrChallengeResponse
  export const HTTP:HttpMethods = 'POST';
  export const Path = `${authBasePath}/${ResourcePaths.login}`
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
  export type Result = UserOrChallengeResult
  export type Response = UserOrChallengeResponse
  export const HTTP:HttpMethods = 'POST';
  export const Path = `${authBasePath}/${ResourcePaths.login}`;
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

  export type Result = UserOrChallengeResult;
  export type Response = UserOrChallengeResponse;
  export const HTTP:HttpMethods = 'POST';
  export const Path = `${authBasePath}/${ResourcePaths.login}`;
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

  /**
   * When successful, the message ought to say something
   * like, "An email has been sent with a temporary password."
   */
  export type Result = MessageData;

  export type Response = MessageResponse;
  export const HTTP:HttpMethods = 'POST';
  export const Path = `${authBasePath}/${ResourcePaths.passReset}`;
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

  /**
   * Ought to tell them they can now log in with their
   * new password.
   */
  export type Result = MessageData;
  
  export type Response = MessageResponse;
  export const HTTP:HttpMethods = 'POST';
  export const Path = `${authBasePath}/${ResourcePaths.passReset}`;
}

export default this.exports;