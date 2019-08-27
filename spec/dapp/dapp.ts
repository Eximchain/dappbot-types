/**
 * All of the potential shapes for a DappItem
 * at different points throughout our system.
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
   * Core data plus the dapp's tier and some
   * optional info about the GitHub integration.
   */
  export interface Full extends Core {
    Tier: Tiers
    TargetRepoName? : string
    TargetRepoOwner? : string
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
 * Possible Dapp tiers and their string name
 * representations.
 */
export enum Tiers{
  Standard = 'STANDARD',
  Professional = 'PROFESSIONAL',
  Enterprise = 'ENTERPRISE'
}

/**
 * Factory to produce a Full DappItem, suitable
 * for plugging into a Create Dapp call.
 */
export function SampleDappArgs():Item.Full{
  return {
    DappName: '',
    Abi : '',
    Web3URL : '',
    GuardianURL : 'https://guardian.dapp.bot',
    ContractAddr : '',
    Tier:Tiers.Standard
  }
}

// TODO: Write guard functions to validate whether
// an object is a valid Dapp.