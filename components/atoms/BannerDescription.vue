<script setup lang="ts">
defineProps<{ text: string }>()
</script>

<template>
  <p class="description">{{ text }}</p>
</template>

<style scoped>
.description {
  color: #cccccc; /* Hafif gri */
  font-size: 0.9rem;
  margin: 0.5rem 0 1rem 0;
  max-width: 600px;
  line-height: 1.5; /* Okunabilirlik için satır aralığı */
}
</style>