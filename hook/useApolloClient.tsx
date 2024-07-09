import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { useSession } from 'next-auth/react';

const useApolloClient = () => {
  const { data: session } = useSession();

  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/',
    headers: {
      'next-auth.session-token': session?.sessionToken ?? '',
    },
  });

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });

  return { client };
};

export { useApolloClient };
