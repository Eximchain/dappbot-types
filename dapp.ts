export interface DappData {
  Abi: string,
  Web3URL: string,
  GuardianURL: string,
  ContractAddr: string,
  Tier: Tiers
}

export enum Tiers{
  Standard = 'STANDARD',
  Professional = 'PROFESSIONAL',
  Enterprise = 'ENTERPRISE'
}

export enum DappTiers {
  POC = 'POC', // TODO: Remove this legacy tier
  STANDARD = 'STANDARD',
  PROFESSIONAL = 'PROFESSIONAL',
  ENTERPRISE = 'ENTERPRISE'
}

export interface DappCreateArgs extends DappData {
  DappName: string
}

export function SampleDappArgs():DappCreateArgs{
  return {
    DappName: '',
    Abi : '',
    Web3URL : '',
    GuardianURL : 'https://guardian.dapp.bot',
    ContractAddr : '',
    Tier:Tiers.Standard
  }
}

export interface DappDbItem extends DappCreateArgs {
  OwnerEmail : string,
  CreationTime : string,
  DnsName : string
}

export interface ValidCreateBody {
  DappName : string
  Abi : string
  ContractAddr : string
  Web3URL : string
  GuardianURL : string
  Tier : string
  TargetRepoName? : string
  TargetRepoOwner? : string
}

export interface DappApiRepresentation extends ValidCreateBody {
  OwnerEmail : string
  CreationTime : string
  DnsName : string
  State : string
}