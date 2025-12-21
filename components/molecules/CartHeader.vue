<script setup lang="ts">
// Store bağlantısı
import { useUiStore } from '../../stores/ui'

const uiStore = useUiStore()
</script>

<template>
  <div class="panel-header">
    <h3 class="header-title">YOUR BAG</h3>
    
    <div class="header-actions">
      <div class="icon-group">
        <button class="action-btn-toggle" aria-label="Current tab: Bag">
          <i class="bi bi-bag-fill"></i>
        </button>
        
        <NuxtLink 
          to="/wishlist" 
          class="action-btn-wishlist" 
          aria-label="Go to Wishlist" 
          @click="uiStore.closeCart"
        >
          <i class="bi bi-heart"></i>
        </NuxtLink>
      </div>
      
      <button 
        @click="uiStore.closeCart" 
        class="action-btn-close" 
        aria-label="Close cart"
      >
        <i class="bi bi-x-lg"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
}
.header-title {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 800; /* Biraz daha kalın yaptım */
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Silindir Grup (Gymshark tarzı toggle) */
.icon-group {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 20px;
  padding: 4px;
}

.action-btn-toggle {
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 1rem;
  cursor: default; /* Bu zaten seçili olduğu için tıklanmaz */
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn-wishlist {
  background-color: transparent;
  color: #000;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  text-decoration: none; /* Link alt çizgisini kaldır */
}

.action-btn-wishlist:hover {
  background-color: #e0e0e0;
}

.action-btn-close {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.25rem;
  color: #000;
  transition: transform 0.2s;
}

.action-btn-close:hover {
  transform: rotate(90deg); /* Hoş bir dönme efekti */
}
</style>