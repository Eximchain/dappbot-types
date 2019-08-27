
interface CoreDappData {
  Abi: string,
  Web3URL: string,
  GuardianURL: string,
  ContractAddr: string,
}

export interface PublicView extends CoreDappData {
  DappName: string
}

export interface UnnamedDapp extends CoreDappData {
  Tier: Tiers
}

export enum Tiers{
  Standard = 'STANDARD',
  Professional = 'PROFESSIONAL',
  Enterprise = 'ENTERPRISE'
}

export interface NamedDapp extends UnnamedDapp {
  DappName: string
}

export function SampleDappArgs():NamedDapp{
  return {
    DappName: '',
    Abi : '',
    Web3URL : '',
    GuardianURL : 'https://guardian.dapp.bot',
    ContractAddr : '',
    Tier:Tiers.Standard
  }
}

export interface DbItem extends NamedDapp {
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

export interface ApiRepresentation extends ValidCreateBody {
  OwnerEmail : string
  CreationTime : string
  DnsName : string
  State : string
}