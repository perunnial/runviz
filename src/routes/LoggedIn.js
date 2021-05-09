import React from 'react'
import PropTypes from 'prop-types'

import { getAthlete, getAthleteStats } from '../utils'

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
    return (
      <div>
        <h2>LoggedIn</h2>
        <h3> {this.state.athlete.firstname} {this.state.athlete.laststname} </h3>
        <img src={this.state.athlete.profile} alt="athlete.profile"></img>
      </div>
    )
  }
}

LoggedIn.propTypes = {
  accessToken: PropTypes.string.isRequired
}

export default LoggedIn
