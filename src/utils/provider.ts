import { Web3Provider } from '@ethersproject/providers'

let _provider: Web3Provider | undefined

export const setProvider = (provider: Web3Provider | undefined) => {
  _provider = provider
}

export const getProvider = (): Web3Provider => {
  if (!_provider) {
    throw new Error('Provider is not set')
  }
  return _provider
}
