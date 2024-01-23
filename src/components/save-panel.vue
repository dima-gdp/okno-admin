<script setup>
defineProps({
  disabled: { type: Boolean, default: false }
})

defineEmits(['save', 'cancel', 'delete'])
</script>

<template>
  <div class="d-flex align-center">
    <v-btn
      class="bg-blue-grey-darken-3 mr-4"
      variant="plain"
      size="large"
      :disabled="disabled"
      @click="$emit('save')"
      >Сохранить услугу</v-btn
    >
    <v-btn
      class="mr-2"
      variant="text"
      size="large"
      color="orange-darken-1"
      :disabled="disabled"
      @click="$emit('cancel')"
      >Отменить изменения</v-btn
    >
    <v-btn
      density="default"
      prepend-icon="mdi-delete"
      class="ml-auto"
      variant="plain"
      size="large"
      color="red-accent-2"
      :disabled="disabled"
      @click="$emit('delete')"
      >Удалить услугу</v-btn
    >
  </div>
</template>
