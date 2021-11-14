import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { JsonRpcProvider, Web3Provider as EtherWeb3Provider } from '@ethersproject/providers'
import { ethers } from 'ethers'
import { Loader } from 'decentraland-ui'

import useDetectProvider, { DetectProviderStatus } from '../hooks/useDetectProvider'
import NoMetaMask from '../components/NoMetaMask'

type Web3ProviderType = {
  providerStatus: DetectProviderStatus
  readOnlyProvider: JsonRpcProvider | null
  web3Provider: EtherWeb3Provider | null
  walletChainId: number | null
  account: string | null
  connecting: boolean
  connect: () => void
}

export const Web3Context = createContext<Web3ProviderType | undefined>(undefined)

type Props = {
  children?: React.ReactNode
}

const ethereum: any = window.ethereum

export default function Web3Provider({ children }: Props) {
  const { status, provider } = useDetectProvider()
  const [account, setAccount] = useState<string | null>(null)
  const [walletChainId, setWalletChainId] = useState<number | null>(null)
  const [connecting, setConnecting] = useState<boolean>(true)
  const [web3Provider, setWeb3Provider] = useState<EtherWeb3Provider | null>(null)
  const [readOnlyProvider, setReadOnlyProvider] = useState<JsonRpcProvider | null>(null)

  const connect = useCallback(async () => {
    if (status === 'not-detected') {
      return
    }

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    if (accounts && accounts.length > 0) {
      setAccount(accounts[0])
    }
  }, [status])

  // give some time to check connection
  useEffect(() => {
    const t = setTimeout(() => {
      setConnecting(false)
    }, 500)

    return () => clearTimeout(t)
  }, [status])

  // react to provider
  useEffect(() => {
    if (provider) {
      setWeb3Provider(new ethers.providers.Web3Provider(ethereum))
    }
    if (provider && ethereum?.selectedAddress) {
      setWalletChainId(parseInt(ethereum?.chainId, 16))
      connect()
    }
  }, [provider, connect])

  // listen to account changes
  useEffect(() => {
    if (!provider) {
      return
    }

    const accountsListener = (accounts: string[]) => {
      if (accounts?.length) {
        setAccount(accounts[0])
      } else {
        setAccount(null)
      }
    }

    provider.on('accountsChanged', accountsListener)

    return () => {
      provider.removeListener('accountsChanged', accountsListener)
    }
  }, [provider])

  // listen to chainId changes
  useEffect(() => {
    if (!provider) {
      return
    }

    const chainListener = (chainId: string) => {
      setWalletChainId(parseInt(chainId, 16))
    }

    provider.on('chainChanged', chainListener)

    return () => {
      provider.removeListener('chainChanged', chainListener)
    }
  }, [provider])

  // jsonRpcProvider
  useEffect(() => {
    setReadOnlyProvider(null)

    const t = setTimeout(() => {
      const url = process.env.REACT_APP_INFURA_TOKEN
      if (!url) {
        return
      }

      const jsonProvider = new ethers.providers.JsonRpcProvider(url)

      setReadOnlyProvider(jsonProvider)
    }, 500)

    return () => clearTimeout(t)
  }, [walletChainId])

  const value = {
    providerStatus: status,
    readOnlyProvider,
    web3Provider,
    connecting,
    account,
    walletChainId,
    connect,
  }

  if (connecting) {
    return <Loader active size="massive" />
  }

  return (
    <Web3Context.Provider value={value}>
      {['not-detected', 'loading'].includes(status) ? <NoMetaMask /> : children}
    </Web3Context.Provider>
  )
}

export function useWeb3(): Web3ProviderType {
  const context = useContext(Web3Context)
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider')
  }
  return context
}
