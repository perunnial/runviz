import React from 'react'

const REACT_APP_RUNVIZ_CLIENT_ID = process.env.REACT_APP_RUNVIZ_CLIENT_ID
const redirectUrl = 'http://localhost:3000/intermediate'
const scope = 'profile:read_all,activity:read_all'
const doLogin = () => {
  window.location = `http://www.strava.com/oauth/authorize?client_id=${REACT_APP_RUNVIZ_CLIENT_ID}&response_type=code&redirect_uri=${redirectUrl}/exchange_token&approval_prompt=force&scope=${scope}`
}

export default function Home () {
  return (
        <div>
            <h2>Home</h2>
            <button onClick={doLogin}>Strava Login</button>
        </div>
  )
}
