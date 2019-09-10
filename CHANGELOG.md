# v1.1.1 - 1.1.7
These versions were part of the debug loop as we built this package into our Lambda functions.  The key changes were:
- Within `spec/methods`, we now define the `RootResources` & `apiBasePath` values before importing the child modules (e.g. `Auth`, `Private`, etc).  Previously we ran into runtime issues because they were defined after the import, so the values didn't exist when the child modules tried to consume them.
- Upgraded the `util.isObject()` function to return `false` for `null`.  Turns out that `typeof null === 'object'`, so `typeof val === 'object'` isn't a sufficient test.

# v1.1.0
Larger overhaul as overall system integration continues.
- Added subtypes for `Item.Full`.  `Item.FullHub` & `Item.FullEnterprise` now use the `Tier` value to explicitly determine whether the GitHub keys need to be set.
- Renamed typeguard function arguments to be `val`, a noun, instead of `maybe`, an adverb.
- Renamed the factory functions to `new[Type]` instead of `empty[Type]` or `Empty[Type]`.
- Added factory functions for all method arguments, so that callers can get the correct shape as a value (e.g. for error messages).  This also makes the typeguards more resilient, as they no longer need to have lists of strings.
- Removed `Tiers.PoC` as no part of the system depends on that value anymore.
- Created a generalized `typeValidationErrMsg` function which, given an incorrect shape and correct shape, returns an array of messages telling the user which keys they failed to provide (or had the wrong JS type for).
- Brought the dapp management operations into the `Dapp` type as an enum.
- Made API method's `HTTP` value hold a more specific type, so Typescript guarantees that it's called not just with an `HttpMethod`, but with the correct one. 

# v1.0.5
Added matching `emptyUserAttributes() ` and `isUserAttributes()` helpers to the user types, making it easy to validate them directly.

# v1.0.4
Moved `StripePlans` into `methods/payment` so that all types related to Stripe would be located there.  Added `SubscriptionState` and `ValidSubscriptionStates` to `Payment.StripeTypes`, as those values are exposed to the client via `GET /payment/stripe`.

# v1.0.3
Added new type guards:
  - API methods with args now have a `isArgs()` fxn in their namespace
  - `APIResponse` now has `isSuccessResponse()`, `isErrResponse()`, & `isMessageResult()` guards