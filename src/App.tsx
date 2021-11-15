import { Navbar, Page, Center } from 'decentraland-ui'
import React from 'react'
import { ChainId, DAppProvider, Config } from '@usedapp/core'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NoMetaMask from './components/NoMetaMask'
import WrongNetwork from './containers/WrongNetwork'
import Challenge from './features/challenge'
import { DEFAULT_APP_CHAIN_ID, DEFAULT_INFURA_URL } from './constants'

const config: Config = {
  readOnlyChainId: DEFAULT_APP_CHAIN_ID,
  readOnlyUrls: {
    [ChainId.Kovan]: DEFAULT_INFURA_URL,
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
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Challenge />} />
                  </Routes>
                </BrowserRouter>
                <WrongNetwork />
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
