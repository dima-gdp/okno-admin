<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Application } from '@/graphql/application.query.graphql'
import { ApplicationService } from '@/graphql/application-service.query.graphql'
import { UpdateApplication } from '@/graphql/application-update.mutation.graphql'
import { UpdateApplicationService } from '@/graphql/application-service-update.mutation.graphql'
import { useQuery, useMutation } from '@vue/apollo-composable'
import { ROUTES_NAMES } from '@/utils/constants'
import SavePanel from '@/components/save-panel.vue'
import { APPLICATIONS_STATUSES } from '@/domain/applications'
import { emailRule, integerRule, requiredRule } from '@/application/vuetify-validation'
import { mask as vMask } from 'vue-the-mask'
import ServicesTable from '@/views/pages/services/components/servicesTable.vue'
import {
  APPLICATION_SERVICE_HEADERS,
  getFormattedApplicationServices
} from '@/domain/application-service'
import { formattedApplications } from '@/domain/application'
import { InputApplicationServiceEnum, SqlOperator } from '../../../../../schema-types.ts'

const router = useRouter()
const route = useRoute()
const isLoading = ref(false)
const formEl = ref(null)

const innRules = [integerRule]
const phoneRules = [requiredRule]
const emailRules = [emailRule]
const fioRules = [requiredRule]

const { loading, onResult } = useQuery(
  Application,
  { id: route.params.id },
  { fetchPolicy: 'network-only' }
)

const { result: applicationServicesList, loadingService } = useQuery(
  ApplicationService,
  {
    first: 0,
    where: {
      HAS: {
        relation: 'application',
        condition: {
          column: InputApplicationServiceEnum.Id,
          operator: SqlOperator.Eq,
          value: route.params.id
        }
      }
    }
  },
  { fetchPolicy: 'network-only' }
)

const applicationForm = ref({
  id: '',
  inn: '',
  email: '',
  fio: '',
  phone: '',
  created_at: '',
  comment: '',
  status: ''
})

onResult(({ data }) => {
  if (data?.application) {
    const formattedApplication = formattedApplications({ ...data?.application })
    applicationForm.value = structuredClone(formattedApplication)
  } else {
    router.push({ name: ROUTES_NAMES.SERVICES })
  }
})

const hasAction = ref(false)

const applicationServices = computed(() =>
  getFormattedApplicationServices(applicationServicesList?.value?.applicationService?.data)
)

const isModalShown = ref(false)

function onCancel() {
  router.push({ name: ROUTES_NAMES.APPLICATIONS })
}

function onClickDelete() {
  isModalShown.value = true
}

async function onSave() {
  try {
    isLoading.value = true
    const { mutate } = useMutation(UpdateApplication, () => ({
      variables: {
        input: {
          id: applicationForm.value.id,
          status: applicationForm.value.status,
          inn: applicationForm.value.inn,
          phone: applicationForm.value.phone,
          email: applicationForm.value.email,
          fio: applicationForm.value.fio,
          comment: applicationForm.value.comment,
          service_cost: applicationForm.value.service_cost
        }
      }
    }))
    await mutate()
    await router.push({ name: ROUTES_NAMES.APPLICATIONS })
  } catch (e) {
    console.error(e)
  } finally {
    isLoading.value = false
  }
}

async function updateApplicationService(applicationService) {
  try {
    const { mutate } = useMutation(UpdateApplicationService, () => ({
      variables: {
        input: {
          id: applicationService.id,
          is_selected: !applicationService.is_active,
          sort: applicationService.sort,
          name: applicationService.name
        }
      }
    }))
    await mutate()
  } catch (e) {
    console.error(e)
  }
}
const updateStatusService = async (service) => {
  await updateApplicationService(service)
}
</script>

<template>
  <div>
    <v-container>
      <h1>Заявка №{{ route.params.id }}</h1>
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
      <v-form ref="formEl">
        <v-row>
          <v-col cols="3" sm="2">
            <v-text-field
              v-model="applicationForm.id"
              label="ID"
              disabled
              type="number"
              variant="outlined"
            />
          </v-col>
          <v-col cols="8" sm="6" md="4">
            <v-select
              v-model="applicationForm.status"
              :items="APPLICATIONS_STATUSES"
              item-title="label"
              item-value="value"
              label="Статус заявки"
              variant="outlined"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" sm="4" md="4">
            <v-text-field
              v-model="applicationForm.created_at"
              label="Дата создания"
              disabled
              clearable
              variant="outlined"
            />
          </v-col>
        </v-row>
        <h2 class="mt-12 mb-4">Информация о пользователе</h2>
        <v-row>
          <v-col cols="7">
            <v-text-field
              v-model="applicationForm.inn"
              label="ИНН организации"
              :rules="innRules"
              variant="outlined"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="8">
            <v-text-field
              v-mask="'+7 (###) ###-##-##'"
              v-model="applicationForm.phone"
              label="Телефон заявителя *"
              :rules="phoneRules"
              variant="outlined"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="8">
            <v-text-field
              v-model="applicationForm.email"
              label="E-mail заявителя"
              :rules="emailRules"
              variant="outlined"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="11">
            <v-text-field
              v-model="applicationForm.fio"
              label="ФИО *"
              :rules="fioRules"
              variant="outlined"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="11">
            <v-textarea
              v-model="applicationForm.comment"
              label="Комментарий к заявке"
              variant="outlined"
            />
          </v-col>
        </v-row>
        <div class="mt-15">
          <h2>Список услуг</h2>
          <div v-if="loadingService" class="d-flex justify-center mt-16">
            <v-progress-circular
              model-value="20"
              :size="86"
              :width="6"
              color="blue-grey-darken-3"
              indeterminate
            ></v-progress-circular>
          </div>
          <ServicesTable
            :headers="APPLICATION_SERVICE_HEADERS"
            :items="applicationServices"
            :is-loading="loadingService"
            :hasAction="hasAction"
            @update-status="updateStatusService"
          >
          </ServicesTable>
        </div>
        <div class="mt-12">
          <SavePanel
            @save="onSave"
            :disabled="isLoading"
            @cancel="onCancel"
            @delete="onClickDelete"
          />
        </div>
      </v-form>

      <v-dialog v-model="isModalShown" width="700">
        <v-card>
          <v-card-title>Удаление заявки</v-card-title>
          <v-card-text>
            Внимание, вы удаляете заявку №00234. Вы уверены что хотите удалить эту заявку? Это
            действие нельзя отменить.
          </v-card-text>
          <v-card-actions>
            <div class="d-flex align-center">
              <v-btn variant="plain" class="bg-red-accent-2 mr-6">Удалить заявку</v-btn>
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
