import { faFileImage } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import Link from 'next/link'
import { auth, storage } from '../firebase/firebase'
import { NextPage } from 'next'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { useRouter } from 'next/router'

const Register: NextPage = () => {
  interface Error {
    code: number
    message: string
    errors: Array<{
      message: string
      domain: string
      reason: string
    }>
  }
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [file, setFile] = useState<any>()
  const [error, setError] = useState<Error>()

  const router = useRouter()
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      // Upload file and metadata to the object 'images/mountains.jpg'
      const date = new Date().getTime()
      const storageRef = ref(storage, `${username + date}`)
      // Listen for state changes, errors, and completion of the upload.
      uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateProfile(res.user, {
            displayName: username,
            photoURL: downloadURL,
          })
          await setDoc(doc(db, 'users', res.user.uid), {
            uid: res.user.uid,
            username,
            email,
            photoURL: downloadURL,
          })
          await setDoc(doc(db, 'userChats', res.user.uid), {})
          router.push('/')
        })
      })
    } catch (error) {
      //setError(error)
    }
  }

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Enney meeny Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              name="username"
              required
              type="text"
              placeholder="display name"
            />
            <input
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              placeholder="email"
            />
            <input
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              placeholder="password"
            />
            <input
              name="file"
              style={{ display: 'none' }}
              type="file"
              id="file"
              onChange={(e: any) => {
                setFile(e.target.files[0])
              }}
            />
            <label htmlFor="file">
              {/* <img src={Add} alt="" /> */}
              <FontAwesomeIcon icon={faFileImage} /> <span>Add an avatar</span>
            </label>
            {error && error}
            <button
            //disabled={loading}
            >
              Sign up
            </button>
            {/* {loading && 'Uploading and compressing the image please wait...'} */}
            {/* {err && <span>Something went wrong</span>} */}
          </>
        </form>
        <p>
          You do have an account? <Link href="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
