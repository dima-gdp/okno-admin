<script setup>
import { ref, watch } from 'vue'
import { requiredRule, integerRule } from '@/application/vuetify-validation'
import SavePanel from '@/components/save-panel.vue'

const props = defineProps({
  form: { type: Object, default: () => ({}) },
  isEdit: { type: Boolean, default: false },
  isLoading: { type: Boolean, default: false }
})

const emit = defineEmits(['save', 'cancel', 'delete'])

const serviceForm = ref(null)

const nameRules = [requiredRule]
const sortRules = [requiredRule, integerRule]

const editForm = ref({
  id: '',
  is_active: true,
  sort: 100,
  name: '',
  description: '',
  cost: null
})

watch(
  () => props.form,
  (value) => {
    editForm.value = { ...value }
  },
  { immediate: true }
)

async function onSave() {
  const { valid } = await serviceForm.value.validate()
  if (valid) {
    emit('save', { ...editForm.value })
  }
}
</script>

<template>
  <v-form ref="serviceForm">
    <v-row>
      <v-col cols="3" sm="2">
        <v-text-field v-model="editForm.id" label="ID" disabled type="number" variant="outlined" />
      </v-col>
      <v-col cols="8" sm="6" md="4">
        <v-switch v-model="editForm.is_active" label="Показывать на сайте"></v-switch>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4" sm="3">
        <v-text-field
          v-model="editForm.sort"
          :rules="sortRules"
          label="Сортировка"
          type="number"
          variant="outlined"
        />
      </v-col>
      <v-col cols="8" sm="6" md="4">
        <span class="text-body-2 text-grey"
          >Чем больше число — тем выше находится услуга в списке услуг на странице создания
          заявки</span
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="9">
        <v-text-field
          v-model="editForm.name"
          label="Название услуги *"
          :rules="nameRules"
          variant="outlined"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="11">
        <v-textarea v-model="editForm.description" label="Описание услуги" variant="outlined" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="7">
        <v-text-field
          v-model="editForm.cost"
          type="number"
          label="Стоимость услуги, ₽"
          variant="outlined"
        />
      </v-col>
    </v-row>
    <div class="mt-12">
      <SavePanel
        @save="onSave"
        :disabled="isLoading"
        @cancel="$emit('cancel')"
        @delete="$emit('delete')"
      />
    </div>
  </v-form>
</template>

<style scoped lang="scss"></style>
