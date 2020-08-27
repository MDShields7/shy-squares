import ContextProvider from '../components/contextAPI/ContextProvider';
import '../styles/global.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  )
}