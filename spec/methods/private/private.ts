import { HttpMethods, MessageResponse, ApiResponse } from '../../responses';
import { apiBasePath, RootResources } from '..';
import { Item } from '../../dapp';

export const privateBasePath = `${apiBasePath}/${RootResources.private}`

// TODO: Add docstrings
/**
 *
 */
export namespace CreateDapp {
  export type Args = Item.Full;
  export type Result = MessageResponse;
  export const HTTP:HttpMethods = 'POST';
  export const Path = (DappName:string)=>`${privateBasePath}/${DappName}`;
}

/**
 *
 */
export namespace ReadDapp {
  /**
   * Body requires no arguments, email and DappName
   * are taken from Authorization & path respectively.
   */
  export type Args = {}
  export type Result = ApiResponse<{
    itemExists : boolean
    item : Item.Api
  }>
  export const HTTP:HttpMethods = 'GET';
  export const Path = (DappName:string)=>`${privateBasePath}/${DappName}`;
}

/**
 *
 */
export namespace UpdateDapp {
  export type Args = Partial<Omit<Item.Core, 'DappName'>>
  export type Result = MessageResponse;
  export const HTTP:HttpMethods = 'PUT';
  export const Path = (DappName:string)=>`${privateBasePath}/${DappName}`;
}

/**
 *
 */
export namespace DeleteDapp {
  /**
   * Body requires no arguments, email and DappName
   * are taken from Authorization & path respectively.
   */
  export interface Args {}
  export type Result = MessageResponse;
  export const HTTP:HttpMethods = 'DELETE';
  export const Path = (DappName:string)=>`${privateBasePath}/${DappName}`;
}

/**
 *
 */
export namespace ListDapps {
  /**
   * Body requires no arguments, email and DappName
   * are taken from Authorization & path respectively.
   */
  export interface Args {}
  export type Result = ApiResponse<{
    count : number
    items : Item.Api[]
  }>
  export const HTTP:HttpMethods = 'GET';
  export const Path = privateBasePath;
}

export default this.exports;