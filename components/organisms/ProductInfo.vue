<script setup lang="ts">
import { ref } from 'vue';
import { useCartStore } from '~/stores/cartStore';

const props = defineProps<{
  product: any
}>();

const cartStore = useCartStore();
const selectedSize = ref<string | null>(null);
const errorMessage = ref('');

const addToBag = () => {
  if (!selectedSize.value) {
    errorMessage.value = 'Please select a size';
    return;
  }
  errorMessage.value = '';
  cartStore.addToCart(props.product, selectedSize.value);
};
</script>

<template>
  <div class="product-info-container">
    
    <h1 class="title">{{ product.name }}</h1>
    <p class="price">US${{ product.price }}</p>
    
    <div class="rating-row">
      <div class="stars">
        <i class="bi bi-star-fill"></i> 3.9
      </div>
      <div class="reviews">(367)</div>
      <div class="actions">
        <button><i class="bi bi-heart"></i></button>
        <button><i class="bi bi-share"></i></button>
      </div>
    </div>

    <div class="feature-box">
      <strong>LIGHTWEIGHT SEAMLESS MATERIAL 🍂</strong>
      <p>Great for running, cycling, light exercise, or just relaxing on your days off. Just don't do any squats in it (IYKYK).</p>
    </div>

    <div class="color-selection">
      <div class="color-thumb active"><img :src="product.image" /></div>
      <div class="color-thumb"><img :src="product.imageHover" /></div>
    </div>
    <p class="color-name">{{ product.color }}</p>

    <div class="size-selection">
      <div class="size-header">
        <span>Select a size</span>
        <button class="size-guide"><i class="bi bi-ruler"></i> Size Guide</button>
      </div>
      
      <div class="size-grid">
        <button 
          v-for="size in product.sizes" 
          :key="size"
          class="size-option"
          :class="{ active: selectedSize === size }"
          @click="selectedSize = size"
        >
          {{ size }}
        </button>
      </div>
      
      <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>
      
      <div class="fit-info">
        <i class="bi bi-check-circle-fill"></i> Customers say it fits <u>true to size</u>
      </div>
    </div>

    <button class="add-btn" @click="addToBag">ADD TO BAG</button>
    
    <div class="xp-info">
      <p><strong>Unlock Access to Exclusive Rewards & Benefits</strong></p>
      <p>Purchasing this product earns 360XP</p>
    </div>

    <div class="info-sections">
      <div class="info-section">
        <button class="section-header">
          <span>GET THE LOOK</span>
          <i class="bi bi-chevron-right"></i>
        </button>
    <div class="section-content look-content">
          <p class="look-text">Complete your fit with these:</p>
          <div class="look-thumbs">
            <div class="thumb-item">
               <img src="/images/kemer01.webp" alt="Socks" /> 
            </div>
            <div class="thumb-item">
               <img src="/images/bottle01.webp" alt="Shorts" />
            </div>
          </div>
        </div>
      </div>

      <div class="info-section">
        <button class="section-header">
          <span>DESCRIPTION</span>
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>
      <div class="info-section">
        <button class="section-header">
          <span>DELIVERY & RETURNS</span>
          <i class="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>

  </div>
</template>

<style scoped>
.product-info-container {
  padding: 40px;
  max-width: 500px;
}

.title { font-size: 1.5rem; font-weight: 800; text-transform: uppercase; margin: 0 0 5px 0; }
.price { font-size: 1.1rem; font-weight: 500; margin-bottom: 15px; }

.rating-row { display: flex; align-items: center; gap: 15px; margin-bottom: 25px; font-size: 0.9rem; }
.stars { background: #f4f4f4; padding: 4px 8px; border-radius: 4px; font-weight: bold; }
.actions button { background: none; border: 1px solid #ddd; border-radius: 50%; width: 35px; height: 35px; margin-left: 5px; cursor: pointer; }

.feature-box {
  background: #f9f9f9; padding: 15px; border-radius: 4px; font-size: 0.85rem; margin-bottom: 30px; line-height: 1.5;
}

.color-selection { display: flex; gap: 10px; margin-bottom: 5px; }
.color-thumb { width: 60px; height: 80px; border: 1px solid transparent; cursor: pointer; }
.color-thumb.active { border: 1px solid #000; }
.color-thumb img { width: 100%; height: 100%; object-fit: cover; }
.color-name { font-size: 0.85rem; color: #666; margin-bottom: 20px; }

.size-header { display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 10px; }
.size-guide { background: none; border: none; text-decoration: underline; cursor: pointer; }

.size-grid { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 15px; }
.size-option {
  flex: 1; min-width: 50px; height: 45px; background: #fff; border: 1px solid #e5e5e5;
  font-weight: bold; font-size: 0.9rem; cursor: pointer; transition: 0.2s;
}
.size-option:hover { border-color: #000; }
.size-option.active { background: #000; color: #fff; border-color: #000; }

.fit-info { font-size: 0.8rem; color: #006400; display: flex; align-items: center; gap: 5px; margin-bottom: 30px; }
.error-text { color: red; font-size: 0.8rem; margin-bottom: 10px; }

.add-btn {
  width: 100%; background: #000; color: #fff; padding: 18px;
  font-weight: 800; border: none; border-radius: 30px; cursor: pointer; font-size: 1rem;
  margin-bottom: 20px;
}

.xp-info { background: #f4f4f4; padding: 10px; font-size: 0.75rem; border-radius: 4px; margin-bottom: 20px; }

/* --- YENİ: ALT BÖLÜMLER --- */
.info-sections { border-top: 1px solid #e5e5e5; }
.info-section { border-bottom: 1px solid #e5e5e5; }
.section-header {
  width: 100%; display: flex; justify-content: space-between; align-items: center;
  padding: 15px 0; background: none; border: none; cursor: pointer;
  font-weight: 700; font-size: 0.9rem;
}
.section-content { padding-bottom: 15px; }

.look-content {
  padding-bottom: 20px;
}
.look-text {
  font-size: 0.8rem; color: #666; margin-bottom: 10px;
}
.look-thumbs {
  display: flex;
  gap: 15px; /* Fotoğraflar arası boşluk */
}
.thumb-item {
  width: 70px; /* Fotoğraf genişliği */
  height: 90px; /* Fotoğraf yüksekliği */
  background-color: #f4f4f4;
  overflow: hidden;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid #eee;
  transition: border-color 0.2s;
}
.thumb-item:hover {
  border-color: #000;
}
.thumb-item img {
  width: 100%; height: 100%; object-fit: cover;
}
</style>