<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router' // Router eklendi
import { useNuxtApp } from '#app'
import { collection, getDocs, limit, query } from 'firebase/firestore'
import SaleCard from '../molecules/SaleCard.vue'

// --- KURULUMLAR ---
const { $db } = useNuxtApp()
const router = useRouter() // Router tanımlandı

// --- REAKTİF VERİ ---
const saleItems = ref<any[]>([])
const loading = ref(true)

// --- YÖNLENDİRME FONKSİYONU ---
const goToMenCollection = () => {
  router.push('/collections/mens-products')
}

// --- VERİ ÇEKME ---
const fetchMenProducts = async () => {
  try {
    loading.value = true
    const q = query(collection($db as any, 'menproducts'), limit(4))
    const querySnapshot = await getDocs(q)
    const fetchedData: any[] = []

    querySnapshot.forEach((doc) => {
      const data = doc.data()
      fetchedData.push({
        id: doc.id,
        title: data.name || data.title || 'Product Title',
        imageUrl: data.imageUrl || data.image || 'https://via.placeholder.com/400x500',
        topBadge: 'BLACK FRIDAY', 
        bottomBadge: data.price ? `$${data.price}` : 'VIEW'
      })
    })
    saleItems.value = fetchedData
  } catch (error) {
    console.error("Mens Sale Verisi Çekilemedi:", error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchMenProducts()
})
</script>

<template>
  <section class="mens-sale">
    <div class="container">
      
      <h2 class="section-title">MEN'S SALE</h2>

      <div v-if="loading" style="padding: 20px; text-align: center;">Loading...</div>

      <div v-else class="sale-grid">
        <SaleCard 
          v-for="item in saleItems"
          :key="item.id"
          :title="item.title"
          :image-url="item.imageUrl"
          :top-badge="item.topBadge"
          :bottom-badge="item.bottomBadge"
          @click="goToMenCollection"
          class="clickable-card"
        />
      </div>

    </div>
  </section>
</template>

<style scoped>
.mens-sale { padding-top: 50px; padding-bottom: 3rem; width: 100%; }
.container { width: 100%; max-width: 1700px; margin: 0 auto; padding: 0 40px; }
.section-title { font-size: 1.5rem; font-weight: 700; margin-bottom: 1.5rem; text-transform: uppercase; text-align: left; }
.sale-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; }

/* Tıklanabilir olduğunu belli etmek için */
.clickable-card { cursor: pointer; transition: opacity 0.2s; }
.clickable-card:hover { opacity: 0.9; }

@media (max-width: 992px) { .sale-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 576px) { .container { padding: 0 15px; } }
</style>