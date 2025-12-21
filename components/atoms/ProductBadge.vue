<script setup lang="ts">
defineProps<{ text: string }>()
</script>

<template>
  <span class="tag">{{ text }}</span>
</template>

<style scoped>
.tag {
  /* Konumlandırma (absolute/bottom/left) buradan kaldırıldı.
     Bunu ProductCard içinde .badge-container ile yönetiyoruz.
     Böylece bu atomu başka yerlerde de kullanabilirsin. */
  
  display: inline-block;
  background: #ffffff; 
  color: #000; 
  
  padding: 5px 10px; 
  font-size: 0.75rem; 
  font-weight: 700; 
  border-radius: 4px;
  
  white-space: nowrap;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); 
}
</style>