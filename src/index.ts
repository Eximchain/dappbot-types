import DappTypes from './dapp';
import ResponseTypes from './responses';
import UserTypes from './user';
import MethodTypes from './methods';

export namespace DappbotTypes {
  export import Dapp = DappTypes;
  export import User = UserTypes;
  export import Methods = MethodTypes;
  export import Response = ResponseTypes;
}

export default DappbotTypes;