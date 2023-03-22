import "@styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import { QueryClientProvider, QueryClient } from 'react-query'

// Create a client
const queryClient = new QueryClient()


export default function App({ Component, pageProps }: AppProps) {
  return <>

    <Head>
      <title>Rider App</title>
      <meta name="description" content="Generated by create next app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/a-icon.webp" />
    </Head>

    <Toaster
      position="top-right"
      reverseOrder={false}
    />

    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  </>
}
