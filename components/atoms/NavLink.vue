<script setup lang="ts">
defineProps<{
  text: string
  isActive?: boolean
}>()
</script>

<template>
  <span class="nav-link" :class="{ 'active': isActive }">
    {{ text }}
  </span>
</template>

<style scoped>
.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: capitalize;
  cursor: pointer;
  display: block;
  padding: 1.2rem 0;
  border-bottom: 2px solid transparent;
  transition: border-color 0.2s ease;
}
.nav-link.active,
.nav-link:hover {
  color: #000;
  border-bottom-color: #000;
}
</style>