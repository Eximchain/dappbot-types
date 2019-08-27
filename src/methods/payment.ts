import { DappBotResponse } from "../responses/responses";
import { Subscription, Customer } from '../stripe/stripe';
import { User } from "../user";

export interface StripePlans {
  standard: number
  professional: number
  enterprise: number
}

export interface UpdatePlanCountArgs {
  plans : StripePlans
}

export type UpdatePlanCountResponse = DappBotResponse<{
  updatedSubscription : Subscription
  updatedUser : User
}>

export interface UpdatePaymentArgs {
  token : string
}

export type UpdatePaymentResponse = DappBotResponse<{
  updatedCustomer : Customer
}>