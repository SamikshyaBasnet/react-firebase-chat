import {
  faCamera,
  faUserPlus,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Input from './Input'
import Messages from './Messages'

const Chat = () => {
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>Mina</span>
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
