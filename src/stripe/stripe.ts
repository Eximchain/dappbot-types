import Stripe from 'stripe';

export type Customer = Stripe.customers.ICustomer;
export type Subscription = Stripe.subscriptions.ISubscription;
export type Invoice = Stripe.invoices.IInvoice;
export type LineItem = Stripe.invoices.IInvoiceLineItem;