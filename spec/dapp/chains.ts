export enum Names {
  Eximchain = 'Eximchain',
  EximGamma = 'EximGamma',
  Ethereum = 'Ethereum',
  Ropsten = 'Ropsten',
  Kovan = 'Kovan',
  Rinkeby = 'Rinkeby',
  Goerli = 'Goerli'
}

export interface Details {
  id: number
  genesisHash: string
  web3Url: string
  name: Names
  displayName: string
}

export function isName(val: string): val is Names {
  return Object.values(Names).includes(val as Names);
}

export function detailsByName(): { [key: string]: Details } {
  return {
    [Names.Eximchain]: Eximchain(),
    [Names.EximGamma]: EximGamma(),
    [Names.Ethereum]: Ethereum(),
    [Names.Goerli]: Goerli(),
    [Names.Kovan]: Kovan(),
    [Names.Rinkeby]: Rinkeby(),
    [Names.Ropsten]: Ropsten()
  }
}

export function allDetails(): Details[] {
  return Object.values(detailsByName());
}

export function detailsFromName(name: string): Details | null {
  let details = detailsByName()[name];
  return details ? details : null;
}

export function detailsFromUrl(url:string): Details | null {
  let detail = allDetails().find(each => each.web3Url === url);
  return detail ? detail : null;
}

export function detailsById(): { [key: number] : Details[] } {
  return allDetails().reduce((result, chain) => {
    if (result[chain.id]) {
      result[chain.id].push(chain);
    } else {
      result[chain.id] = [chain];
    }
    return result;
  }, {} as { [key:number] : Details[] })
}

export function Eximchain(): Details {
  return {
    id: 1,
    genesisHash: '0x722138a9f3635c65747a8e2eeac7e7963846fb952b8931da257395fd7656c3dd',
    web3Url: "https://tx-executor-stress-test.eximchain.com",
    name: Names.Eximchain,
    displayName: 'Eximchain (Main Net)'
  }
}

export function EximGamma(): Details {
  return {
    id: 1,
    genesisHash: '0x6a2d1d7602dbebc139cf9598607bf012d30da83954aab5f731d7550feb283bdc',
    web3Url: 'https://gamma-tx-executor-us-east.eximchain-dev.com',
    name: Names.EximGamma,
    displayName: 'Eximchain (Test Net)'
  }
}

export function Ethereum(): Details {
  return {
    id: 1,
    genesisHash: '0xd4e56740f876aef8c010b86a40d5f56745a118d0906a34e69aec8c0db1cb8fa3',
    web3Url: "https://mainnet.infura.io/v3/45c2433b314e4ad09674978a2b9cce43",
    name: Names.Ethereum,
    displayName: 'Ethereum (Main Net)'
  }
}

export function Ropsten(): Details {
  return {
    id: 3,
    genesisHash: '0x41941023680923e0fe4d74a34bdac8141f2540e3ae90623718e47d66d1ca4a2d',
    web3Url: "https://ropsten.infura.io/v3/f084d60882a94d76bfb3b587af30e8e6",
    name: Names.Ropsten,
    displayName: 'Ethereum (Ropsten)'
  }
}

export function Kovan(): Details {
  return {
    id: 42,
    genesisHash: '0xa3c565fc15c7478862d50ccd6561e3c06b24cc509bf388941c25ea985ce32cb9',
    web3Url: "https://kovan.infura.io/v3/c58eda7787d342c7b41f8a3f38893def",
    name: Names.Kovan,
    displayName: 'Ethereum (Kovan)'
  }
}

export function Rinkeby(): Details {
  return {
    id: 4,
    genesisHash: '0x6341fd3daf94b748c72ced5a5b26028f2474f5f00d824504e4fa37a75767e177',
    name: Names.Rinkeby,
    web3Url: "https://rinkeby.infura.io/v3/70a3fea548984fffbe86de56093b8044",
    displayName: 'Ethereum (Rinkeby)'
  }
}

export function Goerli(): Details {
  return {
    id: 5,
    genesisHash: '0xbf7e331f7f7c1dd2e05159666b3bf8bc7a8a3a9eb1d518969eab529dd9b88c1a',
    name: Names.Goerli,
    web3Url: 'https://goerli.infura.io/v3/55454709df7f4e54a660ceb5ad5a844c',
    displayName: 'Ethereum (Görli)'
  }
}