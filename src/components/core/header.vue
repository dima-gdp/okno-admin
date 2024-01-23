<script setup>
import { useMutation, useQuery } from '@vue/apollo-composable'
import { computed } from 'vue'
import apolloClient from '@/apollo-client'
import { me } from '@/graphql/me.query.graphql'
import { resetToken } from '@/application/on-initial-check-user'
import { logout } from '@/graphql/logout.mutation.graphql'
import { IconLogo } from '@/components/icons'
import { getPublicAppUrl } from '@/application/header'
import { useRouter } from 'vue-router'
import { ROUTES_NAMES } from '@/utils/constants'

const { mutate, onDone } = useMutation(logout)
const router = useRouter()

onDone(async () => {
  resetToken()
  await apolloClient.clearStore()
  await router.push({ name: ROUTES_NAMES.LOGIN })
})

async function onLogout() {
  await mutate()
}
const { result: meQuery } = useQuery(me, {}, { fetchPolicy: 'cache-only' })
const user = computed(() => meQuery?.value?.me)

const publicAppUrl = getPublicAppUrl(window.location.origin)
</script>

<template>
  <header class="header">
    <v-container>
      <div class="d-flex align-center">
        <a class="header__logo" :href="publicAppUrl" target="_blank" v-if="user"><IconLogo /></a>
        <template v-if="user">
          <div class="nav">
            <ul>
              <li><v-btn to="/applications" variant="plain" exact>Заявки</v-btn></li>
              <li><v-btn to="/services" variant="plain" exact>Услуги</v-btn></li>
            </ul>
          </div>
          <v-spacer></v-spacer>
          <v-btn v-if="user" color="gray" variant="tonal" @click="onLogout">Выйти</v-btn>
        </template>
      </div>
    </v-container>
  </header>
</template>

<style lang="scss">
.header {
  &__logo {
    display: flex;
    width: 192px;
    color: #355084;
    margin-right: 80px;
  }
  .v-btn--active {
    color: rgba(0, 0, 0, 0.87);
  }
}

.nav {
  display: flex;
  align-items: center;
}

.nav ul {
  display: flex;
}

.nav li {
  list-style-type: none;
}

.nav a {
  color: #1976d2;
}
</style>
