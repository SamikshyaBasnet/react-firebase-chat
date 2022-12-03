import {
  collection,
  DocumentData,
  getDocs,
  query,
  SnapshotOptions,
  where,
} from '@firebase/firestore'
import Image from 'next/image'
import React, { useState } from 'react'
import { CurrentUserProps } from '../context/AuthenticationContext'
import { db } from '../firebase/firebase'
interface UserProps {
  username: string
  email: string
  photoURL: string
  DocumentData: any
  data: any
}
const Search = () => {
  const [userName, setUserName] = useState('')
  const [user, setUser] = useState<UserProps | DocumentData>()
  const [err, setErr] = useState<boolean>(false)

  const handleSearch = async () => {
    const q = query(collection(db, 'users'), where('username', '==', userName))
    try {
      const querySnapshot = await getDocs(q)

      querySnapshot.forEach((user) => {
        console.log('found data', user)
        setUser(user.data())
      })
    } catch (err) {
      console.log('errr', err)
      setErr(true)
    }
  }
  const handleKey = (e: any) => {
    console.log('ASdfasdf')

    if (e.code === 'Enter') {
      handleSearch()
    }
  }
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Search"
          onKeyDown={handleKey}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      {err && <span>Not found</span>}
      {user && (
        <div className="userChat">
          <Image
            src={user?.photoURL}
            alt="profile-imge"
            height={80}
            width={80}
          />
          <div className="userChatInfo">
            <span>{user?.username}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Search
