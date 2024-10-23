import axios from 'axios'
import {USERS_API_BASE} from '../constants/api.jsx';

let refresh = false

axios.interceptors.response.use(
  res => res,
  async err => {
    if (err.response.status === 401 && !refresh) {
      refresh = true
      console.log(localStorage.getItem('refresh_token'))

      const response = await axios.post(
        `${USERS_API_BASE}/token/refresh/`,
        {refresh: localStorage.getItem('refresh_token')},
        {headers: {'Content-Type': 'application/json'}},
        {withCredentials: true},
      )

      if (response.status === 200) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data['access']}`
        localStorage.setItem('access_token', response.data.access)
        localStorage.setItem('refresh_token', response.data.refresh)
        return axios(err.config);
      }
    }
  }
)
