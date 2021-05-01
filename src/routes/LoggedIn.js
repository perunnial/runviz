import React from 'react'

import store from '../redux/store'

class LoggedIn extends React.Component {
  componentDidMount () {
    // store.subscribe(() => {
    //  console.log(store.getState().tokenResponse.tr.access_token)
    // })
    console.log(store.getState().tokenResponse.tr.access_token)
    console.log(store.getState().tokenResponse.tr.athlete.id)
  }

  render () {
    const fetchedTokenResponse = store.getState().tokenResponse.tr
    return (
      <div>
        <h2>LoggedIn</h2>
        <h3>{fetchedTokenResponse.access_token}</h3>
        <h3>{fetchedTokenResponse.athlete.id}</h3>
        <h3>{fetchedTokenResponse.athlete.firstname} {fetchedTokenResponse.athlete.lastname}</h3>
        <img src={fetchedTokenResponse.athlete.profile} alt="athlete profile"></img>
      </div>
    )
  }
}

export default LoggedIn
