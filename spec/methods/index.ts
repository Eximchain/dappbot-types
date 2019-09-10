/**
 * Child namespaces import this base path
 * to build their own path arguments.
 */
export const apiBasePath = '/v1';

/**
 * RootResources are the top-level endpoints on our API.  They
 * are maintained within an enum so it's easy to modify our
 * API layout in the future.
 */
export enum RootResources {
  private = 'private',
  public = 'public',
  auth = 'auth',
  payment = 'payment'
}

import AuthTypes from './auth';
import PaymentTypes from './payment';
import PrivateTypes from './private';
import PublicTypes from './public';

// These exports make it possible to do
// something like:
//
// import { Auth, Private } from 'dappbot-types/spec/methods';
//
export import Auth = AuthTypes;
export import Payment = PaymentTypes;
export import Private = PrivateTypes;
export import Public = PublicTypes;

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
  export import Public = PublicTypes;
}

export default Methods;