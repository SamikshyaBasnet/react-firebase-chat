import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import Register from './register'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthenticationContext'
import Router from 'next/router'
import { ProtectedRoute } from '../utils/route'

const Home: NextPage = () => {
  const { currentUser } = useContext(AuthContext)
  console.log('🚀 ~ file: index.tsx:13 ~ currentUser', currentUser)

  return (
    // <ProtectedRoute>
    <div className="home">
      <div className="home--container">
        <Sidebar />
        <Chat />
      </div>
    </div>
    // </ProtectedRoute>
  )
}

export default Home
