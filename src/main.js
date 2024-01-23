import { createApp, provide, h } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { abilitiesPlugin } from '@casl/vue'
import { ability } from './plugins/ability'
import vuetify from './plugins/vuetify'
import apolloClient from './apollo-client'
import App from './App.vue'
import router from './router'


const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App)
})

app.use(router)
app.use(vuetify)
app.use(abilitiesPlugin, ability, {
  useGlobalProperties: true
})

app.mount('#app')
