import { type AppType } from "next/app";
import { Inter } from "next/font/google";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { useState, useEffect } from "react";
import Head from "next/head";
import { Timer } from "~/components/Timer";

const inter = Inter({
  subsets: ["latin"],
});

const theme = createTheme({
  primaryColor: "green",
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
      <main className={inter.className}>
      <Head>
        <title>Control Panel</title>
        <meta name="description" content="Web Exploit Injection Manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isClient && (
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        opener && typeof opener !== "undefined" || (
          typeof window !== "undefined" && (
            window.location.pathname === "/"
          )
        )? <Component {...pageProps} /> : (
          <>
            <h4>Lost connection to the window.</h4>
            <Timer startTime={5} event={window.close} />
          </>
        )
      )}
    </main>
    </MantineProvider>
  );
};

export default api.withTRPC(MyApp);
