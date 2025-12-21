<script setup lang="ts">
defineProps<{
  direction: 'left' | 'right'
}>()

const emit = defineEmits(['click'])
</script>

<template>
  <button 
    class="nav-arrow" 
    @click="emit('click')" 
    :aria-label="direction === 'left' ? 'Previous' : 'Next'"
  >
    <i v-if="direction === 'left'" class="bi bi-chevron-left"></i>
    <i v-else class="bi bi-chevron-right"></i>
  </button>
</template>

<style scoped>
.nav-arrow {
  background: #a4a4a4; /* Biraz daha yumuşak bir gri (Gymshark stili) */
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease; /* Animasyon ekledik */
}

/* Üzerine gelince koyulaşsın */
.nav-arrow:hover {
  background: #000;
  transform: scale(1.05);
}

.nav-arrow:active {
  transform: scale(0.95);
}
</style>