<script setup lang="ts">
import { ref } from 'vue'
// Atomları import ediyoruz
import ProductBadge from '../atoms/ProductBadge.vue'
import WishlistButton from '../atoms/WishlistButton.vue'
import SizeBox from '../atoms/SizeBox.vue'

// TypeScript Tip Tanımı
// Slider'dan gelen verilerle uyumlu hale getirildi
export interface Product {
  id: string | number; // Hem sayı hem yazı olabilir
  name: string;
  category?: string;
  rating?: number;
  fit?: string; 
  color?: string; 
  price: number;
  originalPrice?: number;
  imageUrl: string;
  hoverImageUrl?: string;
  tag?: string;
  sizes?: string[];
}

defineProps<{ product: Product }>()

const isHovered = ref(false)
</script>

<template>
  <div 
    class="product-card"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="card-image-wrapper">
      
      <img 
        :src="product.imageUrl" 
        :alt="product.name" 
        class="product-image main-img"
        :class="{ 'hidden': isHovered && product.hoverImageUrl }"
      >
      
      <img 
        v-if="product.hoverImageUrl"
        :src="product.hoverImageUrl" 
        :alt="product.name" 
        class="product-image hover-img"
        :class="{ 'visible': isHovered }"
      >

      <div v-if="product.tag" class="badge-container">
        <ProductBadge :text="product.tag" />
      </div>
      
      <div class="wishlist-pos">
        <WishlistButton />
      </div>

      <div 
        v-if="product.sizes && product.sizes.length > 0" 
        class="size-overlay"
        :class="{ 'show': isHovered }"
      >
        <div class="size-grid">
          <SizeBox 
            v-for="size in product.sizes" 
            :key="size" 
            :size="size" 
          />
        </div>
      </div>

    </div>
    
    <div class="card-info">
      
      <div v-if="product.rating" class="rating-row">
        <i class="bi bi-star-fill"></i>
        <span class="rating-score">{{ product.rating }}</span>
      </div>

      <h3 class="product-name">{{ product.name }}</h3>
      
      <p class="product-fit">{{ product.fit }}</p>
      
      <div class="price-row">
        <span class="price">
          US${{ product.price }}
        </span>
        <span v-if="product.originalPrice" class="old-price">
          US${{ product.originalPrice }}
        </span>
      </div>

    </div>

  </div>
</template>

<style scoped>
.product-card {
  /* Genişliği Slider belirleyecek, burası esnek olmalı */
  width: 100%; 
  display: flex;
  flex-direction: column;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  position: relative;
}

/* --- RESİM ALANI --- */
.card-image-wrapper {
  position: relative;
  width: 100%;
  padding-bottom: 125%; /* 4:5 Oranı */
  background-color: #f5f3f0;
  margin-bottom: 0.8rem;
  overflow: hidden;
}

.product-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
}

.main-img { opacity: 1; }
.main-img.hidden { opacity: 0; }
.hover-img { opacity: 0; }
.hover-img.visible { opacity: 1; }

.badge-container {
  position: absolute;
  bottom: 10px;
  left: 10px;
  z-index: 2;
}

.wishlist-pos {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 3;
}

/* Beden Seçici */
.size-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.95);
  padding: 10px;
  transform: translateY(100%);
  transition: transform 0.25s ease-in-out;
  z-index: 4;
}
.size-overlay.show {
  transform: translateY(0);
}

.size-grid {
  display: flex;
  justify-content: center;
  gap: 5px;
  flex-wrap: wrap;
}

/* --- BİLGİ ALANI --- */
.card-info { 
  text-align: left;
  padding-right: 10px; 
}

.rating-row {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.8rem;
  color: #000;
  margin-bottom: 4px;
}
.rating-row i {
  font-size: 0.75rem;
}
.rating-score { font-weight: 600; }

.product-name {
  font-size: 1rem;
  font-weight: 400;
  color: #000;
  margin: 0 0 2px 0;
  line-height: 1.3;
}

.product-fit {
  font-size: 0.9rem;
  color: #666;
  margin: 0 0 8px 0;
}

.price-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.price {
  font-weight: 700;
  color: #000;
  font-size: 1rem;
}
.old-price {
  text-decoration: line-through;
  color: #d32f2f;
  font-size: 0.9rem;
  font-weight: 400;
}
</style>