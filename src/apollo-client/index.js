import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  concat
} from '@apollo/client/core'
import { authLink } from '@/apollo-client/apollo-links/auth-link'

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_API_URL
})

const cache = new InMemoryCache()

export default new ApolloClient({
  link: concat(authLink, httpLink),
  cache,
  connectToDevTools: import.meta.env.DEV
})
