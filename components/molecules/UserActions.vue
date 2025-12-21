<script setup lang="ts">
// Store bağlantılarını yapıyoruz
import { useUiStore } from '../../stores/ui'
import { useCartStore } from '../../stores/cartStore' // Sepet sayısını göstermek için

const uiStore = useUiStore()
const cartStore = useCartStore()
</script>

<template>
  <div class="actions">
    <NuxtLink to="/wishlist" aria-label="Favoriler (Wishlist)">
      <i class="bi bi-heart"></i>
    </NuxtLink>
    
    <NuxtLink to="/login" aria-label="Hesabım (Account)">
      <i class="bi bi-person"></i>
    </NuxtLink>
    
    <button 
      type="button" 
      class="cart-button" 
      aria-label="Sepet (Bag)"
      @click="uiStore.toggleCart"
    >
      <i class="bi bi-bag"></i>
      
      <span v-if="cartStore.totalItems > 0" class="cart-badge">
        {{ cartStore.totalItems }}
      </span>
    </button>
  </div>
</template>

<style scoped>
.actions {
  display: flex;
  gap: 2.5rem;
  padding-left: 20px;
  align-items: center;
}
.actions a,
.actions .cart-button {
  text-decoration: none;
  color: #000;
  font-size: 1.3rem;
  line-height: 1;
  display: inline-block;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  position: relative; /* Badge için gerekli */
}
.actions .cart-button {
  background: none;
  border: none;
  cursor: pointer;
}

/* Sepet Sayacı (Badge) Stili */
.cart-badge {
  position: absolute;
  top: -5px;
  right: -8px;
  background-color: #000;
  color: #fff;
  font-size: 0.7rem;
  font-weight: bold;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>