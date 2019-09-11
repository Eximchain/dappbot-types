# dappbot-types

Typescript bindings describing the core data types and API interactions with DappBot.  Extracted into their own repository in order to :

- Guarantee consistency across multiple client and server projects
- Make the overall DappBot codebase DRYer
- Share these types with our API customers

### [Full Changelog](./CHANGELOG.md)

There is full generated documentation from the source code hosted at `eximchain.github.io/dappbot-types`.  Briefly, the types are grouped into nested namespaces in order to minimize both collisions and stuttering. They are nested like:

- `DappBotTypes`: Overall namespace, package's default export
  - `Dapp`: Interfaces, type guards, and factories related to the `DappItem` data type
  - `User`:  Interfaces, type guards, and factories related to the `User` & auth data types
  - `Responses`: Interfaces and helper functions for our API responses
  - `Methods`: Each sub-module within here (`Auth`, `Payment`, `Private`, `Public`) contains all types related to that resource's available methods.  Each method contains keys `Args`, `Result`, `Response`, `HTTP`, & `Path`.  The `Result` corresponds to the `res.data` in a successful call, `Response` just wraps that shape in `data`/`err`.

As a consumer, you can import either import the full namespace from the top or instead use the import string to grab one of the more nested ones.  All of the individual namespaces & types are declared within the `spec` folder, which you can directly refer to in your import.  By example, below are two ways of getting at the same type:

```typescript
// Grab the overall types object and drill down through
// the namespaces to get the interface we want
import Types from 'dappbot-types';
const argsFromType:Types.Methods.Auth.Login.Args = {
  username : 'wuddup',
  password : 'we here',
  yis : 'this prop is not legal and gets an error'
}

// Now we're going through the file structure to more
// directly grab the namespace with the types we're
// concerned about in this hypothetical file.
import { Login } from 'dappbot-types/spec/methods/auth';
const argsFromAuth:Login.Args = {
  username : "this object will have err because it's missing a property"
}
```