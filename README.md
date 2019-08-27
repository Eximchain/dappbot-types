# dappbot-types

Typescript bindings describing the core data types and API interactions with DappBot.  Extracted into their own repository in order to :

- Guarantee consistency across multiple client and server projects
- Make the overall DappBot codebase DRYer
- Share these types with our API customers

The types are grouped into nested namespaces in order to minimize both collisions and stuttering. They are nested like:

- `DappBotTypes`: Overall namespace, package's default export
  - `Dapp`: 
  - User: 
  - Responses: 
  - Methods: 
    - Auth: 
      - Login:
      - Refresh: 
      - ...
    - Private: 
    - Payment: 
    - Public: 

As a consumer, you can import either import the full namespace from the top or instead use the import string to grab one of the more nested ones.  All of the individual namespaces & types are declared within the `spec` folder, which you can directly refer to in your import.  By example:

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