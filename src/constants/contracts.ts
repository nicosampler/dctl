import token from '../abis/token.json'
import { Chains, ChainsValues } from './chains'

type BaseAppContractInfo = {
  abi: any[]
}

export type ChainAppContractInfo = BaseAppContractInfo & {
  address: string
}

export type AppContractInfo = BaseAppContractInfo & {
  address: { [key in ChainsValues]: string }
}

function constantContracts<T extends { [key in string]: AppContractInfo }>(o: T): T {
  return o
}

export const contracts = constantContracts({
  TOKEN: {
    address: {
      [Chains.kovan]: '0x3012A51A827e9C8CcB61b9898aAF7A80BF3B3f19',
    },
    abi: token,
  },
})
