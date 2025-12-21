<script setup lang="ts">
// Atomu import ediyoruz
import NavLink from '../atoms/NavLink.vue'

defineProps<{
  activeMenu: string | null
}>()

const emit = defineEmits(['set-active'])
</script>

<template>
  <nav class="navigation">
    <ul>
      <li @mouseenter="emit('set-active', 'women')">
        <NavLink text="Women" :is-active="activeMenu === 'women'" />
      </li>
      <li @mouseenter="emit('set-active', 'men')">
        <NavLink text="Men" :is-active="activeMenu === 'men'" />
      </li>
      <li @mouseenter="emit('set-active', 'accessories')">
        <NavLink text="Accessories" :is-active="activeMenu === 'accessories'" />
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.navigation ul {
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;
  gap: 1.5rem;
}
</style>