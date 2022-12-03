import { NextPage } from 'next'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthenticationContext'
import { ProtectedRoute } from '../utils/route'

const Home: NextPage = () => {
  const { currentUser } = useContext(AuthContext)
  console.log('🚀 ~ file: index.tsx:13 ~ currentUser', currentUser)

  return (
    <ProtectedRoute>
      <div className="home">
        <div className="home--container">
          <Sidebar />
          <Chat />
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default Home
