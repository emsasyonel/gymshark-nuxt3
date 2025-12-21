<script setup lang="ts">
defineProps<{
  text: string
  href: string
}>()
</script>

<template>
  <NuxtLink :to="href" class="category-link">{{ text }}</NuxtLink>
</template>

<style scoped>
.category-link {
  text-decoration: none;
  color: #333;
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: none;
  display: inline-block; /* Tıklama alanını düzeltir */
  padding: 2px 0;
}
.category-link:hover {
  text-decoration: underline;
}
</style>