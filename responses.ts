import { XOR } from 'ts-xor';
import { DappDbItem} from './dapp';
import { UserResponseData, ChallengeData } from './user';

export interface Method<reqBody, resBody>{
  rootResource : RootResources
  target : string
  httpMethod: HttpMethods
  request : reqBody
  response : resBody
}

export enum HttpMethods {
  OPTIONS = 'OPTIONS',
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export enum RootResources {
  private = 'private',
  public = 'public',
  auth = 'auth',
  payment = 'payment'
}

export enum ApiMethods {
  read = 'read',
  view = 'view',
  list = 'list',
  create = 'create',
  update = 'update',
  delete = 'delete',
  login  = 'login',
  passwordReset = 'password-reset'
}

export enum ApiOperations {
  create = "create",
  login = "login",
  resetPassword = "reset-password",
  delete = "delete",
  edit = "edit",
  list = "list",
  read = "read",
  signup = "signup",
  updatePlanCount = "updatePlanCount",
  updatePayment = "updatePayment",
  readStripeData = "readStripeData",
  cancelStripe = "cancelStripe"
}

export interface ResponseOptions {
  isErr? : boolean
  isCreate? : boolean
  isRead? : boolean
  errorResponseCode? : number
}

export interface DappBotResponse<ResponseType> {
  data: ResponseType
  err : Error | null
}

export type MessageResponse = DappBotResponse<{ message: string }>

export type ReadResponse = DappBotResponse<{
  exists : boolean
  item : DappDbItem
}>

export type ListResponse = DappBotResponse<{
  count : 0
  items : DappDbItem[]
}>

export type SignInResponse = DappBotResponse<XOR<UserResponseData, ChallengeData>>

export type UserResponse = DappBotResponse<UserResponseData>

export type ChallengeResponse = DappBotResponse<ChallengeData>