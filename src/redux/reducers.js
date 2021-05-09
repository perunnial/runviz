import { combineReducers } from 'redux'

const initialTokenResponse = {
  tr: {}
}
export const tokenResponseReducer = (state = initialTokenResponse, action) => {
  switch (action.type) {
    case 'SET_TOKEN_RESPONSE':
      return { ...state, tr: action.payload }
    default:
      return state
  }
}

const initialAthleteStats = {
  as: {}
}
export const athleteStatsReducer = (state = initialAthleteStats, action) => {
  switch (action.type) {
    case 'SET_ATHLETE_STATS':
      return { ...state, as: action.payload }
    default:
      return state
  }
}

const reducers = combineReducers({
  tokenResponse: tokenResponseReducer,
  athleteStats: athleteStatsReducer
})

export default reducers
