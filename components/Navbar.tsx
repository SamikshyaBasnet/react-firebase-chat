import Image from 'next/image'
import React, { useContext } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/firebase'
import { Router, useRouter } from 'next/router'
import { AuthContext } from '../context/AuthenticationContext'

const Navbar = () => {
  const router = useRouter()
  const { currentUser } = useContext(AuthContext)
  return (
    <div className="navbar">
      <span className="logo">Eney Meeny Chat</span>
      <div className="user">
        <Image
          src={currentUser?.photoURL}
          alt="profile-imge"
          height={100}
          width={100}
        />
        <span>{currentUser?.displayName}</span>
        <button
          style={{ height: '1.7rem' }}
          onClick={() => {
            signOut(auth)
            router.push('/login')
          }}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar
