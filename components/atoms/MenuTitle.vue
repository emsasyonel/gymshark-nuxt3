<script setup lang="ts">
defineProps<{ text: string }>()
</script>

<template>
  <h4 class="column-title">{{ text }}</h4>
</template>

<style scoped>
.column-title {
  font-size: 0.8rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  text-transform: uppercase;
  color: #888;
}
</style>