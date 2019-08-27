// This index follows the same pattern used in
// top-level folders because that pattern gives
// nice modules and imports.  To prevent clutter,
// check one of those files for a full explanation
// of the effects of each of these lines.

import * as Auth from './auth';

export * from './auth';

/**
 * The Auth namespace contains all of the method
 * definitions for the '/v1/auth' endpoint.
 */
export default Auth;