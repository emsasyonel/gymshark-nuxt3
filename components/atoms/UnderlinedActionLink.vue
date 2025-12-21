<script setup lang="ts">
defineProps<{ text: string }>()
</script>

<template>
  <NuxtLink to="/register" class="signup-link">{{ text }}</NuxtLink>
</template>

<style scoped>
.signup-link {
  color: #ffffff;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.9rem;
  text-transform: uppercase;
  border-bottom: 2px solid #ffffff; /* Alt çizgi stili */
  padding-bottom: 2px;
  display: inline-block;
  transition: opacity 0.2s;
}
.signup-link:hover {
  opacity: 0.8;
}
</style>