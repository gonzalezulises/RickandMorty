import type { AppProps } from 'next/app'
import { FavProvider } from "../context/FavContext";
import '../styles/theme.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
   <FavProvider>
      <Component {...pageProps} />
   </FavProvider>
  ) 
}

export default MyApp
