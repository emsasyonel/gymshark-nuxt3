<script setup lang="ts">
// NuxtLink otomatik olarak gelir, import etmeye gerek yoktur
defineProps<{
  to: string
  text: string
}>()

const emit = defineEmits(['click'])
</script>

<template>
  <NuxtLink :to="to" class="btn-primary" @click="emit('click')">
    {{ text }}
  </NuxtLink>
</template>

<style scoped>
.btn-primary {
  display: inline-block;
  background-color: #000;
  color: #fff;
  padding: 0.8rem 1rem; /* Padding'i bir tık artırdım */
  text-decoration: none;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.9rem; 
  border: none;
  border-radius: 99px; /* Tam yuvarlak köşeler (Pill shape) */
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
.btn-primary:hover {
  background-color: #333;
  transform: translateY(-1px); /* Ufak bir hover hareketi */
}
.btn-primary:active {
  transform: translateY(1px);
}
</style>