<script setup lang="ts">
// NuxtLink otomatik gelir
defineProps<{
  title: string
  imageUrl: string
}>()
</script>

<template>
  <NuxtLink to="#" class="explore-card">
    <div class="image-wrapper">
      <img :src="imageUrl" :alt="title">
    </div>
    <h3 class="card-title">{{ title }}</h3>
  </NuxtLink>
</template>

<style scoped>
.explore-card {
  display: block;
  text-decoration: none;
  color: #000;
  cursor: pointer;
}

.image-wrapper {
  width: 100%;
  /* 1/1.4 oranı korunarak kart boyu uzatıldı */
  aspect-ratio: 1 / 1.4; 
  overflow: hidden;
  background-color: #f5f3f0;
  margin-bottom: 1rem;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.explore-card:hover img {
  transform: scale(1.05);
}

.card-title {
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  margin: 0;
  line-height: 1.2;
}
</style>