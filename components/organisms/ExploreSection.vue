<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useNuxtApp } from '#app'
import { collection, getDocs, limit, query } from 'firebase/firestore'
// Molekülü doğru klasörden import ediyoruz
import ExploreCard from '../molecules/ExploreCard.vue'

// --- FIREBASE KURULUMU ---
const { $db } = useNuxtApp()

// --- REAKTİF VERİ ---
const exploreItems = ref<any[]>([])
const loading = ref(true)

// --- VERİ ÇEKME FONKSİYONU ---
const fetchExploreContent = async () => {
  try {
    loading.value = true

    // 1. SORGU: Kadın ürünlerinden 2 tane çek
    const womenQuery = query(collection($db as any, 'products'), limit(2))
    
    // 2. SORGU: Erkek ürünlerinden 2 tane çek
    const menQuery = query(collection($db as any, 'menproducts'), limit(2))

    // İki sorguyu AYNI ANDA çalıştır (Performans için Promise.all)
    const [womenSnapshot, menSnapshot] = await Promise.all([
      getDocs(womenQuery),
      getDocs(menQuery)
    ])

    const combinedData: any[] = []

    // Kadın ürünlerini listeye ekle
    womenSnapshot.forEach((doc) => {
      const data = doc.data()
      combinedData.push({
        id: doc.id,
        title: data.name || data.title || 'WOMENS ITEM',
        imageUrl: data.imageUrl || data.image || 'https://via.placeholder.com/600x600'
      })
    })

    // Erkek ürünlerini listeye ekle
    menSnapshot.forEach((doc) => {
      const data = doc.data()
      combinedData.push({
        id: doc.id,
        title: data.name || data.title || 'MENS ITEM',
        imageUrl: data.imageUrl || data.image || 'https://via.placeholder.com/600x600'
      })
    })

    // Listeyi güncelle (Toplam 4 ürün olacak)
    exploreItems.value = combinedData

  } catch (error) {
    console.error("Explore Verisi Çekilemedi:", error)
  } finally {
    loading.value = false
  }
}

// Sayfa yüklenince çalıştır
onMounted(() => {
  fetchExploreContent()
})
</script>

<template>
  <section class="explore-section">
    <div class="container">
      
      <h2 class="section-title">EXPLORE</h2>

      <div v-if="loading" style="padding: 20px; text-align: center;">
        Loading explore guides...
      </div>

      <div v-else class="explore-grid">
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
  max-width: 1700px;
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