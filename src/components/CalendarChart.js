import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { getDates, isCorrectType } from '../utils'

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
    this.maxValue = 0
    this.totalDistance = 0
  }

  async loadValues () {
    const dateVsDistance = {}
    // console.log('loadValues')
    // console.log(this.props.activities.length)
    for (let idx = 0; idx < this.props.activities.length; idx++) {
      const activity = this.props.activities[idx]
      if (isCorrectType(activity.type)) {
        const k = activity.start_date_local.substring(0, 10)
        const v = activity.distance / 1000
        const rounded = Math.round(v * 10) / 10
        this.totalDistance += rounded
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

  async componentDidMount () {
    // console.log('calendarchart - comp did update')

    const dates = await getDates()
    const values = await this.loadValues()

    // if (values.length > 0) {
    // console.log('Setting state - calendarchart')
    this.setState({
      startDate: dates[0],
      endDate: dates[1],
      values: values
    })
    // }
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
      return `color-runviz-${scale}`
    }

    // console.log(this)
    // this is logged after value update

    return (
        <div>
        { this.state.values
          ? (
                <div>
                  <CalendarHeatmap
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  values={this.state.values}
                  showWeekdayLabels={true}
                  titleForValue={getTitleForValue}
                  classForValue={getClassForValue}
                  />
                  <div className="text-center">
                    <p>{this.totalDistance.toFixed(0)} km in the last year</p>
                  </div>
                </div>
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
