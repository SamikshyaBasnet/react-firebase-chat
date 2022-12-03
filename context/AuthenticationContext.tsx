import React, { useState, ReactNode, useEffect } from 'react'
import { createContext } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/firebase'
export interface CurrentUserProps {
  displayName: string
  email: string
  phoneNumber: string
  photoURL: string
  providerID: string
  uid: string
}
interface ContextProps {
  currentUser: CurrentUserProps
}
export interface Props {
  children: React.ReactNode | any
}
export const AuthContext = createContext({
  currentUser: {} as CurrentUserProps | undefined | any,
})

const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUserProps>()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user: any) => {
      setCurrentUser(user)
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
