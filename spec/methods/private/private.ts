import { HttpMethods, MessageResponse, MessageResult, ApiResponse } from '../../responses';
import { apiBasePath, RootResources } from '..';
import { Item } from '../../dapp';

export const privateBasePath = `${apiBasePath}/${RootResources.private}`

function DappPath(DappName:string){
  return `${privateBasePath}/${DappName}`
}

/**
 * Create a new dapp.  Accepts all properties from a
 * full DappItem, except for the name, which the API
 * infers by the path.
 */
export namespace CreateDapp {

  export const HTTP:HttpMethods = 'POST';

  /**
   * Given a DappName, return the fully scoped private
   * path to create it.
   * @param DappName 
   */
  export const Path = DappPath

  export type Args = Omit<Item.Full, 'DappName'>;

  /**
   * Type guard; only returns `true` if all `Item.Full`
   * attributes other than `DappName` have been
   * correctly set.
   * @param maybe 
   */
  export function isArgs(maybe:any): maybe is Args {
    if (typeof maybe !== 'object') return false;
    return Item.isFull({ DappName : 'placeholder', ...maybe });
  }

  /**
   * Message ought to be something like, "Your dapp
   * has been successfully created."
   */
  export type Result = MessageResult;

  export type Response = MessageResponse;
}

/**
 * Retrieve the API representation of any given
 * dapp.  Will not succeed if the caller is not
 * the owner of said dapp.  Gracefully returns
 * with `itemExists === false` if the dapp does
 * not exist.
 */
export namespace ReadDapp {

  export const HTTP:HttpMethods = 'GET';

  /**
   * Given a DappName, returns its fully scoped private path
   * @param DappName 
   */
  export const Path = DappPath;

  /**
   * Body requires no arguments, email and DappName
   * are taken from Authorization & path respectively.
   */
  export type Args = void;

  export interface Result {
    itemExists : boolean
    item : Item.Api
  }

  export type Response = ApiResponse<Result>
}

/**
 * Update an existing dapp.  An existing Dapp
 * can only have its ABI, ContractAddr, Web3URL, 
 * & GuardianURL modified.  Only works if the
 * caller is the dapp's owner.
 */
export namespace UpdateDapp {

  export const HTTP:HttpMethods = 'PUT';

  /**
   * Given a DappName, returns its fully scoped path
   * @param DappName 
   */
  export const Path = DappPath;

  export type Args = Partial<Omit<Item.Core, 'DappName'>>

  /**
   * Type guard; only returns `true` if one of the
   * valid `Item.Core` update attributes has been set.
   * @param maybe 
   */
  export function isArgs(maybe:any): maybe is Args {
    return ['Abi', 'ContractAddr', 'Web3URL', 'GuardianURL'].some((key) => {
      typeof maybe[key] === 'string'
    })
  }

  /**
   * Message will say something (not exactly) like, 
   * "Your dapp has been successfully updated."
   */
  export type Result = MessageResult;
  
  export type Response = MessageResponse;
}

/**
 * Delete an existing dapp.  Its DappName will
 * be reclaimed for other users.  Only works
 * if the caller is the dapp's owner.
 */
export namespace DeleteDapp {

  export const HTTP:HttpMethods = 'DELETE';

  /**
   * Given a DappName, returns its fully scoped private path
   * @param DappName 
   */
  export const Path = DappPath;

  /**
   * Body requires no arguments, email and DappName
   * are taken from Authorization & path respectively.
   */
  export type Args = void;

  /**
   * Message will say something (not exactly) like, 
   * "Your dapp has been successfully deleted."
   */
  export type Result = MessageResult;

  export type Response = MessageResponse;
}

/**
 * List all of the dapp's owned by the calling user
 * in their API representation.
 */
export namespace ListDapps {

  export const HTTP:HttpMethods = 'GET';
  export const Path = privateBasePath;

  /**
   * Body requires no arguments, email and DappName
   * are taken from Authorization & path respectively.
   */
  export type Args = void;

  export interface Result {
    count : number
    items : Item.Api[]
  }

  export type Response = ApiResponse<Result>
}

export default this.exports;