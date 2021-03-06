import { Navbar, Page, Center } from 'decentraland-ui'
import React from 'react'
import { ChainId, DAppProvider, Config } from '@usedapp/core'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NoMetaMask from './components/NoMetaMask'
import WrongNetwork from './containers/WrongNetwork'
import SetProvider from './containers/SetProvider'
import Challenge from './features/challenge'
import { DEFAULT_APP_CHAIN_ID } from './constants'
import { getChainConfig } from './constants/chains'

const chainConfig = getChainConfig(DEFAULT_APP_CHAIN_ID)
const config: Config = {
  readOnlyChainId: DEFAULT_APP_CHAIN_ID,
  readOnlyUrls: {
    [ChainId.Kovan]: chainConfig.rpcUrl,
  },
}

function App() {
  return (
    <div className="App">
      <div className="Navbar-story-container">
        <Navbar isFullscreen />
        <Page isFullscreen>
          <Center>
            {window.ethereum ? (
              <DAppProvider config={config}>
                <WrongNetwork />
                <SetProvider />
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Challenge />} />
                  </Routes>
                </BrowserRouter>
              </DAppProvider>
            ) : (
              <NoMetaMask />
            )}
          </Center>
        </Page>
      </div>
    </div>
  )
}

export default App
