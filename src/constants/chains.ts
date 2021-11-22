import nullthrows from 'nullthrows'
import { ObjectValues } from '../types/utils'

export const Chains = {
  kovan: 42,
} as const

export type ChainsValues = ObjectValues<typeof Chains>
export type ChainsKeys = keyof typeof Chains

export type ChainConfig = {
  id: ChainsValues
  name: string
  shortName: string
  chainId: ChainsValues
  chainIdHex: string
  rpcUrl: string
  blockExplorerUrls: string[]
  iconUrls: string[]
}

export const chainsConfig: Record<ChainsValues, ChainConfig> = {
  [Chains.kovan]: {
    id: Chains.kovan,
    name: 'Kovan',
    shortName: 'Kovan',
    chainId: Chains.kovan,
    chainIdHex: '0x2a',
    rpcUrl: `https://kovan.infura.io/v3/${process.env.REACT_APP_INFURA_TOKEN}`,
    blockExplorerUrls: ['https://kovan.etherscan.io/'],
    iconUrls: [],
  },
}

export function getChainConfig(chainId: ChainsValues): ChainConfig {
  const networkConfig = chainsConfig[chainId]
  nullthrows(networkConfig, `No config for chain id: ${chainId}`)
  return networkConfig
}
