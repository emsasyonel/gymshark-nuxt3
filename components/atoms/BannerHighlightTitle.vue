<script setup lang="ts">
defineProps<{ text: string }>()
</script>

<template>
  <h2 class="title-highlight">{{ text }}</h2>
</template>

<style scoped>
.title-highlight {
  color: #56F5F5; /* Gymshark Turkuazı */
  font-size: 1.5rem;
  font-weight: 900;
  text-transform: uppercase;
  margin: 0;
  line-height: 1;
  letter-spacing: -0.5px;
}

/* Mobil uyumluluk */
@media (max-width: 768px) {
  .title-highlight {
    font-size: 1.2rem;
  }
}
</style>