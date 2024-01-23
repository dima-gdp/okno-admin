<script setup>
import { defineEmits } from 'vue'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const props = defineProps({ headers: Array, items: Array, hasAction: Boolean, isLoading: Boolean })
const emit = defineEmits(['update-status'])
const perPage = -1
const isStatusUpdate = (item) => {
  emit('update-status', item)
}
</script>

<template>
  <v-container>
    <div class="service-table">
      <v-data-table-server
        :headers="props.headers"
        :items="props.items"
        :loading="props.isLoading"
        :items-per-page="perPage"
        item-key="name"
      >
        <template #[`item.status`]="{ item }">
          <v-switch
            color="primary"
            :model-value="item.raw.is_active"
            inset
            hide-details
            :disabled="item.raw?.disable_service"
            @change="isStatusUpdate(item.raw)"
          ></v-switch>
        </template>
        <template #[`item.action`]="{ item }" v-if="props.hasAction">
          <router-link :to="`/service/${item.raw.id}`">
            <v-icon icon="mdi-pencil" />
          </router-link>
        </template>
      </v-data-table-server>
    </div>
  </v-container>
</template>

<style lang="scss">
// Во vuetify 3 нет св-в для скрытия футера, таких как hide-default-footer и disable-pagination
.service-table .v-table .v-data-table-footer {
  display: none;
}

.service-table .v-table__wrapper {
  overflow: hidden !important;
}
</style>
