import { ref } from 'vue'
import { login } from '@/graphql/login.mutation.graphql'
import { useMutation } from '@vue/apollo-composable'
import { authTokenGlobal } from '@/application/auth-token-global'
import { useRouter } from 'vue-router'
import { me } from '@/graphql/me.query.graphql'

export default function useLogin() {
  const loginErrorText = ref('')
  const isLoading = ref(false)
  const loginForm = ref(null)

  const router = useRouter()
  const username = ref('')
  const password = ref('')

  const { mutate, onDone, onError } = useMutation(login, () => ({
    variables: { input: { login: username.value, password: password.value } },
    update: (cache, { data }) => {
      if (data?.login.user) {
        cache.writeQuery({
          query: me,
          data: { me: { ...data?.login.user } }
        })
      }
    }
  }))

  onDone((res) => {
    authTokenGlobal.value = res.data.login.token
    router.push({ name: 'home' })
    localStorage.setItem('X-AUTH-TOKEN', res.data.login.token)
  })

  onError(({ graphQLErrors }) => {
    const passwordError = graphQLErrors?.[0]?.extensions?.validation['input.password'][0]
    if (passwordError) {
      loginErrorText.value = passwordError
    }
  })

  async function onLogin() {
    try {
      loginErrorText.value = ''
      const { valid } = await loginForm.value.validate()
      if (!valid || isLoading.value) return
      isLoading.value = true
      await mutate()
    } catch (e) {
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  return {
    loginErrorText,
    onLogin,
    username,
    password,
    loginForm,
    isLoading
  }
}
