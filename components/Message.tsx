import Image from 'next/image'
import React from 'react'

const Message = () => {
  return (
    <div className="message owner">
      <div className="messageInfo">
        <Image
          src={
            'https://images.unsplash.com/photo-1615022702095-ff2c036f3360?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwZ2lybHxlbnwwfHwwfHw%3D&w=1000&q=80'
          }
          alt="profile-imge"
          height={80}
          width={80}
        />
        <span>Just now</span>
        <div className="messageContent">
          <p>Hello</p>{' '}
          <Image
            src={
              'https://images.unsplash.com/photo-1615022702095-ff2c036f3360?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwZ2lybHxlbnwwfHwwfHw%3D&w=1000&q=80'
            }
            alt="profile-imge"
            height={280}
            width={180}
            className="img"
          />
        </div>
      </div>
    </div>
  )
}

export default Message
