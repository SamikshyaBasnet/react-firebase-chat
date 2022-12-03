import Router, { useRouter } from 'next/router'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthenticationContext'

export const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext)
  const router = useRouter()
  if (!currentUser) {
    router.push('/login')
  }
}
