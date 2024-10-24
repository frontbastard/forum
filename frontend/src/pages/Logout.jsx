import {useEffect} from 'react'
import api, {clearAuthTokens, redirectToLogin} from '../interceptors/api.js'

export const Logout = () => {
  useEffect(() => {
    const logout = async () => {
      try {
        await api.post('users/token/logout/')
      } catch (e) {
        console.log('Logout failed', e)
      } finally {
        clearAuthTokens()
        redirectToLogin()
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
