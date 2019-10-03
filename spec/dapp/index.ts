// This line takes all of the exports from that
// file and wraps them into a single namespace.
// If we didn't do this "* as Dapp" syntax here,
// then a consumer would have to do it in order
// to get a convenient namespace.
import * as Dapp from './dapp';
import * as ChainTypes from './chains';

// This line directly surfaces all of its non-default
// exports from right here, so that users can just
// grab one item from there, e.g.:
//
// import { DbItem } from 'dappbot-types/spec/dapp'
//
export * from './dapp';

// This line allows end-users to import the Chain
// namespace from the dapp directory, like:
//
// import { Chain } from 'dappbot-types/spec/dapp';
//
export import Chain = ChainTypes;

// This line exports the other file's namespace by default,
// so that consumers can grab all of its exports under one
// convenient name.
//
// import Dapp from 'dappbot-types/spec/dapp';
export default Dapp;