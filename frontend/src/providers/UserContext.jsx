import {createContext, useState, useContext, useEffect} from 'react'
import api from '../interceptors/api.js'

const UserContext = createContext()

// eslint-disable-next-line react/prop-types
export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null)

  const updateUser = () => {
    api.get('/users/me/').then((response) => {
      setUser(response.data)
    })
  }

  useEffect(() => {
    updateUser()
  }, [])

  return (
    <UserContext.Provider value={[user, setUser, updateUser]}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
