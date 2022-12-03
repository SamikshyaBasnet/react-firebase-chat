import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { AuthContext, Props } from '../context/AuthenticationContext'

export const ProtectedRoute = ({ children }: Props) => {
  const { currentUser } = useContext(AuthContext)
  const router = useRouter()

  if (!currentUser) {
    router.push('/login')
  } else {
    return children
  }
}
