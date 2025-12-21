<script setup lang="ts">
import { useAppRouter } from '~/composables/useAppRouter';

const appRouter = useAppRouter();

// Örnek Veriler - HER ÜRÜNE 'imageHover' EKLENDİ
// (Not: Gerçekte farklı fotolar olmalı, demo için aynı linklerin sonuna küçük farklar ekledim veya aynısını kullandım)
const products = [
  {
    id: '1',
    name: 'Everyday Seamless Racerback Sports Bra',
    color: 'Black',
    price: 'US$40',
    image: '/images/sutyen01.webp',
    imageHover: '/images/sutyen02.webp', // Örnek farklı foto
  },
  {
    id: '2',
    name: 'Everyday Seamless Long Sleeve Crop Top',
    color: 'Black',
    price: 'US$40',
    image: '/images/crop01.webp',
    imageHover: '/images/crop02.webp',
    tag: { text: 'GIFTING FAVES 🎁', type: 'gifting' }
  },
  {
    id: '3',
    name: 'Everyday Seamless Hoodie Tank',
    color: 'Black',
    price: 'US$30',
    image: '/images/hoodie01.webp',
    imageHover: '/images/hoodie02.webp',
  },
  {
    id: '4',
    name: 'Vital Sports Tracktop',
    color: 'Black',
    price: 'US$45',
    image: '/images/hırka01.webp',
    imageHover: '/images/hırka02.webp',
  },
  {
    id: '5',
    name: 'Everyday Seamless Leggings',
    color: 'Black',
    price: 'US$50',
    image: '/images/legging01.webp',
    imageHover: '/images/legging02.webp',
    tag: { text: 'GIFTING FAVES 🎁', type: 'gifting' }
  },
  // 2. Satır (Demo için aynı fotoları kullandım, hover çalıştığını görmek için yeterli)
  {
    id: '6',
    name: 'Everyday Seamless Racerback Sports Bra',
    color: 'Black',
    price: 'US$40',
    image: '/images/sutyen01.webp',
    imageHover: '/images/sutyen02.webp', // Örnek farklı foto
  },
  {
    id: '7',
    name: 'Everyday Seamless Long Sleeve Crop Top',
    color: 'Black',
    price: 'US$40',
    image: '/images/crop01.webp',
    imageHover: '/images/crop02.webp',
    tag: { text: 'GIFTING FAVES 🎁', type: 'gifting' }
  },
  {
    id: '8',
    name: 'Everyday Seamless Hoodie Tank',
    color: 'Black',
    price: 'US$30',
    image: '/images/hoodie01.webp',
    imageHover: '/images/hoodie02.webp',
  },
  {
    id: '9',
    name: 'Vital Sports Tracktop',
    color: 'Black',
    price: 'US$45',
    image: '/images/hırka01.webp',
    imageHover: '/images/hırka02.webp',
  },
  {
    id: '10',
    name: 'Everyday Seamless Leggings',
    color: 'Black',
    price: 'US$50',
    image: '/images/legging01.webp',
    imageHover: '/images/legging02.webp',
    tag: { text: 'GIFTING FAVES 🎁', type: 'gifting' }
  }
];
</script>

<template>
  <section class="you-might-like-section">
    <div class="container">
      
      <div class="header">
        <h2 class="title">YOU MIGHT LIKE</h2>
        <p class="subtitle">We think these products pair perfectly.</p>
      </div>

      <div class="product-grid">
        
        <div 
          v-for="product in products" 
          :key="product.id" 
          class="product-card"
          @click="appRouter.goToProductDetail(product.id)"
        >
          
          <div class="image-container">
            <span v-if="product.tag" :class="['tag', product.tag.type]">
              {{ product.tag.text }}
            </span>
            <button class="wishlist-btn" @click.stop>
              <i class="bi bi-heart"></i>
            </button>
            
            <img :src="product.image" :alt="product.name" class="product-image img-main" />
            
            <img :src="product.imageHover" :alt="product.name + ' hover'" class="product-image img-hover" />
          </div>

          <div class="product-details">
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-color">{{ product.color }}</p>
            <p class="product-price">{{ product.price }}</p>
          </div>
          
        </div>

      </div>

    </div>
  </section>
</template>

<style scoped>
/* --- GENEL YAPI (AYNI KALDI) --- */
.you-might-like-section { padding: 60px 0; background-color: #fff; }
.container { max-width: 1600px; margin: 0 auto; padding: 0 40px; }
.header { text-align: left; margin-bottom: 20px; }
.title { font-size: 1.5rem; font-weight: 800; text-transform: uppercase; margin: 0 0 5px 0; color: #000; }
.subtitle { font-size: 0.95rem; color: #666; margin: 0; }
.product-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0; }
.product-card { cursor: pointer; display: flex; flex-direction: column; padding-right: 2px; padding-bottom: 10px; }

/* --- RESİM ALANI (GÜNCELLENDİ) --- */
.image-container {
  position: relative;
  aspect-ratio: 7/8;
  background-color: #f4f4f4;
  margin-bottom: 15px;
  overflow: hidden;
}

/* Ortak Resim Stilleri */
.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  /* Hem zoom hem opaklık geçişi için */
  transition: transform 0.3s ease, opacity 0.3s ease;
}

/* Hover Fotoğrafı: Ana fotonun tam üstüne oturur ve gizlenir */
.img-hover {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0; /* Başlangıçta görünmez */
  z-index: 1; /* Ana fotonun üstünde ama etiketlerin altında */
}

/* HOVER EFEKTLERİ */
/* 1. Kartın üzerine gelince İKİ resim de zoom yapsın */
.product-card:hover .product-image {
  transform: scale(1.05);
}

/* 2. Kartın üzerine gelince hover fotoğrafı görünür olsun */
.product-card:hover .img-hover {
  opacity: 1;
}


/* --- DİĞER STİLLER (AYNI KALDI) --- */
.tag { position: absolute; bottom: 10px; left: 10px; padding: 4px 8px; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; z-index: 2; border-radius: 2px; }
.tag.gifting { background-color: #fff; color: #000; }
.tag.new { background-color: #fff; color: #000; }
.wishlist-btn { position: absolute; top: 10px; right: 10px; width: 32px; height: 32px; background-color: #fff; border: none; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 2; font-size: 0.9rem; color: #000; }
.wishlist-btn:hover { background-color: #f0f0f0; }
.product-details { text-align: left; padding-left: 2px; }
.product-name { font-size: 0.85rem; font-weight: 600; margin: 0 0 4px 0; color: #000; line-height: 1.3; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.product-color { font-size: 0.8rem; color: #666; margin: 0 0 6px 0; }
.product-price { font-size: 0.95rem; font-weight: 700; color: #000; }
@media (max-width: 1200px) { .product-grid { grid-template-columns: repeat(4, 1fr); } }
@media (max-width: 992px) { .product-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 600px) { .product-grid { grid-template-columns: repeat(2, 1fr); } .container { padding: 0 20px; } }
</style>