import { ApiResponse, HttpMethods } from "../../responses";
import { Item } from '../../dapp';
import { apiBasePath, RootResources } from '..';

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
  export interface Args {}
  export type Result = ApiResponse<{
    exists : boolean
    item : Item.Core
  }>
  export const HTTP:HttpMethods = 'GET';
  /**
   * Given a DappName, returns its fully scoped public path
   * @param DappName 
   */
  export const Path = (DappName:string) => `${publicBasePath}/${DappName}`;
}