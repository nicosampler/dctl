import React from 'react'
import { Segment, Header, Button } from 'decentraland-ui'

export default function NoMetaMask() {
  return (
    <Segment textAlign="center">
      <Header>Download Metamask before continue</Header>

      <Button href="https://metamask.io/download.html" primary target="_blank">
        Download Metamask
      </Button>
    </Segment>
  )
}
