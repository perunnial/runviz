import axios from 'axios'

export const getAuthCodeFromUrl = (url) => {
  return url.split('&')[1].slice(5)
}

export const getTokensFromAuthCode = async (authCode) => {
  try {
    const REACT_APP_RUNVIZ_CLIENT_ID = process.env.REACT_APP_RUNVIZ_CLIENT_ID
    const REACT_APP_RUNVIZ_CLIENT_SECRET = process.env.REACT_APP_RUNVIZ_CLIENT_SECRET
    const request = `https://www.strava.com/api/v3/oauth/token?client_id=${REACT_APP_RUNVIZ_CLIENT_ID}&client_secret=${REACT_APP_RUNVIZ_CLIENT_SECRET}&code=${authCode}&grant_type=authorization_code`
    const response = await axios.post(request)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getAthlete = async (accessToken) => {
  try {
    const request = 'https://www.strava.com/api/v3/athlete'
    const authHeader = { headers: { Authorization: `Bearer ${accessToken}` } }
    const response = await axios.get(request, authHeader)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getAthleteStats = async (accessToken, athleteId) => {
  try {
    const request = `https://www.strava.com/api/v3/athletes/${athleteId}/stats`
    const authHeader = { headers: { Authorization: `Bearer ${accessToken}` } }
    const response = await axios.get(request, authHeader)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getActivities = async (accessToken) => {
  try {
    const mergedActivities = []
    const dates = await getDates()
    // TODO - adjust the dates as per local timezone
    const startDateTimestamp = parseInt(dates[0].getTime() / 1000).toFixed(0)
    const endDateTimestamp = parseInt(dates[1].getTime() / 1000).toFixed(0)
    const perPage = 200
    let pageNum = 1

    while (true) {
      const request = `https://www.strava.com/api/v3/athlete/activities?before=${endDateTimestamp}&after=${startDateTimestamp}&page=${pageNum}&per_page=${perPage}`
      const authHeader = { headers: { Authorization: `Bearer ${accessToken}` } }
      const response = await axios.get(request, authHeader)
      // returned blank response, so pages over
      if (response.data.length === 0) {
        return mergedActivities
      }
      mergedActivities.push(...response.data)
      pageNum++
    }
  } catch (error) {
    console.error(error)
  }
}

export const getDates = async () => {
  const dates = []
  const endDate = new Date()
  // TODO - make this range configurable
  const startDate = new Date(endDate.getFullYear() - 2, endDate.getMonth(), endDate.getDate())
  dates.push(startDate)
  dates.push(endDate)
  return dates
}

export const isCorrectType = async (type) => {
  // TODO - make this configurable to Run/Ride/etc
  return (type === 'Run')
}
