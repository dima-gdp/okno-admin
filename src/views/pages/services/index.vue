<script setup>
import ServicesTable from '@/views/pages/services/components/servicesTable.vue'
import { computed, ref } from 'vue'
import { ServicesList } from '@/graphql/services.query.graphql'
import { UpdateService } from '@/graphql/service-update.mutation.graphql'
import { useMutation, useQuery } from '@vue/apollo-composable'
import { getFormattedServices, SERVICES_HEADERS } from '@/domain/services'
import router from '@/router'
import { ROUTES_NAMES } from '@/utils/constants'
import { QueryServicesOrderByColumn, SortOrder } from '../../../../schema-types.ts'

const hasAction = ref(true)

const { result: servicesList, loading } = useQuery(
  ServicesList,
  { first: 0, orderBy: [{ column: QueryServicesOrderByColumn.Sort, order: SortOrder.Desc }] },
  { fetchPolicy: 'network-only' }
)

const services = computed(() => getFormattedServices(servicesList?.value?.services?.data))

async function updateService(service) {
  try {
    const { mutate } = useMutation(UpdateService, () => ({
      variables: {
        input: {
          id: service.id,
          is_active: !service.is_active,
          sort: Number(service.sort),
          name: service.name
        }
      }
    }))
    await mutate()
  } catch (e) {
    console.error(e)
  }
}

const updateStatus = async (service) => {
  await updateService(service)
}

function redirectToCreate() {
  router.push({ name: ROUTES_NAMES.SERVICE_CREATE })
}
</script>

<template>
  <v-container>
    <div class="services-page">
      <div class="services-page__info">
        <h1 class="services-page__title">Услуги</h1>
        <v-btn color="gray" variant="tonal" @click="redirectToCreate">Создать услугу</v-btn>
      </div>
      <div>
        <div v-if="loading" class="d-flex justify-center mt-16">
          <v-progress-circular
            model-value="20"
            :size="86"
            :width="6"
            color="blue-grey-darken-3"
            indeterminate
          ></v-progress-circular>
        </div>
        <ServicesTable
          :headers="SERVICES_HEADERS"
          :items="services"
          :is-loading="loading"
          :hasAction="hasAction"
          @update-status="updateStatus"
        />
      </div>
    </div>
  </v-container>
</template>

<style lang="scss">
.services-page {
  &__info {
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: space-between;
    margin: 60px 0 30px 0;
  }

  &__title {
    font-size: 48px;
  }
}
</style>
