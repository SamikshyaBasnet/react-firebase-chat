import Image from 'next/image'
import React from 'react'

const Search = () => {
  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder="Search" />
      </div>
      <div className="userChat">
        <Image
          src={
            'https://images.unsplash.com/photo-1615022702095-ff2c036f3360?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwZ2lybHxlbnwwfHwwfHw%3D&w=1000&q=80'
          }
          alt="profile-imge"
          height={80}
          width={80}
        />
        <div className="userChatInfo">
          <span>Mina</span>
        </div>
      </div>
    </div>
  )
}

export default Search
