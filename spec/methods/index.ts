import * as AuthTypes from './auth';
import * as PaymentTypes from './payment';
import * as PrivateTypes from './private';

// These exports make it possible to do
// something like:
//
// import { Auth, Private } from 'dappbot-types/spec/methods';
//
export import Auth = AuthTypes;
export import Payment = PaymentTypes;
export import Private = PrivateTypes;

// Declaring this namespace means we can
// group everything into one default export,
// supporting something like:
//
// import Methods from 'dappbot-types/spec/methods';
//
export namespace Methods {
  export import Auth = AuthTypes;
  export import Payment = PaymentTypes;
  export import Private = PrivateTypes;
}

// Other namespaces use this to build out
// their path argument
export const apiBasePath = '/v1';

export default Methods;