import { faFile, faImage } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import React, { useContext, useState } from 'react'
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from '@firebase/firestore'
import { v4 as uuid } from 'uuid'
import { db, storage } from '../firebase/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { ChatContext } from '../context/ChatContext'
import { AuthContext } from '../context/AuthenticationContext'

const Input = () => {
  const [text, setText] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const { currentUser } = useContext(AuthContext)
  const [error, setError] = useState(false)
  const { data } = useContext(ChatContext)

  const handleSend = async () => {
    if (image) {
      const storageRef = ref(storage, uuid())
      uploadBytesResumable(storageRef, image).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateDoc(doc(db, 'chats', data.chatId), {
            messages: arrayUnion({
              id: Math.random() * 1000,
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
              image: downloadURL,
            }),
          })
        })
      })
    } else {
      await updateDoc(doc(db, 'chats', data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      })
    }
    await updateDoc(doc(db, 'userChats', currentUser.uid), {
      [data.chatId + '.lastMessage']: {
        text,
      },
      [data.chatId + '.date']: serverTimestamp(),
    })

    await updateDoc(doc(db, 'userChats', data.user.uid), {
      [data.chatId + '.lastMessage']: {
        text,
      },
      [data.chatId + '.date']: serverTimestamp(),
    })
    setText('')
    setImage(null)
  }

  return (
    <div className="input">
      <input
        value={text}
        type="text"
        placeholder="Type message..."
        onChange={(e) => setText(e.target.value)}
      />
      <div className="send">
        <FontAwesomeIcon icon={faLink} className="icon" />
        <input
          type="file"
          onChange={(e: any) => setImage(e?.target?.files[0])}
          style={{ display: 'none' }}
          id="file"
        />
        <label htmlFor="file">
          <FontAwesomeIcon icon={faImage} />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Input
