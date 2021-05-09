import React from 'react'
import { Redirect } from 'react-router'

import { getAuthCodeFromUrl, getTokensFromAuthCode } from '../utils'

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
      return <Redirect to = {{
        pathname: '/loggedin',
        state: { accessToken: this.state.accessToken }
      }}
      />
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
