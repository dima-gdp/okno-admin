<script setup>
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import { ApplicationsList } from '@/graphql/applications.query.graphql'
import { useQuery } from '@vue/apollo-composable'
import { computed, ref } from 'vue'
import { APPLICATIONS_HEADER, formattedApplications } from '@/domain/applications'
import { InputApplicationsEnum, SortOrder } from '../../../../../schema-types.ts'

const {
  result: applicationsList,
  loading,
  fetchMore
} = useQuery(
  ApplicationsList,
  { first: 25, page: 1, orderBy: [{ column: InputApplicationsEnum.Id, order: SortOrder.Desc }] },
  { fetchPolicy: 'network-only' }
)

const applications = computed(() =>
  formattedApplications(applicationsList?.value?.applications?.data)
)
const paginatorInfo = computed(() => applicationsList?.value?.applications?.paginatorInfo)

const pagination = ref({
  page: 1,
  first: 25
})

async function changePerPage(perPage) {
  pagination.value.first = perPage
  pagination.value.page = 1

  await fetchMore({
    variables: {
      first: pagination.value.first,
      page: pagination.value.page
    },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      if (!fetchMoreResult) return previousResult

      return {
        ...previousResult,
        applications: {
          ...previousResult.applications,
          data: [...fetchMoreResult.applications.data]
        }
      }
    }
  })
}

async function changePage(page) {
  pagination.value.page = page

  await fetchMore({
    variables: {
      first: pagination.value.first,
      page: pagination.value.page
    },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      if (!fetchMoreResult) return previousResult

      return {
        ...previousResult,
        applications: {
          ...previousResult.applications,
          data: [...fetchMoreResult.applications.data]
        }
      }
    }
  })
}
</script>

<template>
  <v-container>
    <div class="applications-page">
      <h1 class="applications-page__title">Заявки</h1>
      <div v-if="loading" class="d-flex justify-center mt-16">
        <v-progress-circular
          model-value="20"
          :size="86"
          :width="6"
          color="blue-grey-darken-3"
          indeterminate
        ></v-progress-circular>
      </div>
      <v-data-table-server
        :headers="APPLICATIONS_HEADER"
        :items="applications"
        :items-per-page="pagination.first"
        :loading="loading"
        :items-length="paginatorInfo?.total"
        item-key="name"
        @update:itemsPerPage="changePerPage"
        @update:page="changePage"
      >
        <template #[`item.status`]="{ item }">
          <span :style="item.raw.status.style">{{ item.raw.status.label }}</span>
        </template>
        <template #[`item.action`]="{ item }">
          <router-link :to="`/application/${item.raw.id}`">
            <v-icon icon="mdi-pencil" />
          </router-link>
        </template>
      </v-data-table-server>
    </div>
  </v-container>
</template>

<style lang="scss">
.applications-page {
  &__title {
    font-size: 48px;
    margin: 60px 0 30px 0;
  }

  .v-table__wrapper {
    overflow: hidden !important;
  }
}
</style>
