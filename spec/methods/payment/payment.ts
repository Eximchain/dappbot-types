import { ApiResponse, HttpMethods } from "../../responses";
import { AuthData, StripeTypes, UserData } from "../../user";
import { apiBasePath, RootResources } from "..";

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
 * Main method to create a new account. If called as
 * an API customer, you can only create a trial
 * account.  Card info can only ever be plugged in
 * through the DappBot web interface.
 **/
export namespace SignUp {

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

  export interface Result {
    stripeId: number
    subscriptionId: number
    user : AuthData | boolean
  }

  export type Response = ApiResponse<Result>
  export const HTTP:HttpMethods = 'POST';
  export const Path = paymentBasePath;
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

  /**
   * Body has no args, customer email is read via the
   * Authorization token.
   */
  export interface Args {}

  export interface Result {
    user: UserData
    customer: StripeTypes.Customer | null
    subscription: StripeTypes.Subscription | null
    invoice: StripeTypes.Invoice | null
  }

  export type Response = ApiResponse<Result>
  export const HTTP:HttpMethods = 'GET';
  export const Path = paymentBasePath;
}


/**
 * Used to update the customer's saved payment source,
 * currently a credit card.
 */
export namespace UpdatePayment {

  /**
   * Like with SignUp, this token can only be produced
   * on the dapp.bot website using Stripe's client-side
   * plugin.  This method cannot be successfully called
   * by external API customers.
   */
  export interface Args {
    token : string
  }

  export interface Result { 
    updatedCustomer : StripeTypes.Customer 
  }

  export type Response = ApiResponse<Result>;

  export const HTTP:HttpMethods = 'PUT';
  export const Path = paymentBasePath;
}


/**
 * Update the number of allowed dapps for each type.
 * This method can only be called by active accounts
 * with a working payment source.  Your account's
 * next invoice will be prorated to reflect the updated
 * capacity.
 */
export namespace UpdatePlanCount {

  export interface Args {
    plans : StripePlans
  }

  export interface Result {
    updatedSubscription : StripeTypes.Subscription
    updatedUser : AuthData
  }

  export type Response = ApiResponse<Result>;
  export const HTTP:HttpMethods = 'PUT';
  export const Path = paymentBasePath;
}


/**
 * Cancel a given user's subscription to DappBot.
 * This will immediately delete all the customer's
 * dapps, zero out their dapp limits, cancel the
 * subscription on Stripe, and leave the user in the
 * CANCELLED state.
 */
export namespace Cancel {

  /**
   * No body arguments required, user's email is
   * inferred from Authorization token.
   */
  export interface Args {}

  export interface Result {
    cancelledSub : StripeTypes.Subscription
  }
  
  export type Response = ApiResponse<Result>
  export const HTTP:HttpMethods = 'DELETE';
  export const Path = paymentBasePath;
}