<script setup lang="ts">
defineProps<{
  title: string
  href: string
  imageUrl: string
}>()
</script>

<template>
  <NuxtLink :to="href" class="featured-card">
    <div 
      class="featured-image" 
      :style="{ backgroundImage: `url(${imageUrl})` }">
    </div>
    <span class="featured-title">{{ title }}</span>
  </NuxtLink>
</template>

<style scoped>
.featured-card {
  display: block;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  border-radius: 4px;
}

.featured-image {
  width: 100%;
  padding-bottom: 75%; /* 4:3 Oranı */
  background-size: cover;
  background-position: center;
  transition: transform 0.3s ease;
}

.featured-card:hover .featured-image {
  transform: scale(1.05);
}

.featured-title {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  color: #ffffff;
  font-size: 1.25rem;
  font-weight: 700;
  text-transform: uppercase;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.6); /* Gölgeyi biraz belirginleştirdim */
}
</style>