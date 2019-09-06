import { XOR } from 'ts-xor';
import { apiBasePath, RootResources } from '..';
import { ApiResponse, MessageResponse, HttpMethods, MessageResult } from '../../responses';
import { AuthData, Challenges } from '../../user';
import { keysAreStrings as keysAreStrings } from '../../util';

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

  export const HTTP:HttpMethods = 'POST';
  export const Path = `${authBasePath}/${ResourcePaths.login}`

  export interface Args {
    username: string,
    password: string
  }

  /**
   * Type guard; only returns true for valid `Args` objects.
   * @param val 
   */
  export function isArgs(val:any): val is Args {
    return keysAreStrings(val, ['username', 'password'])
  }

  export type Result = UserOrChallengeResult
  export type Response = UserOrChallengeResponse
}

/**
 * Refresh login call which only requires a token
 * and ought to produce fresh credentials, unless
 * it has been more than a month.
 */
export namespace Refresh {

  export const HTTP:HttpMethods = 'POST';
  export const Path = `${authBasePath}/${ResourcePaths.login}`;

  export interface Args {
    refreshToken: string
  }

  /**
   * Type guard; only returns true for valid `Args` objects.
   * @param val 
   */
  export function isArgs(val:any): val is Args {
    return keysAreStrings(val, ['refreshToken'])
  }

  export type Result = UserOrChallengeResult
  export type Response = UserOrChallengeResponse
}

/**
 * Corresponds to the initial challenge a user
 * receives after making their account so they
 * can create a new one.
 */
export namespace NewPassChallenge {

  export const HTTP:HttpMethods = 'POST';
  export const Path = `${authBasePath}/${ResourcePaths.login}`;

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

  /**
   * Type guard; only returns true for valid `Args` objects.
   * @param val 
   */
  export function isArgs(val:any): val is Args {
    return keysAreStrings(val, ['username', 'newPassword', 'session'])
  }

  export type Result = UserOrChallengeResult;
  export type Response = UserOrChallengeResponse;
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

  export const HTTP:HttpMethods = 'POST';
  export const Path = `${authBasePath}/${ResourcePaths.passReset}`;

  export interface Args {
    username: string
  }

  /**
   * Type guard; only returns true for valid `Args` objects.
   * @param val 
   */
  export function isArgs(val:any): val is Args {
    return keysAreStrings(val, ['username'])
  }

  /**
   * When successful, the message ought to say something
   * like, "An email has been sent with a temporary password."
   */
  export type Result = MessageResult;

  export type Response = MessageResponse;
}

/**
 * Conclude a password reset by supplying the code
 * from the email along with a new password.
 */
export namespace ConfirmPassReset {

  export const HTTP:HttpMethods = 'POST';
  export const Path = `${authBasePath}/${ResourcePaths.passReset}`;

  export interface Args {
    username:string
    newPassword: string,
    passwordResetCode: string
  }

  /**
   * Type guard; only returns true for valid `Args` objects.
   * @param val 
   */
  export function isArgs(val:any): val is Args {
    return keysAreStrings(val, ['username', 'newPassword', 'passwordResetCode'])
  }

  /**
   * Ought to tell them they can now log in with their
   * new password.
   */
  export type Result = MessageResult;

  export type Response = MessageResponse;
}

export default this.exports;