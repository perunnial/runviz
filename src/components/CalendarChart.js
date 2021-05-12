import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { getDates } from '../utils'

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
    this.lastValLength = 0
    this.maxValue = 0
  }

  loadValues () {
    const dateVsDistance = {}
    // console.log(this.props.activities.length)
    for (let idx = 0; idx < this.props.activities.length; idx++) {
      const activity = this.props.activities[idx]
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
    }
    // console.log(dateVsDistance)

    const values = []
    for (const k in dateVsDistance) {
      values.push({ date: k, count: dateVsDistance[k] })
      if (dateVsDistance[k] > this.maxValue) {
        this.maxValue = dateVsDistance[k]
      }
    }
    // console.log(values)
    return values
  }

  /* To prepare the initial state of the component based on this.props,
     it should be done in componentDidUpdate instead of componentDidMount.
     Components aren't mounted with populated props from parent, only updated with them.
  */
  async componentDidUpdate () {
    const dates = await getDates()
    const values = this.loadValues()
    // update state only conditionally to avoid infinite loop
    // update if length of values has increased
    if (values.length > this.lastValLength) {
      this.lastValLength = values.length
      this.setState({
        startDate: dates[0],
        endDate: dates[1],
        values: values
      })
    }
  }

  render () {
    const getTitleForValue = (value) => {
      if (!value || !value.date) {
        return null
      }
      return `${value.count} km on ${value.date}`
    }

    const getClassForValue = (value) => {
      if (!value) {
        return 'color-empty'
      }
      const scale = ((4 * value.count) / this.maxValue).toFixed(0)
      return `color-runvizgreen-${scale}`
    }

    // console.log(this)
    // this is logged after value update

    return (
        <div>
        { this.state.values
          ? (
                <CalendarHeatmap
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                values={this.state.values}
                showWeekdayLabels={true}
                titleForValue={getTitleForValue}
                classForValue={getClassForValue}
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
