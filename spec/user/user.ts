import AllStripeTypes from 'stripe';

// TODO: Add isUser guard function
export interface UserData {
  Username: string,
  Email: string
  UserAttributes: CognitoAttributes.MapType,
  MFAOptions?: CognitoAttributes.MFAOptionListType,
  PreferredMfaSetting?: string,
  UserMFASettingList?: CognitoAttributes.UserMFASettingListType
}

// TODO: Add isUserResponse guard function
export interface AuthData {
  User: UserData,
  Authorization: string,
  RefreshToken: string,
  ExpiresAt: string
}

export enum PaymentStatus {
  ACTIVE = 'ACTIVE',
  LAPSED = 'LAPSED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED'
}

export namespace StripeTypes {
  export type Customer = AllStripeTypes.customers.ICustomer;
  export type Subscription = AllStripeTypes.subscriptions.ISubscription;
  export type Invoice = AllStripeTypes.invoices.IInvoice;
  export type LineItem = AllStripeTypes.invoices.IInvoiceLineItem;
}

export namespace Challenges {
  export enum Types {
    Mfa = "MFA",
    ForgotPassword = "FORGOT_PASSWORD",
    NewPasswordRequired = "NEW_PASSWORD_REQUIRED",
    Default = "DEFAULT"
  }
  export interface Data {
    ChallengeName: string,
    ChallengeParameters:{
      [key:string]: string
    },
    Session: string
  }
}

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