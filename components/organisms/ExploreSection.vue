<script setup lang="ts">
import { ref } from 'vue'
// Molekülü doğru klasörden import ediyoruz
import ExploreCard from '../molecules/ExploreCard.vue'

// Görseldeki veriler
const exploreItems = ref([
  {
    id: 1,
    title: 'LEGGINGS GUIDE',
    imageUrl: 'https://picsum.photos/id/338/600/600'
  },
  {
    id: 2,
    title: 'SHORTS GUIDE',
    imageUrl: 'https://picsum.photos/id/342/600/600'
  },
  {
    id: 3,
    title: 'SPORTS BRA GUIDE',
    imageUrl: 'https://picsum.photos/id/334/600/600'
  },
  {
    id: 4,
    title: 'GIFT GUIDE',
    imageUrl: 'https://picsum.photos/id/331/600/600'
  }
])
</script>

<template>
  <section class="explore-section">
    <div class="container">
      
      <h2 class="section-title">EXPLORE</h2>

      <div class="explore-grid">
        <ExploreCard 
          v-for="item in exploreItems"
          :key="item.id"
          :title="item.title"
          :imageUrl="item.imageUrl"
        />
      </div>

    </div>
  </section>
</template>

<style scoped>
.explore-section {
  padding-top: 50px;
  padding-bottom: 50px;
  width: 100%;
  background-color: #ffffff;
}

.container {
  width: 100%;
  max-width: 1800px;
  margin: 0 auto;
  padding-left: 40px;
  padding-right: 40px;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #000;
  margin: 0 0 1.5rem 0;
  text-transform: uppercase;
  text-align: left;
}

.explore-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px; 
}

/* Mobil Uyumluluk */
@media (max-width: 992px) {
  .explore-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .container {
    padding-left: 15px;
    padding-right: 15px;
  }
}
</style>