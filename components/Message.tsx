import Image from 'next/image'
import React, { useRef, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthenticationContext'
import { ChatContext } from '../context/ChatContext'
import { timeago } from '../utils/timeago'

export interface MessageProps {
  message: {
    senderId: string
    text: string
    data: string
    date: any
    image?: string
  }
}

const Message = ({ message }: MessageProps) => {
  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(ChatContext)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ref?.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <div
      ref={ref}
      className={`message ${
        message.senderId === currentUser?.uid ? 'owner' : ''
      }`}
    >
      <div className="messageInfo">
        <Image
          src={
            message.senderId === currentUser?.uid
              ? currentUser.photoURL
              : data?.user?.photoURL
          }
          alt="profile-imge"
          height={80}
          width={80}
        />
        <span>{timeago(message.date.toDate())}</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>{' '}
        {message.image && (
          <Image
            src={message.image}
            alt="profile-imge"
            height={100}
            width={300}
            objectFit="cover"
            className="image-text"
          />
        )}
      </div>
    </div>
  )
}

export default Message
