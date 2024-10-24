import {useEffect} from 'react'
import api from '../interceptors/api.js';

export const Logout = () => {
  useEffect(() => {
    const logout = async () => {
      try {
        await api.post('users/token/logout/')
      } catch (e) {
        console.log('Logout failed', e)
      } finally {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        window.location.href = '/login'
      }
    }

    logout()
  }, [])

  return (
    <div>
      <p>Logging out...</p>
    </div>
  )
}
