import React, { useState, ReactNode, useEffect } from 'react'
import { createContext } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/firebase'
export const AuthContext = createContext({
  currentUser: {},
})

const AuthContextProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user: any) => {
      setCurrentUser(user)
      console.log(currentUser)
    })
    return () => {
      unsub()
    }
  }, [])
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}
export default AuthContextProvider
