<script setup lang="ts">
// Atomu import ediyoruz (Molecules klasöründen Atoms klasörüne çıkış)
import CartButton from '../atoms/CartButton.vue'
import { useUiStore } from '../../stores/ui'

const uiStore = useUiStore()
</script>

<template>
  <div class="empty-cart">
    <i class="bi bi-bag empty-cart-icon"></i>

    <h2 class="empty-title">YOUR BAG IS EMPTY</h2>
    <p class="empty-subtitle">There are no products in your bag</p>
    
    <div class="empty-actions">
      <CartButton to="/men" text="SHOP MENS" @click="uiStore.closeCart" />
      <CartButton to="/women" text="SHOP WOMENS" @click="uiStore.closeCart" />
    </div>
  </div>
</template>

<style scoped>
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
}

.empty-cart-icon {
  font-size: 4.5rem;
  color: #c0c0c0;
  margin-bottom: 1.5rem;
}

.empty-title {
  font-size: 1.25rem;
  font-weight: 800; /* Biraz daha kalın */
  text-transform: uppercase;
  margin: 0 0 0.5rem 0;
}

.empty-subtitle {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 2rem;
}

.empty-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 300px;
}
</style>