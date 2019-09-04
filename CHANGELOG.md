# v1.0.5
Added matching `emptyUserAttributes() ` and `isUserAttributes()` helpers to the user types, making it easy to validate them directly.

# v1.0.4
Moved `StripePlans` into `methods/payment` so that all types related to Stripe would be located there.  Added `SubscriptionState` and `ValidSubscriptionStates` to `Payment.StripeTypes`, as those values are exposed to the client via `GET /payment/stripe`.

# v1.0.3
Added new type guards:
  - API methods with args now have a `isArgs()` fxn in their namespace
  - `APIResponse` now has `isSuccessResponse()`, `isErrResponse()`, & `isMessageResult()` guards