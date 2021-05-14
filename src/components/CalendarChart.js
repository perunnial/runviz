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

    const values = []
    for (const k in dateVsDistance) {
      values.push({ date: k, count: dateVsDistance[k] })
      if (dateVsDistance[k] > this.maxValue) {
        this.maxValue = dateVsDistance[k]
      }
    }
    return values
  }

  async componentDidMount () {
    const dates = await getDates()
    const values = await this.loadValues()

    this.setState({
      startDate: dates[0],
      endDate: dates[1],
      values: values
    })
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

    return (
        <div>
          { this.state.values
            ? (
                <div className="row">
                  <div className="col-1"></div>
                  <div className="col-10">
                    <CalendarHeatmap
                      startDate={this.state.startDate}
                      endDate={this.state.endDate}
                      values={this.state.values}
                      showWeekdayLabels={true}
                      titleForValue={getTitleForValue}
                      classForValue={getClassForValue}
                      gutterSize={4}
                    />
                    <div className="text-center">
                      <h6>You ran {this.totalDistance.toFixed(0)} km</h6>
                      <h6>in the last year!</h6>
                    </div>
                  </div>
                  <div className="col-1"></div>
                </div>
              )
            : (
            <h4> Loading Chart... </h4>
              )
          }
        </div>
    )
  }
}

CalendarChart.propTypes = {
  activities: PropTypes.array.isRequired
}

export default CalendarChart
