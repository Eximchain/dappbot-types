import * as AuthTypes from './auth';
import * as PaymentTypes from './payment';
import * as PrivateTypes from './private';

export namespace Methods {
  export import Auth = AuthTypes;
  export import Payment = PaymentTypes;
  export import Private = PrivateTypes;
}

export default Methods;