import { XOR } from 'ts-xor';
import { apiBasePath, RootResources } from '../../methods';
import { ApiResponse, MessageResponse, HttpMethods, MessageResult } from '../../responses';
import { AuthData, Challenges } from '../../user';
import { keysAreStrings, keysAreBooleans, keysNonNull, keysNotPresent } from '../../validators';

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
  passReset = 'password-reset',
  configureMfa = 'configure-mfa'
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

//////////////////////////////////
// Login Types
//////////////////////////////////

/**
 * Main login call which either produces a user
 * object and credentials, or returns a challenge.
 */
export namespace Login {

  export const HTTP:HttpMethods.POST = 'POST';
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
    return keysAreStrings(val, ['username', 'password']);
  }

  /**
   * Factory to produce an Args object with
   * empty strings. Useful for getting the 
   * correct shape as a value.
   */
  export function newArgs(): Args {
    return {
      username : '',
      password : ''
    }
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

  export const HTTP:HttpMethods.POST = 'POST';
  export const Path = `${authBasePath}/${ResourcePaths.login}`;

  export interface Args {
    refreshToken: string
  }

  /**
   * Type guard; only returns true for valid `Args` objects.
   * @param val 
   */
  export function isArgs(val:any): val is Args {
    return keysAreStrings(val, ['refreshToken']);
  }

  /**
   * Factory to produce an Args object with
   * empty strings. Useful for getting the 
   * correct shape as a value.
   */
  export function newArgs(): Args {
    return {
      refreshToken : ''
    }
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

  export const HTTP:HttpMethods.POST = 'POST';
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
    return keysAreStrings(val, ['username', 'newPassword', 'session']);
  }

  /**
   * Factory to produce an Args object with
   * empty strings. Useful for getting the 
   * correct shape as a value.
   */
  export function newArgs(): Args {
    return {
      username : '',
      newPassword : '',
      session : ''
    }
  }

  export type Result = UserOrChallengeResult;
  export type Response = UserOrChallengeResponse;
}

/**
 * Corresponds to the challenge a user with
 * MFA enabled gets to verify their MFA code.
 */
export namespace MfaLoginChallenge {

  export const HTTP:HttpMethods.POST = 'POST';
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
    mfaLoginCode: string,
    session: string
  }

  /**
   * Type guard; only returns true for valid `Args` objects.
   * @param val 
   */
  export function isArgs(val:any): val is Args {
    return keysAreStrings(val, ['username', 'mfaLoginCode', 'session']);
  }

  /**
   * Factory to produce an Args object with
   * empty strings. Useful for getting the 
   * correct shape as a value.
   */
  export function newArgs(): Args {
    return {
      username     : '',
      mfaLoginCode : '',
      session      : ''
    }
  }

  export type Result = UserOrChallengeResult;
  export type Response = UserOrChallengeResponse;
}

/**
 * Corresponds to the challenge a user with
 * MFA enabled gets to verify their MFA code.
 */
export namespace SelectMfaChallenge {

