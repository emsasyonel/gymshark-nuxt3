<script setup lang="ts">
defineProps<{
  title: string
  subtext?: string
  iconClass?: string
  hasLogo?: boolean
}>()
</script>

<template>
  <NuxtLink to="#" class="more-block">
    <div class="block-image-placeholder">
      <span v-if="hasLogo">{{ title }}</span>
      <i v-if="iconClass" :class="iconClass"></i>
    </div>
    <span>{{ title }}</span>
    <span v-if="subtext" class="subtext">{{ subtext }}</span>
  </NuxtLink>
</template>

<style scoped>
.more-block {
  background-color: #e6e6e6;
  color: #000;
  padding-bottom: 1rem;
  text-decoration: none;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  font-size: 0.9rem;
  transition: background-color 0.2s; /* Yumuşak geçiş eklendi */
}
.more-block:hover {
  background-color: #dcdcdc;
}

.block-image-placeholder {
  background-color: #000;
  color: #fff;
  width: 100%;
  height: 120px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1rem;
  padding: 0.5rem;
}
.block-image-placeholder i {
  font-size: 2.5rem;
}
.subtext {
  font-size: 0.8rem;
  font-weight: 400;
  text-transform: none;
  margin-top: 4px;
}
</style>