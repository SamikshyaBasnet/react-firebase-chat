import { doc, getDoc, onSnapshot } from '@firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthenticationContext'
import { ChatContext } from '../context/ChatContext'
import { db } from '../firebase/firebase'
import Message from './Message'

const Messages = () => {
  const [messages, setMessages] = useState([])
  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(ChatContext)

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    })

    return () => {
      unSub()
    }
  }, [data.chatId])
  console.log('messages', messages)
  return (
    <div className="messages">
      {messages.map((message: any, index) => (
        <Message message={message} />
      ))}
    </div>
  )
}

export default Messages
