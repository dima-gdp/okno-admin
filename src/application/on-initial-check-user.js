import { authTokenGlobal, isAuthTokenChecked } from '@/application/auth-token-global'
import { AUTH_TOKEN_NAME } from '@/utils/constants'
import { provideApolloClient, useQuery } from '@vue/apollo-composable'
import { me } from '@/graphql/me.query.graphql'
import { isAppLoaded } from '@/application/global-refs'
import apolloClient from '@/apollo-client'

provideApolloClient(apolloClient)

export function resetToken() {
  authTokenGlobal.value = ''
  localStorage.removeItem('X-AUTH-TOKEN')
}

/**
 * @param {User} me
 */
function onResultMeQuery(me) {
  if (!me?.id) {
    resetToken()
  }
}

/**
 * Если есть токен, пробует достать пользователя
 * @returns {Promise}
 */
export async function onInitialCheckUser() {
  try {
    authTokenGlobal.value = localStorage.getItem(AUTH_TOKEN_NAME)
    isAuthTokenChecked.value = true
    if (authTokenGlobal.value) {
      await new Promise((resolve) => {
        const { onResult, onError } = useQuery(me)
        onResult(({ data }) => {
          onResultMeQuery(data.me)
          resolve()
        })
        onError(() => {
          resetToken()
          resolve()
        })
      })
    }
  } catch (e) {
    resetToken()
    localStorage.removeItem('X-AUTH-TOKEN')
  } finally {
    isAppLoaded.value = true
  }
}
