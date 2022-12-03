import { doc, DocumentData, onSnapshot } from '@firebase/firestore'
import Image from 'next/image'
import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthenticationContext'
import { ChatContext } from '../context/ChatContext'
import { db } from '../firebase/firebase'

const Chats = () => {
  const [chats, setChats] = useState<DocumentData | undefined | null>([])
  const { currentUser } = useContext(AuthContext)
  const { dispatch } = useContext(ChatContext)

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(
        doc(db, 'userChats', currentUser?.uid),
        (doc) => {
          console.log('cir da', doc.data())
          setChats(doc.data())
        },
      )
      return () => {
        unsub()
      }
    }
    currentUser?.uid && getChats()
  }, [currentUser?.uid])
  const handleSelectUser = (user: any) => {
    dispatch({ type: 'CHANGE_USER', payload: user })
  }
  return (
    <div className="chats">
      {Object.entries(chats ? chats : {})
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat, index) => (
          <div
            className="userChat"
            key={chat[0]}
            onClick={() => handleSelectUser(chat[1].userInfo)}
          >
            <Image
              src={chat[1].userInfo.photoURL}
              alt="profile-image"
              height={80}
              width={80}
            />
            <div className="userChatInfo">
              <span>{chat[1].userInfo.displayName}</span>
              <p>{chat[1].lastMessage?.text}</p>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Chats
