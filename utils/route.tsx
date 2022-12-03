import Router, { useRouter } from 'next/router'
import { useContext } from 'react'
import { AuthContext, Props } from '../context/AuthenticationContext'

export const ProtectedRoute = ({ children }: Props) => {
  const { currentUser } = useContext(AuthContext)
  const router = useRouter()
  if (!currentUser) {
    return router.push('/login')
  }
  return children
}
