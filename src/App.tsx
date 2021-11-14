import { Navbar, Page } from 'decentraland-ui'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Challenge from './features/challenge'
import Web3Provider from './providers/web3Provider'

function App() {
  return (
    <div className="App">
      <div className="Navbar-story-container">
        <Navbar isFullscreen mana={100} />
        <Page>
          <Web3Provider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Challenge />} />
              </Routes>
            </BrowserRouter>
          </Web3Provider>
        </Page>
      </div>
    </div>
  )
}

export default App
