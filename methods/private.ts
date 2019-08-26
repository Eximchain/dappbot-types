import { Method, HttpMethods, RootResources, MessageResponse } from '../responses';

interface DappCreateArgs {

}

interface DappCreateResponse {

}

export interface CreateDappMethod extends Method<DappCreateArgs, DappCreateResponse> {
  rootResource : RootResources.private,
  target : string // Corresponds to DappName
  httpMethod : HttpMethods.POST
}

interface DappUpdateArgs {

}

type DappUpdateResponse = MessageResponse;
export interface UpdateDappMethod extends Method<DappUpdateArgs, DappUpdateResponse> {

}