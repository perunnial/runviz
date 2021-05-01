import React from 'react'

import { getAthlete, getAthleteStats } from '../utils'

import store from '../redux/store'

class LoggedIn extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      athlete: {},
      athleteStats: {}
    }
  }

  componentDidMount () {
    const fetchData = async () => {
      const fetchedTokenResponse = store.getState().tokenResponse.tr

      const athleteResponse = await getAthlete(fetchedTokenResponse.access_token)
      console.log(athleteResponse)

      const athleteStatsResponse = await getAthleteStats(fetchedTokenResponse.access_token, fetchedTokenResponse.athlete.id)
      console.log(athleteStatsResponse)

      this.setState(
        {
          athlete: athleteResponse,
          athleteStats: athleteStatsResponse
        }
      )
    }

    fetchData()
  }

  render () {
    const fetchedTokenResponse = store.getState().tokenResponse.tr

    return (
      <div>
        <h2>LoggedIn</h2>
        <h3>{fetchedTokenResponse.athlete.firstname} {fetchedTokenResponse.athlete.lastname}</h3>
        <img src={fetchedTokenResponse.athlete.profile} alt="athlete profile"></img>
      </div>
    )
    // <h4>Lifetime Run Distance = {this.state.athleteStats.all_run_totals.distance}</h4>
  }
}

export default LoggedIn
