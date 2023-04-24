import { Navbar } from '@/components/shared';
import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/global.css';
import StoreProvider from 'lib/StoreProvider';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>CORB | Creative Co-Working Space Room Booking</title>
        <meta
          name="description"
          content="Creative Co-Working Space Room Booking"
        />
        <meta name="author" content="CORB" />
        <link rel="shortcut icon" href="/images/it_logo.png" />
      </Head>
      <main className="app">
        <StoreProvider {...pageProps.initialZustandState}>
          <Navbar>
            <Component {...pageProps} />
          </Navbar>
        </StoreProvider>
      </main>
    </>
  );
}

export default CustomApp;
