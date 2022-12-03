import Image from 'next/image'
import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/firebase'
import { Router, useRouter } from 'next/router'

const Navbar = () => {
  const router = useRouter()
  return (
    <div className="navbar">
      <span className="logo">Eney Meeny Chat</span>
      <div className="user">
        <Image
          src={
            'https://images.unsplash.com/photo-1615022702095-ff2c036f3360?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwZ2lybHxlbnwwfHwwfHw%3D&w=1000&q=80'
          }
          alt="profile-imge"
          height={100}
          width={100}
        />
        <span>Sammy</span>
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
