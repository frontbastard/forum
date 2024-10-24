import {createContext, useState, useContext, useEffect} from 'react';
import api from '../interceptors/api.js';

const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get('/users/me/').then((response) => {
      setUser(response.data);
    });
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
