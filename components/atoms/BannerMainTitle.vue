<script setup lang="ts">
defineProps<{ text: string }>()
</script>

<template>
  <h2 class="title-main">{{ text }}</h2>
</template>

<style scoped>
.title-main {
  color: #ffffff; /* Beyaz renk */
  font-size: 1.5rem;
  font-weight: 900;
  text-transform: uppercase;
  margin: 0;
  line-height: 1;
  letter-spacing: -0.5px;
}

/* Mobil uyumluluk */
@media (max-width: 768px) {
  .title-main {
    font-size: 1.2rem;
  }
}
</style>