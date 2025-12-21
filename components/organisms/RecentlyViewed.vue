<script setup lang="ts">
import { useAppRouter } from '~/composables/useAppRouter';

const appRouter = useAppRouter();

// Veriler (Ekran görüntüsündeki 8 ürünü simüle eden yapı)
const products = [
  {
    id: '1',
    image: '/images/sort01.webp',
    imageHover: '/images/sort02.webp',
    bgColor: '#f5f5f5' // Gri
  },
  {
    id: '2',
    image: '/images/kemer01.webp',
    imageHover: '/images/kemer02.webp',
    bgColor: '#f5f5f5'
  },
  {
    id: '3',
    image: '/images/canta01.webp',
    imageHover: '/images/canta02.webp',
    bgColor: '#f5f5f5'
  },
  {
    id: '4',
    image: '/images/bottle01.webp',
    imageHover: '/images/bottle02.webp',
    bgColor: '#ebe6e0' // Bej (Suluk)
  },
  {
    id: '5',
    image: '/images/hırka01.webp',
    imageHover: '/images/hırka02.webp',
    bgColor: '#f5f5f5'
  },
  {
    id: '6',
    image: '/images/hoodie01.webp',
    imageHover: '/images/hoodie02.webp',
    bgColor: '#f5f5f5'
  },
  {
    id: '7',
    image: '/images/legging01.webp',
    imageHover: '/images/legging02.webp',
    bgColor: '#f5f5f5'
  },
  {
    id: '8',
    image: '/images/sutyen01.webp',
    imageHover: '/images/sutyen02.webp',
    bgColor: '#ebe6e0', // Bej (Sütyen)
    tag: { text: 'GIFTING FAVES 🎁', type: 'gifting' }
  }
];
</script>

<template>
  <section class="recently-viewed-section">
    <div class="container">
      
      <div class="header">
        <h2 class="title">RECENTLY VIEWED</h2>
      </div>

      <div class="product-grid">
        <div 
          v-for="product in products" 
          :key="product.id" 
          class="product-card"
          @click="appRouter.goToProductDetail(product.id)"
        >
          <div class="image-container" :style="{ backgroundColor: product.bgColor }">
            
            <span v-if="product.tag" :class="['tag', product.tag.type]">
              {{ product.tag.text }}
            </span>

            <button class="wishlist-btn" @click.stop>
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 18px; height: 18px;">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
               </svg>
            </button>
            
            <img :src="product.image" alt="Product" class="product-image img-main" />
            
            <img :src="product.imageHover" alt="Product Hover" class="product-image img-hover" />
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* --- GENEL YAPI --- */
.recently-viewed-section { 
  padding: 150px 0; 
  background-color: #fff; 
}

.container { 
  max-width: 1600px; 
  margin: 0 auto; 
  padding: 0 40px; 
}

.header { 
  text-align: left; 
  margin-bottom: 20px; 
}

.title { 
  font-size: 1.5rem; 
  font-weight: 800; 
  text-transform: uppercase; 
  padding-bottom: 25px;
  margin: 0; 
  color: #000; 
}

/* --- GRID YAPISI --- */
.product-grid { 
  display: grid; 
  grid-template-columns: repeat(8, 1fr); 
  gap: 5px; 
}

.product-card { 
  cursor: pointer; 
  display: flex; 
  flex-direction: column; 
}

/* --- RESİM ALANI (DÜZELTİLEN KISIM) --- */
.image-container {
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;
  background-color: #f5f5f5; 
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  /* Resimlerin arka plan rengiyle kaynaşması için */
  mix-blend-mode: multiply; 
  transition: opacity 0.3s ease; /* Yumuşak geçiş */
}

/* -- VARSAYILAN RESİM -- */
.img-main {
  opacity: 1; /* Başlangıçta görünür */
  position: absolute;
  top: 0; left: 0;
  z-index: 1;
}

/* -- HOVER RESMİ -- */
.img-hover {
  opacity: 0; /* Başlangıçta gizli */
  position: absolute;
  top: 0; left: 0;
  z-index: 2; /* Main resmin üstünde */
}

/* --- HOVER MANTIĞI (Burayı değiştirdik) --- */

/* 1. Hover olunca alttaki ANA resim kaybolsun (Opacity 0) */
.product-card:hover .img-main {
  opacity: 0;
}

/* 2. Hover olunca üstteki YENİ resim gelsin (Opacity 1) */
.product-card:hover .img-hover {
  opacity: 1;
}

/* --- BUTONLAR VE ETİKETLER --- */
.tag { 
  position: absolute; 
  bottom: 8px; 
  left: 8px; 
  padding: 4px 6px; 
  font-size: 0.65rem; 
  font-weight: 800; 
  text-transform: uppercase; 
  z-index: 10; 
  background-color: #fff; 
  color: #000; 
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.wishlist-btn { 
  position: absolute; 
  top: 8px; 
  right: 8px; 
  width: 30px; 
  height: 30px; 
  background-color: #fff; 
  border: none; 
  border-radius: 50%; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  cursor: pointer; 
  z-index: 10; 
  color: #000; 
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  transition: transform 0.2s;
}

.wishlist-btn:hover { 
  transform: scale(1.1);
}

/* --- RESPONSIVE AYARLAR --- */
@media (max-width: 1200px) { 
  .product-grid { grid-template-columns: repeat(4, 1fr); gap: 10px; } 
}
@media (max-width: 600px) { 
  .product-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; } 
  .container { padding: 0 20px; } 
}
</style>