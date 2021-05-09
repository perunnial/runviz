export const setTokenResponse = (tokenResponse) => {
  return {
    type: 'SET_TOKEN_RESPONSE',
    payload: tokenResponse
  }
}

export const setAthleteStats = (athleteStatsResponse) => {
  return {
    type: 'SET_ATHLETE_STATS',
    payload: athleteStatsResponse
  }
}
