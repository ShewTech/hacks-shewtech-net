import { createTheme, MantineProvider } from '@mantine/core';
import { type AppType } from 'next/dist/shared/lib/utils';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { MessengerProvider } from '~/components/Messenger';
import { Timer } from '~/components/Timer';

import { api } from '~/utils/api';

import '@mantine/core/styles.css';
import '~/styles/globals.css';

const theme = createTheme({
  primaryColor: 'green',
});

const MyApp: AppType = ({ Component, pageProps }) => {
  const [opener, setOpener] = useState(undefined);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const interval = setInterval(() => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setOpener(window.opener);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <MantineProvider theme={theme}>
      <Head>
        <title>Control Panel</title>
        <meta name="description" content="Web Exploit Injection Manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isClient &&
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        ((opener && typeof opener !== 'undefined') ||
        (typeof window !== 'undefined' && window.location.pathname === '/') ? (
          <MessengerProvider opener={opener!}>
            <Component {...pageProps} />
          </MessengerProvider>
        ) : (
          <>
            <h4>Lost connection to the window.</h4>
            <Timer startTime={5} event={window.close} />
          </>
        ))}
    </MantineProvider>
  );
};

export default api.withTRPC(MyApp);
