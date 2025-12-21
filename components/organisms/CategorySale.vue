<script setup lang="ts">
import { ref } from 'vue'

const categories = ref([
  {
    id: 1,
    title: "WOMEN'S SALE",
    subtitle: 'UP TO 50% OFF',
    badge: 'BLACK FRIDAY',
    // Kadın sporcu resmi
    imageUrl: 'https://picsum.photos/id/338/600/800' 
  },
  {
    id: 2,
    title: "MEN'S SALE",
    subtitle: 'UP TO 50% OFF',
    badge: 'BLACK FRIDAY',
    // Erkek sporcu resmi
    imageUrl: 'https://picsum.photos/id/339/600/800' 
  },
  {
    id: 3,
    title: 'ACCESSORIES SALE',
    subtitle: 'UP TO 50% OFF',
    badge: 'BLACK FRIDAY',
    // Aksesuar/Ekipman resmi
    imageUrl: 'https://picsum.photos/id/340/600/800' 
  }
])
</script>

<template>
  <section class="category-sale">
    <div class="container">
      
      <div class="grid">
        <NuxtLink 
          v-for="item in categories" 
          :key="item.id" 
          to="#" 
          class="category-card"
        >
          <div class="image-wrapper">
            <img :src="item.imageUrl" :alt="item.title">
            <div class="top-badge">{{ item.badge }}</div>
          </div>

          <div class="card-info">
            <span class="subtitle">{{ item.subtitle }}</span>
            <h3 class="title">{{ item.title }}</h3>
          </div>
        </NuxtLink>
      </div>

    </div>
  </section>
</template>

<style scoped>
.category-sale {
  /* Diğer bölümlerle tutarlı boşluk */
  padding-top: 50px;
  padding-bottom: 3rem;
  width: 100%;
}

.container {
  width: 100%;
  max-width: 1800px;
  margin: 0 auto;
  /* Senin standart padding ayarların */
  padding-left: 40px;
  padding-right: 40px;
}

.grid {
  display: grid;
  /* 3 Eşit Sütun */
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

/* KART TASARIMI */
.category-card {
  display: block;
  text-decoration: none;
  color: #000;
  position: relative;
}

.image-wrapper {
  position: relative;
  width: 100%;
  /* Kareye yakın ama hafif dikey dikdörtgen */
  padding-bottom: 110%; 
  background-color: #f5f5f5;
  overflow: hidden;
  margin-bottom: 1rem;
}

.image-wrapper img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.category-card:hover img {
  transform: scale(1.05);
}

/* Turkuaz Şerit */
.top-badge {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #56F5F5; /* Gymshark Turkuazı */
  color: #000;
  font-weight: 800;
  font-size: 1rem;
  padding: 0.8rem 1rem;
  text-transform: uppercase;
  z-index: 2;
  line-height: 1;
}

/* Yazı Alanı */
.card-info {
  text-align: left;
}

.subtitle {
  display: block;
  font-size: 0.85rem;
  color: #333;
  font-weight: 600;
  margin-bottom: 4px;
  text-transform: uppercase;
}

.title {
  font-size: 1.2rem;
  font-weight: 800; /* Kalın */
  text-transform: uppercase;
  margin: 0;
  color: #000;
}

/* Mobil */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr; /* Mobilde alt alta */
  }
  .container {
    padding-left: 15px;
    padding-right: 15px;
  }
}
</style>