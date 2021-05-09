import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Activity from './Activity'

export class Activities extends Component {
  render () {
    return this.props.activities.map((activity) => (
            <Activity key={activity.id} activity={activity} />
    ))
  }
}

Activities.propTypes = {
  activities: PropTypes.array.isRequired
}

export default Activities
