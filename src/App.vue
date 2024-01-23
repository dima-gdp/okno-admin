<script setup>
import { isAppLoaded } from '@/application/global-refs'
import DefaultLayout from '@/layouts/default-layout.vue'
</script>

<template>
  <v-app>
    <DefaultLayout v-if="isAppLoaded">
      <RouterView />
    </DefaultLayout>
    <div class="d-flex align-center justify-center h-100" v-else>
      <v-progress-circular
        model-value="20"
        :size="86"
        :width="6"
        color="blue-lighten-3"
        indeterminate
      ></v-progress-circular>
    </div>
  </v-app>
</template>
