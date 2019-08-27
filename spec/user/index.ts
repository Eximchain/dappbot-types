// This line takes all of the exports from that
// file and wraps them into a single namespace.
// If we didn't do this "* as User" syntax here,
// then a consumer would have to do it in order
// to get a convenient namespace.
import * as User from './user';

// This line directly surfaces all of its non-default
// exports from right here, so that users can just
// grab one item from there, e.g.:
//
// import { ChallengeType } from 'dappbot-types/spec/user'
//
export * from './user';

// This line exports the other file's namespace by default,
// so that consumers can grab all of its exports under one
// convenient name.
//
// import User from 'dappbot-types/spec/user';
export default User;

