import { createRouter, createWebHistory } from 'vue-router'
import apolloClient from '@/apollo-client'
import { me } from '@/graphql/me.query.graphql'
import { isAppLoaded } from '@/application/global-refs'
import { onInitialCheckUser } from '@/application/on-initial-check-user'
import { ROUTES_NAMES } from '@/utils/constants'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/pages/index.vue'),
      redirect: '/applications'
    },
    {
      path: '/login',
      name: ROUTES_NAMES.LOGIN,
      component: () => import('../views/pages/login.vue'),
      meta: {
        isPublic: true
      }
    },
    {
      path: '/services',
      name: ROUTES_NAMES.SERVICES,
      component: () => import('../views/pages/services/index.vue')
    },
    {
      path: '/service/:id',
      name: ROUTES_NAMES.SERVICE_EDIT,
      component: () => import('../views/pages/services/edit/index.vue')
    },
    {
      path: '/service-create',
      name: ROUTES_NAMES.SERVICE_CREATE,
      component: () => import('../views/pages/services/create/index.vue')
    },
    {
      path: '/applications',
      name: ROUTES_NAMES.APPLICATIONS,
      component: () => import('../views/pages/applications/list/index.vue')
    },
    {
      path: '/application/:id',
      name: ROUTES_NAMES.APPLICATIONS_EDIT,
      component: () => import('../views/pages/applications/edit/index.vue')
    },
  ]
})

router.beforeEach(async (to) => {
  if (!isAppLoaded.value) {
    await onInitialCheckUser()
  }

  const meQuery = apolloClient.readQuery({
    query: me
  })

  if(!meQuery?.me && to.name !== ROUTES_NAMES.LOGIN) {
    return { name: ROUTES_NAMES.LOGIN }
  }

  if (meQuery?.me && to.name === ROUTES_NAMES.LOGIN) {
    return { name: ROUTES_NAMES.APPLICATIONS }
  }

  return true
})

export default router
