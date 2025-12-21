<script setup lang="ts">
// Atomu import ediyoruz (Molecules -> Atoms)
import CategoryLink from '../atoms/CategoryLink.vue'

defineProps<{
  title: string
  links: Array<{ text: string, href: string }>
}>()
</script>

<template>
  <div class="link-column">
    <h3 class="column-title">{{ title }}</h3>
    <ul>
      <li v-for="link in links" :key="link.text">
        <CategoryLink :text="link.text" :href="link.href" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.column-title {
  font-size: 1rem;
  font-weight: 700;
  color: #000;
  margin: 0 0 1rem 0; /* Başlık ile linkler arasına biraz boşluk ekledim */
  text-transform: uppercase;
}

.link-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.2rem; /* Linkler birbirine yapışmasın */
}
</style>