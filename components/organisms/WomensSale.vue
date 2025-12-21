<script setup lang="ts">
import { ref } from 'vue'
// Molekülü doğru klasörden import ediyoruz
import SaleCard from '../molecules/SaleCard.vue'

// Görseldeki veriler
const saleItems = ref([
  {
    id: 1,
    title: 'LEGGINGS FROM $25',
    imageUrl: 'https://picsum.photos/id/331/400/500', 
    topBadge: 'BLACK FRIDAY',
    bottomBadge: 'UP TO 50% OFF'
  },
  {
    id: 2,
    title: '50% OFF & OVER',
    imageUrl: 'https://picsum.photos/id/334/400/500', 
    topBadge: 'BLACK FRIDAY',
    bottomBadge: 'UP TO 50% OFF'
  },
  {
    id: 3,
    title: 'SPORTS BRAS FROM $20',
    imageUrl: 'https://picsum.photos/id/338/400/500', 
    topBadge: 'BLACK FRIDAY',
    bottomBadge: 'UP TO 50% OFF'
  },
  {
    id: 4,
    title: '$35 AND UNDER',
    imageUrl: 'https://picsum.photos/id/342/400/500', 
    topBadge: 'BLACK FRIDAY',
    bottomBadge: 'UP TO 50% OFF'
  }
])
</script>

<template>
  <section class="womens-sale">
    <div class="container">
      
      <h2 class="section-title">WOMEN'S SALE</h2>

      <div class="sale-grid">
        <SaleCard 
          v-for="item in saleItems"
          :key="item.id"
          :title="item.title"
          :image-url="item.imageUrl"
          :top-badge="item.topBadge"
          :bottom-badge="item.bottomBadge"
        />
      </div>

    </div>
  </section>
</template>

<style scoped>
.womens-sale {
  padding-top: 50px;
  padding-bottom: 3rem;
  width: 100%;
}

.container {
  width: 100%;
  max-width: 1800px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 40px; 
  padding-right: 40px; 
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0rem 0;
  text-transform: uppercase;
  text-align: left;
}

.sale-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px; 
}

/* Mobil Uyumluluk */
@media (max-width: 992px) {
  .sale-grid {
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