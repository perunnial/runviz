import React from 'react'

export class Home extends React.Component {
  doLogin () {
    const REACT_APP_RUNVIZ_CLIENT_ID = process.env.REACT_APP_RUNVIZ_CLIENT_ID
    const redirectUrl = 'http://localhost:3000/intermediate'
    const scope = 'profile:read_all,activity:read_all'
    window.location = `http://www.strava.com/oauth/authorize?client_id=${REACT_APP_RUNVIZ_CLIENT_ID}&response_type=code&redirect_uri=${redirectUrl}/exchange_token&approval_prompt=force&scope=${scope}`
  }

  render () {
    return (
      <div>
        <h2>Home</h2>
        <button onClick={this.doLogin}>Strava Login</button>
      </div>
    )
  }
}

export default Home
