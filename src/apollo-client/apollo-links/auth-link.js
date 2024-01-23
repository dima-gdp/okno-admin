import { ApolloLink } from '@apollo/client/core'
import { authTokenGlobal } from '@/application/auth-token-global'
import { BEARER_PREFIX } from '@/application/request-headers'

export const authLink = new ApolloLink((operation, forward) => {
  const token = authTokenGlobal.value
  if (token) {
    operation.setContext({
      headers: {
        authorization: `${BEARER_PREFIX} ${token}`
      }
    })
  }
  return forward(operation)
})
