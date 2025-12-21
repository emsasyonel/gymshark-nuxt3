<script setup lang="ts">
defineProps<{ size: string }>()
</script>

<template>
  <div class="size-box">{{ size }}</div>
</template>

<style scoped>
.size-box {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  color: #000;
  
  font-size: 0.85rem;
  font-weight: 500;
  
  /* Görseldeki genişlik */
  min-width: 45px; 
  height: 35px;
  
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.size-box:hover {
  background: #000;
  color: #fff;
  border-color: #000;
}
</style>