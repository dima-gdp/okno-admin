<template>
  <div class="layout">
    <Header />
    <v-main>
      <slot></slot>
    </v-main>
  </div>
</template>

<style lang='scss'>
.layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  //margin: 40px 126px 80px 126px;
  background: white;
}
</style>
<script setup>
import Header from '@/components/core/header.vue'
</script>
