import { SessionProvider } from "next-auth/react";
import { Head } from "next/document";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <main className="font-sans">
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}

export default MyApp;
