<script setup lang="ts">
defineProps<{
  text: string
  href: string
}>()
</script>

<template>
  <NuxtLink :to="href" class="footer-link">{{ text }}</NuxtLink>
</template>

<style scoped>
.footer-link {
  text-decoration: none;
  color: #333;
  font-size: 0.9rem;
  display: inline-block; /* Hover alanı için */
  padding: 2px 0; /* Tıklama alanını biraz rahatlatır */
}
.footer-link:hover {
  text-decoration: underline;
}
</style>