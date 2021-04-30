import axios from 'axios'

export const getAuthCodeFromUrl = (url) => {
  return url.split('&')[1].slice(5)
}

export const getTokensFromAuthCode = async (authCode) => {
  try {
    const REACT_APP_RUNVIZ_CLIENT_ID = process.env.REACT_APP_RUNVIZ_CLIENT_ID
    const REACT_APP_RUNVIZ_CLIENT_SECRET = process.env.REACT_APP_RUNVIZ_CLIENT_SECRET

    const request = `https://www.strava.com/api/v3/oauth/token?client_id=${REACT_APP_RUNVIZ_CLIENT_ID}&client_secret=${REACT_APP_RUNVIZ_CLIENT_SECRET}&code=${authCode}&grant_type=authorization_code`
    // console.log(request)

    const response = await axios.post(request)
    return response.data
  } catch (error) {
    console.error(error)
  }
}
