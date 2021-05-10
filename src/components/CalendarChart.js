import React, { Component } from 'react'
import PropTypes from 'prop-types'

import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'

export class CalendarChart extends Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: '',
      endDate: '',
      values: []
    }
  }

  componentDidMount () {
    const loadValues = async () => {
      const endDate = new Date()
      const startDate = new Date(endDate.getFullYear() - 1, endDate.getMonth(), endDate.getDate())

      const dateVsDistance = {}
      this.props.activities.forEach(activity => {
        if (activity.type === 'Run') {
          const k = activity.start_date_local.substring(0, 10)
          const v = activity.distance / 1000
          const rounded = Math.round(v * 10) / 10
          if (k in dateVsDistance) {
            dateVsDistance[k] += rounded
          } else {
            dateVsDistance[k] = rounded
          }
        }
      })

      const values = []
      for (const k in dateVsDistance) {
        values.push({ date: k, count: dateVsDistance[k] })
      }

      this.setState({
        startDate: startDate,
        endDate: endDate,
        values: values
      })
    }

    loadValues()
  }

  render () {
    return (
        <div>
        { this.state.values
          ? (
                <CalendarHeatmap
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                values={this.state.values}
                />
            )
          : (
            <h4> Loading Chart... </h4>
            )}
        </div>
    )
  }
}
CalendarChart.propTypes = {
  activities: PropTypes.array.isRequired
}

export default CalendarChart
