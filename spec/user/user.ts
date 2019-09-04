import { bodyHasStrings, bodyHasValOn, isString } from '../util';

/**
 * DappBot User Record as defined by Cognito.  This
 * interface basically follows the default Cognito user,
 * but we have enforced additional constraints on
 * UserAttributes, which is otherwise an arbitrary
 * set of key-val string pairs.
 */
export interface UserData {
  Username: string,
  Email: string
  UserAttributes: UserAttributes,
  MFAOptions?: CognitoAttributes.MFAOptionListType,
  PreferredMfaSetting?: string,
  UserMFASettingList?: CognitoAttributes.UserMFASettingListType
}

/**
 * UserAttributes map including all of the custom
 * properties we added to the Cognito user.  The
 * `limit` attributes all control how many dapps 
 * the user is allowed to make, `payment_provider`
 * says whether they are using Stripe,
 * `payment_status` says whether their payments
 * are all up to date.
 */
export interface UserAttributes extends CognitoAttributes.MapType {
  'custom:payment_provider' : PaymentProvider
  'custom:payment_status' : PaymentStatus
  'custom:standard_limit' : string
  'custom:professional_limit' : string
  'custom:enterprise_limit' : string
}

/**
 * Type guard; only returns true if `maybe` satisfies
 * the `UserData` interface.  Validates that the enum
 * values within `UserAttributes` are actually from the
 * appropriate enums, validates that the limit values
 * can be converted to non-negative integers.
 * @param maybeUserData 
 */
export function isUserData(maybe:any): maybe is UserData {
    if (!bodyHasStrings(maybe, ['Username', 'Email'])) return false;
    if (typeof maybe.UserAttributes !== 'object') return false;
    let attrs = maybe.UserAttributes;
    let limitNames = ['standard', 'professional', 'enterprise'].map(str => `custom:${str}_limit`);
    return (
      Object.values(PaymentStatus).includes(attrs['custom:payment_status']) &&
      Object.values(PaymentProvider).includes(attrs['custom:payment_provider']) &&
      bodyHasValOn(attrs, limitNames, (strVal:any) => parseInt(strVal) >= 0)
    )
}

/**
 * Factory to produce an empty UserData object. All
 * string values are empty except for the UserAttributes,
 * which simulate an admin account that is only
 * allowed to make one standard dapp.  These factories
 * are convenient for getting blank objects or a list
 * of the interface's keys as a value.
 */
export function emptyUserData():UserData {
  return {
    Username : '',
    Email : '',
    UserAttributes : {
      'custom:payment_provider' : PaymentProvider.ADMIN,
      'custom:payment_status' : PaymentStatus.ACTIVE,
      'custom:standard_limit' : '1',
      'custom:professional_limit' : '0',
      'custom:enterprise_limit' : '0'
    }
  }
}

/**
 * Object returned after successful login to DappBot.
 * `Authorization` is the exact token which should go
 * into the `Authorization` header (no `Bearer`).
 * RefreshToken is used to get new `Authorization`
 * after it expires at `ExpiresAt`, which is a date
 * encoded as an ISO string.
 */
export interface AuthData {
  User: UserData
  Authorization: string
  RefreshToken: string
  ExpiresAt: string
}

/**
 * Type guard; only returns `true` if `maybe` fully
 * satisfies the `AuthData` interface.  Leverages
 * `isUserData` to check `AuthData.User`. Checks that
 * `ExpiresAt` is a valid ISO string, just checks the
 * other two props are strings.
 * @param maybeAuthData 
 */
export function isAuthData(maybe:any): maybe is AuthData {
  return (
    isUserData(maybe.User) &&
    Date.parse(maybe.ExpiresAt) !== NaN &&
    bodyHasStrings(maybe, ['Authorization', 'RefreshToken'])
  )
}

/**
 * Factory which produces an empty AuthData object.
 * Leverages `emptyUserData()` for `User` key,
 * `ExpiresAt` is now as an ISO string, `Authorization`
 * & `RefreshToken` are empty strings.
 */
