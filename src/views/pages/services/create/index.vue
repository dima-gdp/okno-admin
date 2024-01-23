<script setup>
import { defineComponent, ref } from 'vue'
import ServiceForm from '@/views/pages/services/components/service-form.vue'
import { useMutation } from '@vue/apollo-composable'
import { CreateService } from '@/graphql/service-create.mutation.graphql'
import { useRouter } from 'vue-router'
import { ROUTES_NAMES } from '@/utils/constants'

defineComponent({
  components: { ServiceForm }
})

const router = useRouter()
const isLoading = ref(false)

async function onSave(serviceForm) {
  try {
    isLoading.value = true
    const { mutate } = useMutation(CreateService, () => ({
      variables: {
        input: {
          is_active: serviceForm.is_active,
          sort: Number(serviceForm.sort),
          name: serviceForm.name,
          description: serviceForm.description,
          cost: Number(serviceForm.cost) || null
        }
      }
    }))
    await mutate()
    await router.push({ name: ROUTES_NAMES.SERVICES })
  } catch (e) {
    console.error(e)
  } finally {
    isLoading.value = false
  }
}

function onCancel() {
  router.push({ name: ROUTES_NAMES.SERVICES })
}
</script>

<template>
  <div>
    <v-container>
      <h1>Разработка проектной документации</h1>
    </v-container>
    <v-container>
      <ServiceForm @save="onSave" @cancel="onCancel" @delete="onCancel" :is-loading="isLoading" />
    </v-container>
  </div>
</template>
