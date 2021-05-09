import React from 'react'
import PropTypes from 'prop-types'

import { getAthlete, getAthleteStats, getActivities } from '../utils'

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
      const athleteResponse = await getAthlete(this.props.accessToken)
      console.log(athleteResponse)

      const athleteStatsResponse = await getAthleteStats(this.props.accessToken, athleteResponse.id)
      console.log(athleteStatsResponse)

      const activitiesResponse = await getActivities(this.props.accessToken)
      console.log(activitiesResponse)

      this.setState(
        {
          athleteName: athleteResponse.firstname + ' ' + athleteResponse.lastname,
          athleteProfile: athleteResponse.profile,
          runTotalDistance: parseInt(athleteStatsResponse.all_run_totals.distance) / 1000
        }
      )
    }

    fetchData()
  }

  render () {
    return (
      <div>
        <h2>LoggedIn</h2>
        <h3> {this.state.athleteName} </h3>
        <img src={this.state.athleteProfile} alt="athlete.profile"></img>
        <h3> Total Run Distance = {this.state.runTotalDistance} km </h3>
      </div>
    )
  }
}

LoggedIn.propTypes = {
  accessToken: PropTypes.string.isRequired
}

export default LoggedIn
