<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useNuxtApp } from '#app'
import { collection, getDocs, limit, query } from 'firebase/firestore'

// --- TİP TANIMLAMASI (Hataları önlemek için) ---
interface CategoryItem {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  link: string;
  imageUrl: string;
}

const { $db } = useNuxtApp()

// --- KATEGORİ VERİLERİ (BAŞLANGIÇ) ---
const categories = ref<CategoryItem[]>([
  {
    id: 1,
    title: "WOMEN'S SALE",
    subtitle: 'UP TO 50% OFF',
    badge: 'BLACK FRIDAY',
    link: '/collections/womens-products',
    imageUrl: 'https://via.placeholder.com/600x800' // DB'den güncellenecek
  },
  {
    id: 2,
    title: "MEN'S SALE",
    subtitle: 'UP TO 50% OFF',
    badge: 'BLACK FRIDAY',
    link: '/collections/mens-products',
    imageUrl: 'https://via.placeholder.com/600x800' // DB'den güncellenecek
  },
  {
    id: 3,
    title: 'ACCESSORIES SALE',
    subtitle: 'UP TO 50% OFF',
    badge: 'BLACK FRIDAY',
    link: '/collections/mens-products', 
    // --- BURAYA ELLE FOTOĞRAF GİR (3. KUTU) ---
    imageUrl: '/images/bottle01.webp' 
  }
])

// --- RESİMLERİ VERİTABANINDAN ÇEKME ---
const fetchCategoryImages = async () => {
  try {
    // Sorguları hazırla
    const womenQuery = query(collection($db as any, 'products'), limit(1))
    const menQuery = query(collection($db as any, 'menproducts'), limit(1))

    // Verileri çek
    const [womenSnap, menSnap] = await Promise.all([
      getDocs(womenQuery),
      getDocs(menQuery)
    ])

    // 1. KUTU (KADIN) GÜNCELLEME
    // 'womenSnap.empty' kontrolü yeterlidir, snap undefined gelmez
    if (!womenSnap.empty) {
      const docData = womenSnap.docs[0].data()
      const img = docData.imageUrl || docData.image
      if (img && categories.value[0]) {
        categories.value[0].imageUrl = img
      }
    }

    // 2. KUTU (ERKEK) GÜNCELLEME
    if (!menSnap.empty) {
      const docData = menSnap.docs[0].data()
      const img = docData.imageUrl || docData.image
      if (img && categories.value[1]) {
        categories.value[1].imageUrl = img
      }
    }

    // 3. KUTU zaten yukarıda elle girildi, dokunmuyoruz.

  } catch (error) {
    console.error("Kategori resimleri çekilemedi:", error)
  }
}

onMounted(() => {
  fetchCategoryImages()
})
</script>

<template>
  <section class="category-sale">
    <div class="container">
      
      <div class="grid">
        <NuxtLink 
          v-for="item in categories" 
          :key="item.id" 
          :to="item.link" 
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
  padding-top: 50px;
  padding-bottom: 3rem;
  width: 100%;
}

.container {
  width: 100%;
  max-width: 1700px;
  margin: 0 auto;
  padding-left: 40px;
  padding-right: 40px;
}

.grid {
  display: grid;
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

.top-badge {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #56F5F5;
  color: #000;
  font-weight: 800;
  font-size: 1rem;
  padding: 0.8rem 1rem;
  text-transform: uppercase;
  z-index: 2;
  line-height: 1;
}

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
  font-weight: 800;
  text-transform: uppercase;
  margin: 0;
  color: #000;
}

/* Mobil */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .container {
    padding-left: 15px;
    padding-right: 15px;
  }
}
</style>