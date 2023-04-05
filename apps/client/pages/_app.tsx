import { Navbar } from '@/components/shared';
import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/global.css';

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
        <Navbar>
          <Component {...pageProps} />
        </Navbar>
      </main>
    </>
  );
}

export default CustomApp;
