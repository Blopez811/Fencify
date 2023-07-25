import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Cookies from 'js-cookie'
import { AuthProvider } from '../components/AuthProvider'

function MyApp({ Component, pageProps }) {
  const httpLink = createHttpLink({
    uri: 'http://localhost:3001/graphql', // Update to your GraphQL server URI
    credentials: 'include',
    fetchOptions: {
      credentials: 'include'
    }
  });

  const authLink = setContext((_, { headers }) => {
    // Get the authentication token from local storage if it exists
    const token = Cookies.get('token'); 
    // Return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
   
  });

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ApolloProvider>
  );
}

export default MyApp;
