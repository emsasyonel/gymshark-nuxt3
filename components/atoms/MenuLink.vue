<script setup lang="ts">
defineProps<{ 
  text: string
  href: string 
}>()
</script>

<template>
  <NuxtLink :to="href" class="menu-link">{{ text }}</NuxtLink>
</template>

<style scoped>
.menu-link {
  text-decoration: none;
  color: #000;
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: capitalize;
  display: block; /* Tıklama alanını genişletir */
  transition: opacity 0.2s;
}

.menu-link:hover {
  text-decoration: underline;
  opacity: 0.7;
}
</style>