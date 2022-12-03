import React, { Dispatch, useState, ReactNode, useEffect } from 'react'
import { createContext, useContext, useReducer } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/firebase'
import { AuthContext } from './AuthenticationContext'

export interface Props {
  children: React.ReactNode
}
export const ChatContext = createContext({
  data: {} as any,
  dispatch: {} as any,
})

const ChatContextProvider: React.FC<Props> = ({ children }) => {
  const INITIAL_STATE = {
    chatId: 'null',
    user: {},
  }
  const { currentUser } = useContext(AuthContext)
  console.log('🚀 ~ file: ChatContext.tsx:13 ~ currentUser', currentUser)

  const chatReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'CHANGE_USER':
        return {
          user: action.payload,
          chatId:
            currentUser && currentUser?.uid > action.payload.uid
              ? currentUser?.uid + action.payload.uid
              : action.payload.uid + currentUser?.uid,
        }
      default: {
        return state
      }
    }
  }

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  )
}
export default ChatContextProvider
