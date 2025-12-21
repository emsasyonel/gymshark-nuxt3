<script setup lang="ts">
// Atomları doğru klasörden import ediyoruz
import BannerHighlightTitle from '../atoms/BannerHighlightTitle.vue'
import BannerMainTitle from '../atoms/BannerMainTitle.vue'
import BannerDescription from '../atoms/BannerDescription.vue'
import UnderlinedActionLink from '../atoms/UnderlinedActionLink.vue'

defineProps<{
  titleHighlight: string
  titleMain: string
  description: string
  buttonText: string
}>()
</script>

<template>
  <div class="content">
    <BannerHighlightTitle :text="titleHighlight" />
    <BannerMainTitle :text="titleMain" />
    <BannerDescription :text="description" />
    <UnderlinedActionLink :text="buttonText" />
  </div>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
}
</style>