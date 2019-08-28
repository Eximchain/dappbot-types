import { bodyHasStrings, isString } from '../util';

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
   * @param maybe 
   */
  export function isCore(maybe:any): maybe is Core {
    return bodyHasStrings(maybe, Object.keys(EmptyCore()))
  }

  /**
   * Factory to produce an empty `Item.Core`.
   */
  export function EmptyCore():Item.Core {
    return {
      DappName: '',
      Abi : '',
      Web3URL : '',
      GuardianURL : '',
      ContractAddr : ''
    }
  }

  /**
   * Core data plus the dapp's tier and some
   * optional info about the GitHub integration.
   */
  export interface Full extends Core {
    Tier: Tiers
    TargetRepoName? : string
    TargetRepoOwner? : string
  }

  /**
   * Type guard; returns `true` if the argument
   * satisfies `Item.Full`, otherwise `false`.
   * @param maybe 
   */
  export function isFull(maybe:any): maybe is Full {
    return (
      bodyHasStrings(maybe, Object.keys(EmptyFull())) && 
      isTiers(maybe.Tier)
    );
  }

  /**
   * Factory to produce an empty `Item.Full`.
   */
  export function EmptyFull():Item.Full {
    return Object.assign(EmptyCore(), {
      Tier : Tiers.Standard,
      TargetRepoName : 'fake-repo',
      TargetRepoOwner : '@example-github-name'
    })
  }

  /**
   * Dapp representation returned from private
   * reads and lists, includes everything from
   * full plus some dapp management data.
   */
  export interface Api extends Full {
    OwnerEmail : string
    CreationTime : string
    DnsName : string
    State : States
  }

  /**
   * Type guard; returns `true` if the argument
   * satisfies `Item.Api`, otherwise `false`.
   * @param maybe 
   */
  export function isApi(maybe:any): maybe is Api {
    return (
      bodyHasStrings(maybe, Object.keys(SampleApi())) &&
      isTiers(maybe.Tier) &&
      isState(maybe.State)
    )
  }

  /**
   * Factory to produce an empty `Item.Api`.
   */
  export function SampleApi():Item.Api {
    return Object.assign(EmptyFull(), {
      OwnerEmail : 'alex@example.com',
      CreationTime : Date.now().toString(),
      DnsName : 'dapp.bot/example',
      State : States.AVAILABLE
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

/**
 * Type guard; only valid enum values within the
 * States enum will return `true`.
 * @param maybe
 */
export function isState(maybe:any): maybe is States {
  return isString(maybe) && Object.values(States).includes(maybe)
}

/**
 * Possible Dapp tiers and their string name 
 * representations.
 */
export enum Tiers{
  Standard = 'STANDARD',
  Professional = 'PROFESSIONAL',
  Enterprise = 'ENTERPRISE'
}

/**
 * Type guard; only valid enum values within the
 * Tiers enum will return `true`.
 * @param maybe 
 */
export function isTiers(maybe:any): maybe is Tiers {
  return isString(maybe) && Object.values(Tiers).includes(maybe);
}