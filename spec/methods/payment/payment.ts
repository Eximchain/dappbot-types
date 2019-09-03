import { ApiResponse, HttpMethods } from "../../responses";
import { AuthData, StripeTypes, UserData } from "../../user";
import { apiBasePath, RootResources } from "..";
import { bodyHasStrings, bodyHasValOn } from "../../util";

export const paymentBasePath = `${apiBasePath}/${RootResources.payment}/stripe`;

/**
 * Listing of how many dapps a customer has allowed
 * for each tier.  Note that all must be specified,
 * including 0 values, for safety.
 */
export interface StripePlans {
  standard: number
  professional: number
  enterprise: number
}

/**
 * Type guard; only returns true for 
 * valid `StripePlans` objects.
 * @param maybe 
 */
export function isStripePlans(maybe:any): maybe is StripePlans {
  return bodyHasValOn(maybe, ['standard', 'professional', 'enterprise'], (val:any) => {
    return typeof val === 'number';
  })
}


/**
 * Main method to create a new account. If called as
 * an API customer, you can only create a trial
 * account.  Card info can only ever be plugged in
 * through the DappBot web interface.
 **/
export namespace SignUp {

  export const HTTP:HttpMethods = 'POST';
  export const Path = paymentBasePath;

  /**
   * The token here is produced by Stripe on dapp.bot 
   * and cannot be created by external API customers.  
   * If it is not provided, then the new account is 
   * automatically created with a two-week free trial 
   * that allows one standard dapp.
   */
  export interface Args {
    email : string
    name : string
    plans : StripePlans
    coupon?: string
    token?: string
  }

  /**
   * Type guard; only returns true for valid Args objects.
   * @param maybe 
   */
  export function isArgs(maybe:any): maybe is Args {
    return (
      bodyHasStrings(maybe, ['email', 'name']) &&
      isStripePlans(maybe.plans)
    )
  }

  export interface Result {
    stripeId: string
    subscriptionId: string
    user : UserData | boolean
  }

  export type Response = ApiResponse<Result>
  
}


/**
 * Retrieve a given user's Stripe details, specifically
 * their customer, subscription, and an invoice.  If
 * they're lapsed, then it's the most recent failed
 * invoice.  If they're active, it's the upcoming invoice.
 * For all Stripe details, if this user does not have
 * Stripe, they will be null.
 */
export namespace Read {

  export const HTTP:HttpMethods = 'GET';
  export const Path = paymentBasePath;

  /**
   * Body has no args, customer email is read via the
   * Authorization token.
   */
  export type Args = void;

  export interface Result {
    user: UserData
    customer: StripeTypes.Customer | null
    subscription: StripeTypes.Subscription | null
    invoice: StripeTypes.Invoice | null
  }

  export type Response = ApiResponse<Result>
}


/**
 * Used to update the customer's saved payment source,
 * currently a credit card.
 */
export namespace UpdateCard {

  export const HTTP:HttpMethods = 'PUT';
  export const Path = paymentBasePath;

  /**
   * Like with SignUp, this token can only be produced
   * on the dapp.bot website using Stripe's client-side
   * plugin.  This method cannot be successfully called
   * by external API customers.
   */
  export interface Args {
    token : string
  }

  /**
   * Type guard; only returns `true` for valid `Args` objects.
   * @param maybe 
   */
  export function isArgs(maybe:any): maybe is Args {
    return bodyHasStrings(maybe, ['token'])
  }

  export interface Result { 
    updatedCustomer : StripeTypes.Customer 
  }

  export type Response = ApiResponse<Result>;
}


/**
 * Update the number of allowed dapps for each type.
 * This method can only be called by active accounts
 * with a working payment source.  Your account's
 * next invoice will be prorated to reflect the updated
 * capacity.
 */
export namespace UpdatePlanCount {

  export const HTTP:HttpMethods = 'PUT';
  export const Path = paymentBasePath;

  export interface Args {
    plans : StripePlans
  }

  /**
   * Type guard; only returns true for valid `Args` objects.
   * @param maybe 
   */
  export function isArgs(maybe:any): maybe is Args {
    return maybe && maybe.plans && isStripePlans(maybe.plans)
  }

  export interface Result {
    updatedSubscription : StripeTypes.Subscription
    updatedUser : AuthData
  }

  export type Response = ApiResponse<Result>;
}


/**
 * Cancel a given user's subscription to DappBot.
 * This will immediately delete all the customer's
 * dapps, zero out their dapp limits, cancel the
 * subscription on Stripe, and leave the user in the
 * CANCELLED state.
 */
export namespace Cancel {

  export const HTTP:HttpMethods = 'DELETE';
  export const Path = paymentBasePath;

  /**
   * No body arguments required, user's email is
   * inferred from Authorization token.
   */
  export type Args = void;

  export interface Result {
    cancelledSub : StripeTypes.Subscription
  }

  export type Response = ApiResponse<Result>
}