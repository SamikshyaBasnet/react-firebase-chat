import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '../styles/style.scss'
import AuthContextProvider from '../context/AuthenticationContext'
import { ProtectedRoute } from '../utils/route'
export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  )
}
