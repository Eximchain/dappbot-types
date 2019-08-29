import { HttpMethods, MessageResponse, MessageData, ApiResponse } from '../../responses';
import { apiBasePath, RootResources } from '..';
import { Item } from '../../dapp';

export const privateBasePath = `${apiBasePath}/${RootResources.private}`

/**
 * Create a new dapp.  Accepts all properties from a
 * full DappItem, except for the name, which the API
 * infers by the path.
 */
export namespace CreateDapp {

  export type Args = Omit<Item.Full, 'DappName'>;

  /**
   * Message ought to be something like, "Your dapp
   * has been successfully created."
   */
  export type Result = MessageData;

  export type Response = MessageResponse;

  export const HTTP:HttpMethods = 'POST';

  export const Path = (DappName:string)=>`${privateBasePath}/${DappName}`;
}

/**
 * Retrieve the API representation of any given
 * dapp.  Will not succeed if the caller is not
 * the owner of said dapp.  Gracefully returns
 * with `itemExists === false` if the dapp does
 * not exist.
 */
export namespace ReadDapp {

  /**
   * Body requires no arguments, email and DappName
   * are taken from Authorization & path respectively.
   */
  export interface Args {}

  export interface Result {
    itemExists : boolean
    item : Item.Api
  }

  export type Response = ApiResponse<Result>

  export const HTTP:HttpMethods = 'GET';

  /**
   * Given a DappName, returns its fully scoped private path
   * @param DappName 
   */
  export const Path = (DappName:string)=>`${privateBasePath}/${DappName}`;
}

/**
 * Update an existing dapp.  An existing Dapp
 * can only have its ABI, ContractAddr, Web3URL, 
 * & GuardianURL modified.  Only works if the
 * caller is the dapp's owner.
 */
export namespace UpdateDapp {

  export type Args = Partial<Omit<Item.Core, 'DappName'>>

  /**
   * Message will say something (not exactly) like, 
   * "Your dapp has been successfully updated."
   */
  export type Result = MessageData;
  
  export type Response = MessageResponse;

  export const HTTP:HttpMethods = 'PUT';

  /**
   * Given a DappName, returns its fully scoped path
   * @param DappName 
   */
  export const Path = (DappName:string)=>`${privateBasePath}/${DappName}`;
}

/**
 * Delete an existing dapp.  Its DappName will
 * be reclaimed for other users.  Only works
 * if the caller is the dapp's owner.
 */
export namespace DeleteDapp {

  /**
   * Body requires no arguments, email and DappName
   * are taken from Authorization & path respectively.
   */
  export interface Args {}

  /**
   * Message will say something (not exactly) like, 
   * "Your dapp has been successfully deleted."
   */
  export type Result = MessageData;

  export type Response = MessageResponse;

  export const HTTP:HttpMethods = 'DELETE';

  /**
   * Given a DappName, returns its fully scoped private path
   * @param DappName 
   */
  export const Path = (DappName:string)=>`${privateBasePath}/${DappName}`;
}

/**
 * List all of the dapp's owned by the calling user
 * in their API representation.
 */
export namespace ListDapps {

  /**
   * Body requires no arguments, email and DappName
   * are taken from Authorization & path respectively.
   */
  export interface Args {}

  export interface Result {
    count : number
    items : Item.Api[]
  }

  export type Response = ApiResponse<Result>
  export const HTTP:HttpMethods = 'GET';

  /**
   * Given a DappName, returns its fully scoped private path
   * @param DappName 
   */
  export const Path = privateBasePath;
}

export default this.exports;