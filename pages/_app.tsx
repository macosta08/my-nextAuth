{
  /** Set the dateAdapter prop of the LocalizationProvider to handle date inputs from @mui/x-date-pickers */
}
import Router from 'next/router';
import NProgress from 'nprogress';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import { useApolloClient } from '@/hooks/useApolloClient';
import { ApolloProvider } from '@apollo/client';

// Styles generals
import '@/styles/globals.scss';
import 'nprogress/nprogress.css';
import 'react-toastify/dist/ReactToastify.css';

// Import of customized components
import { LayoutRouter } from '@/layout/index';
import { Toaster } from '@/components/AtomicDesign/Atoms/Shadcn/toaster';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
  ...props
}: AppProps) => (
  <SessionProvider session={session} refetchOnWindowFocus={false}>
    <Head>
      <title>{`${pageProps?.page?.name ? pageProps?.page?.name : 'Derick'} | Derick`}</title>
    </Head>
    <App Component={Component} pageProps={pageProps} {...props} />
  </SessionProvider>
);

const App = ({ Component, pageProps }: AppProps) => {
  const { client } = useApolloClient();

  return (
    <ApolloProvider client={client}>
      <LayoutRouter
        rejected={pageProps?.rejected}
        isPublic={pageProps?.isPublic}
      >
        <Component {...pageProps} />
        {/** Shadcn toast implementation */}
        <Toaster />
      </LayoutRouter>
    </ApolloProvider>
  );
};

export default MyApp;
