/**
 * All error responses from our API will include a message key.
 */
export interface ApiError extends Error {
  message : string
}

/**
 * General shape which all responses from our API conform to.
 * Success responses will have data !== null, error responses
 * will have err !== null.
 */
export interface ApiResponse<ResponseType> {
  data: ResponseType | null
  err: ApiError | null
}

/**
 * Basic response which simply contains a message about
 * the action that was taken.
 */
export type MessageResponse = ApiResponse<{ message: string }>

/**
 * HttpMethods type is a union of string literals, rather than
 * an enum, because these literals will not change over time.
 * Enums make it easy to change values in the future, like if
 * we restructure our API.  For values which are an unchanging
 * constants, simply specifying string literals still gives us
 * the guarantee of no typos.  It also means that we can satisfy
 * the type by writing 'POST', rather than HttpMethods.POST.
 */
export type HttpMethods = 'OPTIONS' | 'GET' | 'POST' | 'PUT' | 'DELETE';

// TODO: Add the actual response functions from `dappbot-api-lambda`
// so they can be shared across all APIs and directly enforce correct
// response shapes