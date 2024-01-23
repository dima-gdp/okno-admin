<script setup>
import { computed, defineComponent, ref } from 'vue'
import ServiceForm from '@/views/pages/services/components/service-form.vue'
import { useRouter, useRoute } from 'vue-router'
import { Service } from '@/graphql/service.query.graphql'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { ROUTES_NAMES } from '@/utils/constants'
import { UpdateService } from '@/graphql/service-update.mutation.graphql'
import { DeleteService } from '@/graphql/service-delete.mutation.graphql'

defineComponent({
  components: { ServiceForm }
})

const router = useRouter()
const route = useRoute()
const isLoading = ref(false)

const { result, loading, onResult } = useQuery(
  Service,
  { id: route.params.id },
  { fetchPolicy: 'network-only' }
)
const serviceForm = computed(() => result.value?.service)
onResult(({ data }) => {
  if (!data?.service) {
    router.push({ name: ROUTES_NAMES.SERVICES })
  }
})

async function onSave(serviceForm) {
  try {
    isLoading.value = true
    const { mutate } = useMutation(UpdateService, () => ({
      variables: {
        input: {
          id: serviceForm.id,
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

const isModalShown = ref(false)

function onClickDelete() {
  isModalShown.value = true
}

async function onDelete() {
  try {
    isLoading.value = true
    const { mutate } = useMutation(DeleteService, () => ({
      variables: { id: serviceForm.value.id }
    }))
    await mutate()
    await router.push({ name: ROUTES_NAMES.SERVICES })
  } catch (e) {
    console.error(e)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div>
    <v-container>
      <h1>Разработка проектной документации</h1>
    </v-container>
    <div v-if="loading" class="d-flex justify-center mt-16">
      <v-progress-circular
        model-value="20"
        :size="86"
        :width="6"
        color="blue-grey-darken-3"
        indeterminate
      ></v-progress-circular>
    </div>
    <v-container v-else>
      <ServiceForm
        :form="serviceForm"
        @save="onSave"
        @cancel="onCancel"
        @delete="onClickDelete"
        :is-loading="isLoading"
      />

      <v-dialog v-model="isModalShown" width="700">
        <v-card>
          <v-card-title>Удаление услуги</v-card-title>
          <v-card-text>
            Внимание, вы удаляете услугу «Разработка проектной документации». Вы уверены что хотите
            удалить эту услугу? Это действие нельзя отменить.
          </v-card-text>
          <v-card-actions>
            <div class="d-flex align-center">
              <v-btn variant="plain" class="bg-red-accent-2 mr-6" @click="onDelete"
                >Удалить услугу</v-btn
              >
              <v-btn color="blue-darken-2" variant="text" @click="isModalShown = false"
                >Отменить</v-btn
              >
            </div>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<style lang="scss"></style>
