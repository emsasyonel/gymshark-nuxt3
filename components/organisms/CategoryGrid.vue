<script setup lang="ts">
import { ref } from 'vue'
// Molekülü doğru klasörden çağırıyoruz
import LinkColumn from '../molecules/LinkColumn.vue'

// 2. BÖLÜM ("LINKS") İÇİN VERİ
const linkColumns = ref([
  {
    title: 'WOMENS LEGGINGS',
    links: [
      { text: 'Gym Leggings', href: '#' },
      { text: 'Leggings With Pockets', href: '#' },
      { text: 'High Waisted Leggings', href: '#' },
      { text: 'Scrunch Bum Leggings', href: '#' },
      { text: 'Black Leggings', href: '#' },
      { text: 'Flare Leggings', href: '#' },
      { text: 'Seamless Leggings', href: '#' },
      { text: 'Petite Gym Leggings', href: '#' },
    ]
  },
  {
    title: 'WOMENS SPORTS BRAS & TOPS',
    links: [
      { text: 'Sports Bras from $', href: '#' },
      { text: 'High Support Sports Bras', href: '#' },
      { text: 'Black Sports Bras', href: '#' },
      { text: 'T-Shirts & Tops', href: '#' },
      { text: 'Tank Tops', href: '#' },
      { text: 'Crop Tops', href: '#' },
      { text: 'Long Sleeve Gym Shirts', href: '#' },
      { text: 'Graphics Tees', href: '#' },
    ]
  },
  {
    title: 'WOMENS GYM CLOTHING',
    links: [
      { text: 'Gym Shorts', href: '#' },
      { text: 'Matching Workout Sets', href: '#' },
      { text: 'Joggers & Sweatpants', href: '#' },
      { text: 'Bodysuits', href: '#' },
      { text: 'Gym Hoodies', href: '#' },
      { text: 'Gym Jackets', href: '#' },
      { text: 'Sweatsuits', href: '#' },
      { text: 'Workout Bags', href: '#' },
    ]
  },
  {
    title: 'WOMENS ACTIVITIES',
    links: [
      { text: 'Lifting', href: '#' },
      { text: 'Yoga Outfits', href: '#' },
      { text: 'Running', href: '#' },
      { text: 'Pilates Outfits', href: '#' },
      { text: 'Hybrid Training', href: '#' },
      { text: 'Cosy Luxe X Soft Sculpt ☁️', href: '#' },
    ]
  }
])
</script>

<template>
  <section class="footer-links">
    <div class="links-container">
      <div class="grid-links">
        <LinkColumn 
          v-for="column in linkColumns" 
          :key="column.title" 
          :title="column.title" 
          :links="column.links" 
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.footer-links {
  background-color: #ffffff;
  padding: 4rem 0;
  width: 100%;

}

.links-container {
  width: 100%;
  max-width: 1800px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 30px;
  padding-right: 10px;
}

.grid-links {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

/* Mobil uyumluluk için */
@media (max-width: 992px) {
  .grid-links {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .grid-links {
    grid-template-columns: 1fr;
  }
}
</style>