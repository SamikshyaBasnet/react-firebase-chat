import {
  faCamera,
  faUserPlus,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'
import Input from './Input'
import Messages from './Messages'

const Chat = () => {
  const { data } = useContext(ChatContext)
  console.log('🚀 ~ file: Chat.tsx:14 ~ Chat ~ data', data)

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <FontAwesomeIcon icon={faCamera} className="icon" />
          <FontAwesomeIcon icon={faUserPlus} className="icon" />
          <FontAwesomeIcon icon={faEllipsisVertical} className="icon" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat
