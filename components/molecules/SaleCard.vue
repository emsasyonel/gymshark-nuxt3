<script setup lang="ts">
defineProps<{
  title: string
  imageUrl: string
  topBadge?: string
  bottomBadge?: string
}>()
</script>

<template>
  <NuxtLink to="#" class="sale-card">
    <div class="image-container">
      <img :src="imageUrl" :alt="title" class="card-image">
      
      <div v-if="topBadge" class="top-badge">
        {{ topBadge }}
      </div>

      <div v-if="bottomBadge" class="bottom-badge">
        {{ bottomBadge }}
      </div>
    </div>
    
    <h3 class="card-title">{{ title }}</h3>
  </NuxtLink>
</template>

<style scoped>
.sale-card {
  display: block;
  text-decoration: none;
  color: #000;
}

.image-container {
  position: relative;
  width: 100%;
  padding-bottom: 125%; 
  background-color: #f5f5f5;
  margin-bottom: 1rem;
  overflow: hidden;
}

.card-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.sale-card:hover .card-image {
  transform: scale(1.05);
}

/* Turkuaz Şerit */
.top-badge {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #56F5F5;
  color: #000;
  
  font-weight: 800;
  font-size: 1.1rem;
  padding: 0.8rem 1rem;
  
  text-transform: uppercase;
  z-index: 2;
  line-height: 1;
}

/* Beyaz Etiket */
.bottom-badge {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background-color: #ffffff;
  color: #000;
  font-weight: 1000;
  font-size: 0.8rem;
  padding: 0.5rem 1.2rem;
  border-radius: 4px;
  text-transform: uppercase;
  z-index: 2;
}

.card-title {
  font-size: 0.95rem;
  font-weight: 700;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
</style>