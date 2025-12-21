<script setup lang="ts">
// Molekülü doğru klasörden import ediyoruz
import EmailBannerContent from '../molecules/EmailBannerContent.vue'

defineProps<{
  titleHighlight: string
  titleMain: string
  description: string
  buttonText: string
}>()
</script>

<template>
  <section class="email-banner">
    <div class="container">
      
      <EmailBannerContent 
        :title-highlight="titleHighlight"
        :title-main="titleMain"
        :description="description"
        :button-text="buttonText"
      />

    </div>
  </section>
</template>

<style scoped>
.email-banner {
  background-color: #000000;
  color: #ffffff;
  padding: 4rem 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Container: 1800px kuralı ve ortalama */
.container {
  width: 100%;
  max-width: 1800px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  justify-content: center;
}
</style>