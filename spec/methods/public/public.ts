import { ApiResponse, HttpMethods } from "../../responses";
import { Item } from '../../dapp';
import { apiBasePath, RootResources } from '../../methods';

export const publicBasePath = `${apiBasePath}/${RootResources.public}`

/**
 * Retrieve the publicly visible information about
 * a Dapp, or put differently, the content required
 * for it to render on DappHub.
 */
export namespace ViewDapp {

  /**
   * No body required, DappName is taken from the path.
   */
  export type Args = void; 

  export interface FoundResult {
    exists : true
    item : Item.Core
  }

  export interface NotFoundResult {
    exists : false
    item : null
  }

  export type Result = FoundResult | NotFoundResult

  export type Response = ApiResponse<Result>
  export const HTTP:HttpMethods.GET = 'GET';

  /**
   * Given a DappName, returns its fully scoped public path
   * @param DappName 
   */
  export const Path = (DappName:string) => `${publicBasePath}/${DappName}`;
}