import React from 'react'
import PropTypes from 'prop-types'

import { getAthlete, getActivities } from '../utils'

import CalendarChart from './CalendarChart'

class LoggedIn extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      athleteName: '',
      athleteProfile: '',
      activities: []
    }
  }

  componentDidMount () {
    // console.log('loggedin - comp did mount')

    const fetchData = async () => {
      const athleteResponse = await getAthlete(this.props.location.state.accessToken)
      // console.log(athleteResponse)

      const activitiesResponse = await getActivities(this.props.location.state.accessToken)
      // console.log(activitiesResponse)

      // console.log('Setting state - loggedin')
      this.setState(
        {
          athleteName: athleteResponse.firstname + ' ' + athleteResponse.lastname,
          athleteProfile: athleteResponse.profile_medium,
          activities: activitiesResponse
        }
      )
    }

    fetchData()
  }

  render () {
    // console.log(this)

    return (
      <div>
        <div className="athleteInfo">
          <p><small>Logged in: {this.state.athleteName} &nbsp;
            <img className="athletePicture" src={this.state.athleteProfile}/> &nbsp;
          </small></p>
        </div>
        {this.state.activities.length
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