export function emptyAuthData():AuthData {
  return {
    Authorization : '',
    RefreshToken : '',
    ExpiresAt : new Date().toISOString(),
    User : emptyUserData()
  }
}


/**
 * All possible `custom:payment_status`es for a DappBot
 * user. If all is well, they're `ACTIVE`.  Once a 
 * payment fails, they're `LAPSED`.  If it stays failed,
 * the user eventually goes into `FAILED`.  Their status
 * will only be `CANCELLED` once they explicitly zero 
 * out their subscripton.
 */
export enum PaymentStatus {
  ACTIVE = 'ACTIVE',
  LAPSED = 'LAPSED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED'
}

/**
 * All possible `custom:payment_provider`s for a DappBot
 * user.  As of Fall 2019, the only options are they're
 * paying with Stripe or they have an admin account.
 */
export enum PaymentProvider {
  STRIPE = 'STRIPE',
  ADMIN = 'ADMIN'
}

/**
 * When a user logs in with their username & password,
 * they may have to respond to a challenge in order to
 * finish the auth loop.  This is a collection of data
 * types and helper functions related those
 * ChallengeResponse interactions.
 */
export namespace Challenges {

  /**
   * Our internal key of possible challenges from
   * Cognito.  `ForgotPassword` and `Default` are
   * constants we made up to control the client-side
   * interface -- the former means we've begun a
   * `PassReset` flow, the latter means there is
   * no challenge at all.  `Mfa` and `NewPasswordRequired`,
   * however, are proper Cognito challenges.  You
   * can view the whole list of them at:
   * 
   * https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_InitiateAuth.html#API_InitiateAuth_ResponseSyntax
   */
  export enum Types {
    Default             = "DEFAULT",
    ForgotPassword      = "FORGOT_PASSWORD",
    Mfa                 = "MFA",
    NewPasswordRequired = "NEW_PASSWORD_REQUIRED"
  }

  /**
   * General response shape for all Challenges.  They
   * will always have a `ChallengeName`, and the
   * `Session` key is a special value which must be
   * passed back and forth throughout the Challenge-Response
   * flow.
   */
  export interface Data {
    ChallengeName: Challenges.Types,
    ChallengeParameters:{
      [key:string]: string
    },
    Session: string
  }

  /**
   * Type guard; only returns `true` if `maybe` fully
   * satisfies `Challenges.Data`.  Validates that the
   * name is a valid value from `Challenges.Types`,
   * that the session is a string, and that
   * `Data.ChallengeParameters` has only string keys &
   * string values.
   * 
   * @param maybe 
   */
  export function isData(maybe:any): maybe is Challenges.Data {
    let params = maybe.ChallengeParameters;
    return (
      Object.values(Challenges.Types).includes(maybe.ChallengeName) &&
      isString(maybe.Session) &&
      Object.keys(params).every(isString) &&
      Object.values(params).every(isString)
    )
  }

  /**
   * Factory function to produce an empty `ChallengeData`
   * object.  `Session` is an empty string, the name is 
   * `Types.Default`, and `ChallengeParameters` is an
   * empty object.
   */
  export function emptyData(): Challenges.Data {
    return {
      ChallengeName : Challenges.Types.Default,
      ChallengeParameters : {},
      Session : ''
    }
  }
}

/**
 * Collection of helper types describing attributes
 * on a Cognito user.  `UserAttributes` technically
 * comes out of Cognito as a `ListType`, but we
 * transform it on the server into a `MapType` which
 * fits the `UserAttributes` spec.
 */
export namespace CognitoAttributes {
  export type ListType = ItemType[];

  export type MapType  = { [Name:string] : ValueType }
  
  export type NameType = string;
  
  export type ValueType = string;
  
  export interface ItemType {
      Name: NameType;
      Value?: ValueType;
  }
  
  export interface MFAOptionType {
    DeliveryMedium?: DeliveryMediumType;
    AttributeName?: NameType;
  }
  export type MFAOptionListType = MFAOptionType[];
  
  export type DeliveryMediumType = "SMS"|"EMAIL"|string;

  export type UserMFASettingListType = string[];
}