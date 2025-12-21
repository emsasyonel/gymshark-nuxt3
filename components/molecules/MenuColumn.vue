<script setup lang="ts">
// DÜZELTME: Atomlar 'molecules' klasörünün dışındaki 'atoms' klasöründe
import MenuTitle from '../atoms/MenuTitle.vue'
import MenuLink from '../atoms/MenuLink.vue'

// Link yapısı için tip tanımı
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
  <div class="menu-column">
    <MenuTitle :text="title" />
    
    <ul>
      <li v-for="link in links" :key="link.text">
        <MenuLink :text="link.text" :href="link.href" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.menu-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
</style>