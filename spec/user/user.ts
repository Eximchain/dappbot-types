export type AttributeListType = AttributeType[];

export type AttributeMapType  = { [Name:string] : AttributeValueType }

export type AttributeNameType = string;

export type AttributeValueType = string;

export interface AttributeType {
    Name: AttributeNameType;
    Value?: AttributeValueType;
}

export type MFAOptionListType = MFAOptionType[];

export type DeliveryMediumType = "SMS"|"EMAIL"|string;

export interface MFAOptionType {

  DeliveryMedium?: DeliveryMediumType;

  AttributeName?: AttributeNameType;
}
export type UserMFASettingListType = string[];


export interface ChallengeData {
  ChallengeName: string,
  ChallengeParameters:{
    [key:string]: string
  },
  Session: string
}

export enum ChallengeType {
  Mfa = "MFA",
  ForgotPassword = "FORGOT_PASSWORD",
  NewPasswordRequired = "NEW_PASSWORD_REQUIRED",
  Default = "DEFAULT"
}

// TODO: Add isUser guard function
export interface User {
  Username: string,
  Email: string
  UserAttributes: AttributeMapType,
  MFAOptions?: MFAOptionListType,
  PreferredMfaSetting?: string,
  UserMFASettingList?: UserMFASettingListType
}

// TODO: Add isUserResponse guard function
export interface UserResponseData {
  User: User,
  Authorization: string,
  RefreshToken: string,
  ExpiresAt: string
}