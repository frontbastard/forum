import { useEffect } from 'react'
import axios from 'axios'

export const Logout = () => {
  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post(
          'http://localhost:8000/logout/',
          {
            refresh_token: localStorage.getItem('refresh_token')
          },
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          }
        )

        localStorage.clear()
        delete axios.defaults.headers.common['Authorization']
        window.location.href = '/login'
      } catch (e) {
        console.log('Logout failed', e)
      }
    }

    logout()
  }, [])

  return <div></div>
}
