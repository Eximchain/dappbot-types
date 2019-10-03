import { keysAreStrings, isString, isObject } from '../validators';
import * as Chains from './chains';

// This line makes Chain part of the Dapp
// namespace, supporting calls like:
//
// import Dapp from '@eximchain/dappbot-types/spec/dapp';
// ...
// const details = Dapp.Chain.Ethereum();
//
export import Chain = Chains;

/**
 * Possible Dapp tiers and their string name 
 * representations.
 */
export enum Tiers {
  Standard = 'STANDARD',
  Professional = 'PROFESSIONAL',
  Enterprise = 'ENTERPRISE'
}

/**
 * Type guard; only valid enum values within the
 * Tiers enum will return `true`.
 * @param val 
 */
export function isTiers(val: any): val is Tiers {
  let tierStrings:string[] = Object.values(Tiers);
  return isString(val) && tierStrings.includes(val);
}

/**
 * All of the potential shapes for a DappItem
 * at different points throughout our system,
 * along with factory functions and type guards.
 */
export namespace Item {

  /**
   * All data required to render a dapp on
   * DappHub; this is the dapp's shape when
   * returned from the public view.
   */
  export interface Core {
    DappName: string
    Abi: string
    Web3URL: string
    GuardianURL: string
    ContractAddr: string
  }

  /**
   * Type guard; returns `true` if the argument
   * satisfies `Item.Core`, otherwise `false`.
   * @param val 
   */
  export function isCore(val: any): val is Core {
    return keysAreStrings(val, Object.keys(newCore()))
  }

  /**
   * Factory to produce an empty `Item.Core`.
   * Useful to get the interface's keys as
   * a value. Note that the actual values on
   * this object are not valid.
   */
  export function newCore(): Item.Core {
    return {
      DappName: '',
      Abi: '',
      Web3URL: '',
      GuardianURL: '',
      ContractAddr: ''
    }
  }

  /**
   * Core data plus the dapp's tier and some
   * optional info about the GitHub integration.
   * This type applies to both enterprise and
   * standard dapps.
   */
  export interface Full extends Core {
    Tier: Tiers,
    TargetRepoName?: string
    TargetRepoOwner?: string
  }

  /**
   * Type guard; returns `true` if the argument
   * satisfies `Item.Full`, otherwise `false`.
   * @param val 
   */
  export function isFull(val: any): val is Full {
    if (!isObject(val)) return false;
    if (!isTiers(val.Tier)) return false;
    return val.Tier === Tiers.Enterprise ?
      keysAreStrings(val, Object.keys(newFullEnterprise())) :
      keysAreStrings(val, Object.keys(newFullHub()))
  }

  /**
   * Factory to produce an empty `Item.Full`.
   * Useful to get the interface's keys as
   * a value. Note that the actual values on
   * this object are not valid.  It produces
   * a standard dapp, so no GitHub config.
   */
  export function newFull(): Item.Full {
    return {
      ...newCore(),
      Tier: Tiers.Standard
    }
  }

  /**
   * 
   */
  export interface FullHub extends Item.Full {
    Tier: Exclude<Tiers, Tiers.Enterprise>
  }

  /**
   * 
   * @param val 
   */
  export function isFullHub(val: any): val is FullHub {
    return (
      keysAreStrings(val, Object.keys(newFullEnterprise())) &&
      isTiers(val.Tier) &&
      val.Tier !== Tiers.Enterprise
    )
  }

  /**
   * 
   */
  export function newFullHub(): FullHub {
    return {
      Tier : Tiers.Standard,
      ...newCore()
    };
  }

  /**
   * 
   */
  export interface FullEnterprise extends Item.Full {
    Tier: Extract<Tiers, Tiers.Enterprise>
    TargetRepoName: string
    TargetRepoOwner: string
  }

  /**
   * 
   * @param val 
   */
  export function isFullEnterprise(val: any): val is FullEnterprise {
    return (
      keysAreStrings(val, Object.keys(newFullEnterprise())) &&
      val.Tier === Tiers.Enterprise
    )
  }

  /**
   * 
   */
  export function newFullEnterprise(): FullEnterprise {
    return {
      ...newCore(),
      Tier: Tiers.Enterprise,
      TargetRepoName: 'myfirstdapp',
      TargetRepoOwner: '@example'
    }
  }

  /**
   * Dapp representation returned from private
   * reads and lists, includes everything from
   * full plus some dapp management data.
   */
  export interface Api extends Full {
    OwnerEmail: string
    CreationTime: string
    DnsName: string
    State: States
  }

  /**
   * Type guard; returns `true` if the argument
   * satisfies `Item.Api`, otherwise `false`.
   * @param val 
   */
  export function isApi(val: any): val is Api {
    return (
      keysAreStrings(val, Object.keys(newApi())) &&
      isTiers(val.Tier) &&
      isState(val.State)
    )
  }

  /**
   * Factory to produce an empty `Item.Api`.
   * Useful to get the interface's keys as
   * a value. Note that the actual values on
   * this object are not valid.
   */
  export function newApi(): Item.Api {
    return Object.assign(newFull(), {
      OwnerEmail: '',
      CreationTime: '',
      DnsName: '',
      State: States.AVAILABLE
    })
  }
}


/**
 * All possible values for the State of a Dapp
 * as formatted from the API.
 */
export enum States {
  CREATING = 'CREATING',
  BUILDING_DAPP = 'BUILDING_DAPP',
  AVAILABLE = 'AVAILABLE',
  DELETING = 'DELETING',
  FAILED = 'FAILED',
  DEPOSED = 'DEPOSED'
}

export enum Operations {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete'
}

/**
 * Type guard; only valid enum values within the
 * States enum will return `true`.
 * @param val
 */
export function isState(val: any): val is States {
  let stateStrings:string[] = Object.values(States);
  return isString(val) && stateStrings.includes(val)
}

/**
 * Given a potential DappName, applies a regex
 * which outputs a valid DappName.
 * @param DappName 
 */
export function cleanName(DappName: string) {
  return DappName.toLowerCase()
    .replace(/\s/g, '-') // Convert spaces to hyphens
    .replace(/[^A-Za-z0-9-]/g, '') // Remove non-alphanumerics
    .replace(/-*$|^-*/g, '') // Trim hyphens off the front & back
}
