<script setup lang="ts">
import { useAppRouter } from '~/composables/useAppRouter';

const appRouter = useAppRouter();

// Buradaki resimleri de kendi /images klasöründen çekebilirsin
const lookItems = [
  {
    id: 'socks-001',
    name: 'Gymshark Crew Socks 5pk - White',
    color: 'White',
    price: 28,
    image: '/images/kemer01.webp'
  },
  {
    id: 'shorts-002',
    name: 'Gymshark Everyday Seamless Shorts - Black',
    color: 'Black',
    price: 45,
    image: '/images/bottle01.webp'
  }
];
</script>

<template>
  <section class="get-the-look-wrapper">
    
    <div class="content-container">
      <h2 class="section-title">GET THE LOOK</h2>

      <div class="look-flex-container">
        
        <div 
          v-for="item in lookItems" 
          :key="item.id" 
          class="look-card"
          @click="appRouter.goToProductDetail(item.id)"
        >
          <div class="image-box">
            <button class="wishlist-btn" @click.stop><i class="bi bi-heart"></i></button>
            <img :src="item.image" :alt="item.name" />
          </div>

          <div class="info-box">
            <h3 class="product-name">{{ item.name }}</h3>
            <p class="product-color">{{ item.color }}</p>
            <p class="product-price">US${{ item.price }}</p>
          </div>
        </div>

      </div>


    </div>

  </section>
</template>

<style scoped>
/* DIŞ KAPLAYICI: Arka plan ve genel boşluk */
.get-the-look-wrapper {
  width: 100%;
  margin-top: 50px;
  padding: 60px 0;
  background-color: #fff;
}

/* İÇ KONTEYNER: Üstteki pdp-layout ile AYNI GENİŞLİK */
.content-container {
  max-width: 1600px; /* Üstteki bölümle aynı genişlik sınırı */
  margin: 0 auto;    /* Sayfada ortala */
  padding: 0 40px;   /* Kenar boşlukları (pdp-layout padding'iyle aynı olmalı) */
  padding-left: 100px;
}

/* BAŞLIK */
.section-title {
  font-size: 1.5rem; font-weight: 800; text-transform: uppercase; margin-bottom: 30px; color: #000;
  text-align: left; /* Başlık solda */
}

/* FLEX CONTAINER: Ürünleri SOLA yaslar */
.look-flex-container {
  display: flex;
  justify-content: flex-start; /* --- DÜZELTME: SOLA YASLA --- */
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 60px;
}

/* KART TASARIMI */
.look-card {
  cursor: pointer;
  /* Genişliği 4'lü grid mantığına göre ayarlıyoruz */
  /* (100% - (3 tane 20px boşluk)) / 4 = yaklaşık %23-24 */
  width: calc((100% - 60px) / 4); 
  min-width: 250px; /* Çok küçülmesin */
  display: flex; flex-direction: column;
}

.image-box {
  position: relative; aspect-ratio: 3/4; background: #f4f4f4; margin-bottom: 15px; overflow: hidden;
}
.image-box img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease; }
.look-card:hover .image-box img { transform: scale(1.05); }

.wishlist-btn {
  position: absolute; top: 10px; right: 10px; background: #fff; border: none; width: 32px; height: 32px;
  border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 2;
}

.info-box { text-align: left; }
.product-name { font-size: 0.95rem; font-weight: 600; margin: 0 0 5px 0; line-height: 1.4; }
.product-color { font-size: 0.9rem; color: #666; margin: 0 0 8px 0; }
.product-price { font-size: 1rem; font-weight: 700; }

/* ALT BÖLÜM */
.next-section-header { margin-top: 40px; padding-top: 40px; text-align: left; }
.section-subtitle { color: #666; font-size: 0.95rem; margin-top: -20px; }

@media (max-width: 1024px) {
  .look-card { width: calc((100% - 20px) / 2); } /* Tablette 2'li */
}
@media (max-width: 768px) {
  .content-container { padding: 0 20px; } /* Mobilde kenar boşluğunu azalt */
  .look-flex-container { gap: 10px; }
  .look-card { width: calc((100% - 10px) / 2); }
}
</style>