  export const HTTP:HttpMethods.POST = 'POST';
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
    mfaSelection: Challenges.MfaTypes,
    session: string
  }

  /**
   * Type guard; only returns true for valid `Args` objects.
   * @param val 
   */
  export function isArgs(val:any): val is Args {
    return keysAreStrings(val, ['username', 'mfaSelection', 'session']) && Challenges.isMfaTypes(val.mfaSelection);
  }

  /**
   * Factory to produce an Args object with
   * empty strings. Useful for getting the 
   * correct shape as a value.
   */
  export function newArgs(): Args {
    return {
      username     : '',
      mfaSelection : Challenges.Types.AppMfa,
      session      : ''
    }
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

  export const HTTP:HttpMethods.POST = 'POST';
  export const Path = `${authBasePath}/${ResourcePaths.passReset}`;

  export interface Args {
    username: string
  }

  /**
   * Type guard; only returns true for valid `Args` objects.
   * @param val 
   */
  export function isArgs(val:any): val is Args {
    return keysAreStrings(val, ['username']) && keysNotPresent(val, ['newPassword', 'passwordResetCode']);
  }

  /**
   * Factory to produce an Args object with
   * empty strings. Useful for getting the 
   * correct shape as a value.
   */
  export function newArgs(): Args {
    return {
      username : ''
    }
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

  export const HTTP:HttpMethods.POST = 'POST';
  export const Path = `${authBasePath}/${ResourcePaths.passReset}`;

  export interface Args {
    username:string,
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
   * Factory to produce an Args object with
   * empty strings. Useful for getting the 
   * correct shape as a value.
   */
  export function newArgs(): Args {
    return {
      username : '',
      newPassword : '',
      passwordResetCode : ''
    }
  }

  /**
   * Ought to tell them they can now log in with their
   * new password.
   */
  export type Result = MessageResult;

  export type Response = MessageResponse;
}

//////////////////////////////////
// Configure MFA Types
//////////////////////////////////

/**
 * Sets user MFA preferences
 */
export namespace SetMfaPreference {

  export const HTTP:HttpMethods.POST = 'POST';
  export const Path = `${authBasePath}/${ResourcePaths.configureMfa}`;

  export interface Args {
    mfaEnabled: boolean,
    preferredMfa?: Challenges.MfaTypes 
  }

  /**
   * Type guard; only returns true for valid `Args` objects.
   * @param val 
   */
  export function isArgs(val:any): val is Args {
    return keysAreBooleans(val, ['mfaEnabled']) &&
           (!val.preferredMfa || Challenges.isMfaTypes(val.preferredMfa));
  }

  /**
   * Factory to produce an Args object with
   * empty strings. Useful for getting the 
   * correct shape as a value.
   */
  export function newArgs(): Args {
    return {
      mfaEnabled: false
    }
  }

  /**
   * Returns which MFA method (if any) is enabled
   */
  export type Result = {
    enabledMfa?: Challenges.MfaTypes
  };

  export type Response = ApiResponse<Result>;
}

/**
 * Setup Phone Number for SMS MFA
 */
export namespace SetupSmsMfa {

  export const HTTP:HttpMethods.POST = 'POST';
  export const Path = `${authBasePath}/${ResourcePaths.configureMfa}`;

  export interface Args {
    /**
     * Phone numbers must follow these formatting rules: A phone number
     * must start with a plus (+) sign, followed immediately by the country
     * code. A phone number can only contain the + sign and digits. You must
     * remove any other characters from a phone number, such as parentheses,
     * spaces, or dashes (-) before submitting the value to the service.
     * For example, a United States-based phone number must follow this
     * format: +14325551212.
     * (Sourced from: https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-settings-attributes.html)
     */
    phoneNumber: string
  }

  /**
   * Type guard; only returns true for valid `Args` objects.
   * @param val 
   */
  export function isArgs(val:any): val is Args {
    return keysAreStrings(val, ['phoneNumber']);
  }

  /**
   * Factory to produce an Args object with
   * empty strings. Useful for getting the 
   * correct shape as a value.
   */
  export function newArgs(): Args {
    return {
      phoneNumber : ''
    }
  }

  /**
   * When successful, the message ought to say something
   * like, "Your phone number has been registered for SMS MFA."
   */
  export type Result = MessageResult;

  export type Response = MessageResponse;
}

/**
 * Begin Setup for App MFA
 */
export namespace BeginSetupAppMfa {

  export const HTTP:HttpMethods.POST = 'POST';
  export const Path = `${authBasePath}/${ResourcePaths.configureMfa}`;

  export interface Args {
    refreshToken: string
  }

  /**
   * Type guard; only returns true for valid `Args` objects.
   * @param val 
   */
  export function isArgs(val:any): val is Args {
    return keysAreStrings(val, ['refreshToken']) && !keysNonNull(val, ['mfaVerifyCode']);
  }

  /**
   * Factory to produce an Args object with
   * empty strings. Useful for getting the 
   * correct shape as a value.
   */
  export function newArgs(): Args {
    return {
      refreshToken : ''
    }
  }

  /**
   * Returns secret code to enter into the
   * MFA App.
   */
  export type Result = {
    secretCode: string
  };

  export type Response = ApiResponse<Result>;
}

/**
 * Confirm Setup for App MFA
 */
export namespace ConfirmSetupAppMfa {

  export const HTTP:HttpMethods.POST = 'POST';
  export const Path = `${authBasePath}/${ResourcePaths.configureMfa}`;

  export interface Args {
    refreshToken: string,
    // Produced by MFA App after entering the secret code from a BeginSetupAppMfa call
    mfaVerifyCode: string
  }

  /**
   * Type guard; only returns true for valid `Args` objects.
   * @param val 
   */
  export function isArgs(val:any): val is Args {
    return keysAreStrings(val, ['refreshToken', 'mfaVerifyCode']);
  }

  /**
   * Factory to produce an Args object with
   * empty strings. Useful for getting the 
   * correct shape as a value.
   */
  export function newArgs(): Args {
    return {
      refreshToken : '',
      mfaVerifyCode : ''
    }
  }

  /**
   * When successful, the message ought to say something
   * like, "Your MFA app has been successfully configured."
   */
  export type Result = MessageResult;

  export type Response = MessageResponse;
}