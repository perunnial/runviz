import React from 'react'

import { Redirect } from 'react-router-dom'

import { getAuthCodeFromUrl, getTokensFromAuthCode } from '../utils'

import store from '../redux/store'
import { setTokenResponse } from '../redux/actions'

class Intermediate extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      accessToken: '',
      refreshToken: ''
    }
  }

  componentDidMount () {
    const logIn = async () => {
      const authCode = getAuthCodeFromUrl(window.location.href)
      // console.log(authCode)
      const tokenResponse = await getTokensFromAuthCode(authCode)
      // console.log(tokenResponse)
      store.dispatch(setTokenResponse(tokenResponse))
      this.setState(
        {
          accessToken: tokenResponse.access_token,
          refreshToken: tokenResponse.refresh_token
        }
      )
      // store.dispatch(setTokenResponse(tokenResponse))
    }
    logIn()
  }

  render () {
    if (this.state.accessToken !== '') {
      return <Redirect to='/loggedin' />
    }
    return (
      <div>
          <h2>Intermediate</h2>
          <h3>{this.state.accessToken}</h3>
          <h3>{this.state.refreshToken}</h3>
      </div>
    )
  }
}

export default Intermediate
