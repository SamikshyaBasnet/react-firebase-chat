import type { AppProps } from 'next/app'
import '../styles/style.scss'
import AuthContextProvider from '../context/AuthenticationContext'
import { ProtectedRoute } from '../utils/route'
import ChatContextProvider from '../context/ChatContext'
export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <ChatContextProvider>
        <Component {...pageProps} />
      </ChatContextProvider>
    </AuthContextProvider>
  )
}
