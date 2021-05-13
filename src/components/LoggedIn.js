import React from 'react'
import PropTypes from 'prop-types'

import { getAthlete, getAthleteStats, getActivities } from '../utils'

import CalendarChart from './CalendarChart'

class LoggedIn extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      athleteName: '',
      athleteProfile: '',
      runTotalDistance: 0,
      activities: []
    }
  }

  componentDidMount () {
    const fetchData = async () => {
      const athleteResponse = await getAthlete(this.props.location.state.accessToken)
      // console.log(athleteResponse)

      const athleteStatsResponse = await getAthleteStats(this.props.location.state.accessToken, athleteResponse.id)
      // console.log(athleteStatsResponse)

      const activitiesResponse = await getActivities(this.props.location.state.accessToken)
      // console.log(activitiesResponse)

      this.setState(
        {
          athleteName: athleteResponse.firstname + ' ' + athleteResponse.lastname,
          athleteProfile: athleteResponse.profile_medium,
          runTotalDistance: parseInt(athleteStatsResponse.all_run_totals.distance) / 1000,
          activities: activitiesResponse
        }
      )
    }

    fetchData()
  }

  render () {
    return (
      <div>
        <div className="athleteInfo">
          <p><small>Logged in: {this.state.athleteName} &nbsp;
            <img className="athletePicture" src={this.state.athleteProfile}/> &nbsp;
          </small></p>
        </div>
        {this.state.activities
          ? (
          <div>
            <CalendarChart activities={this.state.activities} />
          </div>
            )
          : (
          <h4> Loading Activities... </h4>
            )}
      </div>
    )
  }
}

LoggedIn.propTypes = {
  location: PropTypes.object.isRequired
}

export default LoggedIn
