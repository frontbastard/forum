import axios from 'axios'
import {API_BASE} from '../constants/api.jsx'

// Get a token from localStorage
const getAccessToken = () => localStorage.getItem('access')
const getRefreshToken = () => localStorage.getItem('refresh')

// Set a token to localStorage
export const setAccessToken = (access) => localStorage.setItem('access', access)
export const setRefreshToken = (refresh) => localStorage.setItem('refresh', refresh)

export const clearAuthTokens = () => {
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')
}

export const redirectToLogin = () => {
  if (window.location.pathname !== '/login') {
    window.location.href = '/login'
  }
}

// Validate the token
const tokenVerify = async token => {
  try {
    await axios.post(`${API_BASE}/users/token/verify/`, {token})
    return true
  } catch (e) {
    return false
  }
}

// Function for updating the token
const refreshToken = async () => {
  try {
    const refresh = getRefreshToken()
    const isRefreshTokenValid = tokenVerify(refresh)

    if (!isRefreshTokenValid) {
      throw new Error('Refresh token is invalid')
    }

    const response = await axios.post(`${API_BASE}/users/token/refresh/`, {refresh})
    setAccessToken(response.data.access)
    return response.data.access
  } catch (error) {
    console.error('Error refreshing token', error)
    return null
  }
}

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE,
})

// Interceptor for adding a token to each request
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor for processing the response
api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    // If the token has expired (401) and the request has not yet been repeated
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const newAccessToken = await refreshToken()

      if (newAccessToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`
        return api(originalRequest) // Repeated request with an updated token
      } else {
        // If the token could not be updated, for example, the user is no longer authenticated
        clearAuthTokens()
        redirectToLogin()
      }
    }

    return Promise.reject(error)
  }
)

export default api
