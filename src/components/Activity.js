import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { isCorrectType } from '../utils'

export class Activity extends Component {
  render () {
    if (!isCorrectType(this.props.activity.type)) {
      return null
    }
    return (
            <div>
                <p>--------------------</p>
                <p>{this.props.activity.start_date_local}</p>
                <p>{this.props.activity.name}</p>
                <p>{parseInt(this.props.activity.distance) / 1000}</p>
            </div>
    )
  }
}

Activity.propTypes = {
  activity: PropTypes.object.isRequired
}

export default Activity
