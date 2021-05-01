import { combineReducers } from 'redux'

const initialTokenResponse = {
  tr: {}
}

export const tokenResponseReducer = (state = initialTokenResponse, action) => {
  switch (action.type) {
    case 'SET_TOKEN_RESPONSE':
      // console.log(action.payload)
      return { ...state, tr: action.payload }
    default:
      return state
  }
}

const reducers = combineReducers({
  tokenResponse: tokenResponseReducer
})

export default reducers
