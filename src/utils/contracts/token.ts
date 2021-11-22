import { Contract } from '@ethersproject/contracts'

import { DEFAULT_APP_CHAIN_ID } from '../../constants'
import { getChainConfig } from '../../constants/chains'
import { contracts } from '../../constants/contracts'
import tokenAbi from '../../abis/token.json'
import { getProvider } from '../provider'
import { Token } from '../../types/typechain'

const chainConfig = getChainConfig(DEFAULT_APP_CHAIN_ID)
const contractAddress = contracts.TOKEN.address[chainConfig.chainId]

export function getTokenBalance(address: string) {
  const provider = getProvider()
  const contract = new Contract(contractAddress, tokenAbi, provider) as Token
  return contract.balanceOf(address)
}

export function transferToken(to: string, amount: number) {
  const provider = getProvider()
  const contract = new Contract(contractAddress, tokenAbi, provider.getSigner()) as Token
  return contract.transfer(to, amount)
}
