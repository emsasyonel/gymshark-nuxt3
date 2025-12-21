<script setup lang="ts">
import { ref } from 'vue'
// Molekülü doğru klasörden import ediyoruz
import SaleCard from '../molecules/SaleCard.vue'

// Görseldeki "MEN'S SALE" verileri
const saleItems = ref([
  {
    id: 1,
    title: 'HOODIES FROM $35',
    imageUrl: 'https://picsum.photos/id/349/400/500', // Temsili Gri Hoodie
    topBadge: 'BLACK FRIDAY',
    bottomBadge: 'UP TO 50% OFF'
  },
  {
    id: 2,
    title: '50% OFF & OVER',
    imageUrl: 'https://picsum.photos/id/352/400/500', // Temsili Siyah Eşofman Takımı
    topBadge: 'BLACK FRIDAY',
    bottomBadge: 'UP TO 50% OFF'
  },
  {
    id: 3,
    title: 'SHORTS FROM $22',
    imageUrl: 'https://picsum.photos/id/353/400/500', // Temsili Şort
    topBadge: 'BLACK FRIDAY',
    bottomBadge: 'UP TO 50% OFF'
  },
  {
    id: 4,
    title: '$35 & UNDER',
    imageUrl: 'https://picsum.photos/id/356/400/500', // Temsili T-shirt
    topBadge: 'BLACK FRIDAY',
    bottomBadge: 'UP TO 50% OFF'
  }
])
</script>

<template>
  <section class="mens-sale">
    <div class="container">
      
      <h2 class="section-title">MEN'S SALE</h2>

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
.mens-sale {
  padding-top: 50px;
  padding-bottom: 3rem;
  width: 100%;
}

.container {
  width: 100%;
  max-width: 1700px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 40px; 
  padding-right: 40px; 
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 1.5rem 0; /* Başlık ile kartlar arasına biraz boşluk koydum */
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