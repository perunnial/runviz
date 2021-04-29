import React from 'react'

import { getAuthCodeFromUrl, getTokensFromAuthCode } from './utils'

class Redirect extends React.Component {
  state= {
    accessToken: {},
    refreshToken: {}
  };

  componentDidMount () {
    const logIn = async () => {
      const authCode = getAuthCodeFromUrl(window.location.href)
      console.log(authCode)
      const tokenResponse = await getTokensFromAuthCode(authCode)
      console.log(tokenResponse)
      this.setState(
        {
          accessToken: tokenResponse.access_token,
          refreshToken: tokenResponse.refresh_token
        }
      )
      console.log(this.state.accessToken)
      console.log(this.state.refreshToken)
    }
    logIn()
  }

  render () {
    return (
      <div>
          <h2>Redirect</h2>
      </div>
    )
  }
}

export default Redirect
