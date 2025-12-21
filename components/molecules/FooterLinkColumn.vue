<script setup lang="ts">
// Atomu import ediyoruz (Molecules'den Atoms klasörüne çıkış)
import FooterLink from '../atoms/FooterLink.vue'

type LinkItem = {
  text: string;
  href: string;
}

defineProps<{
  title: string
  links: LinkItem[]
}>()
</script>

<template>
  <div class="link-column">
    <h3 class="column-title">{{ title }}</h3>
    <ul>
      <li v-for="link in links" :key="link.text">
        <FooterLink :text="link.text" :href="link.href" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.column-title {
  font-size: 1rem;
  font-weight: 700;
  color: #000;
  margin: 0 0 1.5rem 0;
  text-transform: uppercase;
}

.link-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem; /* Biraz boşluk bıraktım, daha okunaklı olsun diye */
}
</style>