import axios from 'axios';
import {API_BASE} from '../constants/api.jsx';

// Get a token from localStorage or another storage location
const getAccessToken = () => localStorage.getItem('access');
const getRefreshToken = () => localStorage.getItem('refresh');

// Function for updating the token
const refreshToken = async () => {
  try {
    const refresh = getRefreshToken();
    const response = await axios.post(`${API_BASE}/users/token/refresh/`, { refresh });
    localStorage.setItem('access', response.data.access);
    return response.data.access;
  } catch (error) {
    console.error('Error refreshing token', error);
    return null;
  }
};

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE,
});

// Interceptor for adding a token to each request
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor for processing the response
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If the token has expired (401) and the request has not yet been repeated
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshToken();

      if (newAccessToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest); // Repeated request with an updated token
      } else {
        // If the token could not be updated, for example, the user is no longer authenticated

        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        window.location.href = '/login'; // Redirect to the login page
      }
    }

    return Promise.reject(error);
  }
);

export default api;
