# v1.7.12
Extracted types which are shared across multiple products; maintained exports in order to preserve import paths.

# v1.7.11
Moved types from `dependencies` to `devDependencies`, removed lodash helper function which was only being used in one place.

# v1.7.8
Hotfix on new `authStatus()` fxn; the stale check now ensures that the other fields are non-empty.

# v1.7.7
Updated the trial stripe plan to reflect the new free tier

# v1.7.6
Added new `authStatus(authData)` helper function to determine whether a given piece of auth data is:
- empty, meaning that a full login is required
- stale, meaning a refresh login is required
- active, meaning we are ready to make authenticated requests

Also reverted changeset from 1.7.5, as we're going to follow a different strategy for plugging in new pricing plans.

# v1.7.5
Add demo feature `standard-tiered` plan

# v1.6.1
Bugfix; the new `Chain.allDetails()` failed to call the `Chain.detailsByName()` function, so it returned an empty array.

# v1.6.0
New types related to our supported blockchains.
- Each supported chain now has its chainId, genesisHash, & Web3URL stored within `Dapp.Chain`.  Can be imported directly via `import { Chain } from '@eximchain/dappbot-types/spec/dapp';`
- Added new details about our test network
- Exported our internal Validator functions like `keysAreStrings()` and `keysValid()`, as they're useful in our other projects.

# v1.5.2
Bugfix; `UpdateDapp.isArgs()` has a `.some()` check which wasn't returning its result, so the typechecker was always failing.

# v1.5.1
Add optional `metadata` to `SignUp` args for analytics and/or logging

# v1.5.0
Fixes for Configure MFA API
- Simplified `SetMfaPreference.Args` to include only one `mfaPreference` argument
- Removed `session` from `BeginSetupAppMfa.Result`

# v1.4.0
`ConfirmSetupAppMfa` uses `refreshToken` instead of `session`

# v1.3.0
New types for new MFA APIs
- Added auth namespaces `SetMfaPreference`, `SetupSmsMfa`, `BeginSetupAppMfa`, and `ConfirmSetupAppMfa`
- Added auth types `SecretCodeResult` and `SecretCodeResponse`
- Renamed `Challenges.Types.SoftwareTokenMfa` to `Challenges.Types.AppMfa`
- Added type guards for booleans to util

# v1.2.5
New types relating to MFA challenges
- Added type guards for `Challenges.Types` and `Challenges.MfaTypes`
- Added `MfaLoginChallenge` and `SelectMfaChallenge` to `Challenges` namespace

# v1.2.4
Upgraded the `isSuccessResponse()`, `isErrorResponse()`, `isMessageResult()` typeguards from `Response` and `UpdateDapp.isArgs()` to first check that the value is an object before trying to check any properties, guaranteeing no `ReferenceErrors` at runtime.

# v1.2.3
Added Stripe's interface for credits cards at `spec/methods/payment#StripeTypes.Card`.

# v1.2.2
Added `validatePassword()` to `spec/user`.

# v1.2.1
Added `MfaTypes` challenge type corresponding to `SmsMfa | SoftwareTokenMfa`.

# v1.2.0
Fixed enum values for MFA related challenges.
- Removed incorrect challenge `Mfa`
- Added challenges `SmsMfa`, `SoftwareTokenMfa`, `SelectMfaType`, and `MfaSetup`.

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