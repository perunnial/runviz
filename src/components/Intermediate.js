import React from 'react'

import { getAuthCodeFromUrl, getTokensFromAuthCode } from '../utils'

import LoggedIn from './LoggedIn'

class Intermediate extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      accessToken: ''
    }
  }

  componentDidMount () {
    const logIn = async () => {
      const authCode = getAuthCodeFromUrl(window.location.href)
      const tokenResponse = await getTokensFromAuthCode(authCode)
      this.setState(
        {
          accessToken: tokenResponse.access_token
        }
      )
    }
    logIn()
  }

  render () {
    if (this.state.accessToken !== '') {
      return (
        <div>
          <LoggedIn accessToken={this.state.accessToken} />
        </div>
      )
    }
    return (
      <div>
          <h2>Intermediate</h2>
          <h3>{this.state.accessToken}</h3>
      </div>
    )
  }
}

export default Intermediate
