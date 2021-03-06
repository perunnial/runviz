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
    const fetchData = async () => {
      const athleteResponse = await getAthlete(this.props.location.state.accessToken)
      this.setState(
        {
          athleteName: athleteResponse.firstname + ' ' + athleteResponse.lastname,
          athleteProfile: athleteResponse.profile_medium
        }
      )

      const activitiesResponse = await getActivities(this.props.location.state.accessToken)
      this.setState(
        {
          activities: activitiesResponse
        }
      )
    }
    fetchData()
  }

  render () {
    // no spinner while fetching athlete info because
    // the spinner for activities will still be spinning
    return (
      <div>
        {this.state.athleteName
          ? (
          <div className="athleteInfo">
            <p><small>{this.state.athleteName} &nbsp;
              <img className="athletePicture" src={this.state.athleteProfile}/> &nbsp;
            </small></p>
          </div>
            )
          : (
              null
            )}

        {this.state.activities.length
          ? (
          <div>
            <CalendarChart activities={this.state.activities} />
          </div>
            )
          : (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-orange" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
            )
        }
      </div>
    )
  }
}

LoggedIn.propTypes = {
  location: PropTypes.object.isRequired
}

export default LoggedIn
