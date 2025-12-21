<script setup lang="ts">
// İlerde buraya Pinia Store bağlayıp favori işlemlerini yapacağız
</script>

<template>
  <button class="wishlist-btn" aria-label="Add to Wishlist">
    <i class="bi bi-heart"></i>
  </button>
</template>

<style scoped>
.wishlist-btn {
  /* Konumlandırma kodları kaldırıldı, parent bileşen yönetiyor */
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  color: #000;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.wishlist-btn:hover {
  background: #fff;
  transform: scale(1.1); /* Hafif büyüme efekti */
}
</style>