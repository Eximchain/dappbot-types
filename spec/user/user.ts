import AllStripeTypes from 'stripe';
import { bodyHas, bodyHasStrings } from '../util';

/**
 * TODO: Fill in
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
 * TODO: Fill in
 */
export interface UserAttributes extends CognitoAttributes.MapType {
  'custom:payment_status' : PaymentStatus
}

/**
 * TODO: Fill in
 * @param maybeUserData 
 */
// export function isUserData(maybe:any): maybe is UserData {
  
// }

/**
 * TODO: Fill in
 */
// export function emptyUserData():UserData {

// }

/**
 * TODO: Fill in
 */
export interface AuthData {
  User: UserData,
  Authorization: string,
  RefreshToken: string,
  ExpiresAt: string
}

/**
 * TODO: Fill in
 * @param maybeAuthData 
 */
// export function isAuthData(maybe:any): maybe is AuthData {

// }

/**
 * TODO: Fill in
 */
// export function emptyAuthData():AuthData {

// }


/**
 * TODO: Fill in
 */
export enum PaymentStatus {
  ACTIVE = 'ACTIVE',
  LAPSED = 'LAPSED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED'
}

/**
 * The subset of Stripe's types which we use,
 * extracted into a convenient namespace.
 */
export namespace StripeTypes {
  export type Customer = AllStripeTypes.customers.ICustomer;
  export type Subscription = AllStripeTypes.subscriptions.ISubscription;
  export type Invoice = AllStripeTypes.invoices.IInvoice;
  export type LineItem = AllStripeTypes.invoices.IInvoiceLineItem;
}

/**
 * TODO: Fill in
 */
export namespace Challenges {

  /**
   * TODO: Fill in
   */
  export enum Types {
    Mfa = "MFA",
    ForgotPassword = "FORGOT_PASSWORD",
    NewPasswordRequired = "NEW_PASSWORD_REQUIRED",
    Default = "DEFAULT"
  }

  /**
   * TODO: Fill in
   */
  export interface Data {
    ChallengeName: string,
    ChallengeParameters:{
      [key:string]: string
    },
    Session: string
  }

  /**
   * TODO: Fill in
   * @param maybe 
   */
  // export function isData(maybe:any): maybe is Challenges.Data {

  // }

  /**
   * TODO: Fill in
   */
  // export function emptyData(): Challenges.Data {

  // }
}

/**
 * TODO: Fill in
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