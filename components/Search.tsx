import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  SnapshotOptions,
  updateDoc,
  where,
} from '@firebase/firestore'
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { AuthContext, CurrentUserProps } from '../context/AuthenticationContext'
import { db } from '../firebase/firebase'
interface UserProps {
  username: string
  email: string
  photoURL: string
  DocumentData: any
  data: any
  uid: any
}
const Search = () => {
  const [userName, setUserName] = useState('')
  const [user, setUser] = useState<UserProps | DocumentData | null>(null)
  const [err, setErr] = useState<boolean>(false)
  const { currentUser } = useContext(AuthContext)
  const handleSearch = async () => {
    const q = query(collection(db, 'users'), where('username', '==', userName))
    try {
      const querySnapshot = await getDocs(q)

      querySnapshot.forEach((user) => {
        setUser(user.data())
      })
    } catch (err) {
      console.log('errr', err)
      setErr(true)
    }
  }
  const handleKey = (e: any) => {
    if (e.code === 'Enter') {
      handleSearch()
    }
  }

  const handleSelectUser = async () => {
    //check whether the group chats in the firebase exists
    const combinedId =
      currentUser.uid > user?.uid
        ? currentUser.uid + user?.uid
        : user?.uid + currentUser.uid

    try {
      const res = await getDoc(doc(db, 'chats', combinedId))
      console.log('🚀 ~ file: Search.tsx:58 ~ handleSelectUser ~ res', res)

      if (!res.exists()) {
        //create a chat collection
        await setDoc(doc(db, 'chats', combinedId), { messages: [] })

        //user chats
        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [combinedId + '.userInfo']: {
            uid: user?.uid,
            displayName: user?.username,
            photoURL: user?.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        })

        //other user chats
        await updateDoc(doc(db, 'userChats', user?.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUser?.uid,
            displayName: currentUser?.displayName,
            photoURL: currentUser?.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        })
      }
    } catch (err) {
      setErr(true)
    }

    setUser(null)
    setUserName('')
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
        <div className="userChat" onClick={() => handleSelectUser()}>
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
