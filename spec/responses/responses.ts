import { DbItem} from '../dapp';

export enum HttpMethods {
  OPTIONS = 'OPTIONS',
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export type HttpMethodNames = HttpMethods | keyof typeof HttpMethods;

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
  item : DbItem
}>

export type ListResponse = DappBotResponse<{
  count : 0
  items : DbItem[]
}>