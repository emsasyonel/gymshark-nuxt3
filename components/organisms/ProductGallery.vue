<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps<{
  images: string[]
}>();

const galleryRef = ref<HTMLElement | null>(null);
const scrollProgress = ref(0);

const handleScroll = () => {
  if (!galleryRef.value) return;
  const { scrollTop, scrollHeight, clientHeight } = galleryRef.value;
  const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
  scrollProgress.value = Math.min(Math.max(progress, 0), 100);
};

onMounted(() => {
  galleryRef.value?.addEventListener('scroll', handleScroll);
});
onUnmounted(() => {
  galleryRef.value?.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div class="gallery-wrapper">
    
    <div class="custom-scrollbar-track">
      <div class="custom-scrollbar-thumb" :style="{ top: `${scrollProgress}%` }"></div>
      <div class="scroll-arrow up"><i class="bi bi-chevron-up"></i></div>
      <div class="scroll-arrow down"><i class="bi bi-chevron-down"></i></div>
    </div>

    <div class="gallery-grid" ref="galleryRef">
      
      <div class="gallery-item small"><img :src="images[0]" /></div>
      <div class="gallery-item small"><img :src="images[1]" /></div>
      
      <div class="gallery-item large"><img :src="images[2]" /></div>
      
      <div class="gallery-item small"><img :src="images[3]" /></div>
      <div class="gallery-item small"><img :src="images[0]" /></div>

      <div class="gallery-item large"><img :src="images[1]" /></div>
      
      <div class="gallery-item small"><img :src="images[2]" /></div>
      <div class="gallery-item small"><img :src="images[3]" /></div>

    </div>
  </div>
</template>

<style scoped>
.gallery-wrapper {
  position: relative;
  width: 85%;
  height: 100vh; /* Ekran boyu */
  overflow: hidden;
}

/* --- ESKİ SCROLLBAR CSS --- */
.custom-scrollbar-track {
  position: absolute;
  left: 20px; /* Soldan boşluk */
  top: 50%;
  transform: translateY(-50%);
  height: 300px;
  width: 4px;
  background-color: rgba(200,200,200,0.4);
  border-radius: 10px;
  z-index: 20;
  display: flex; flex-direction: column; justify-content: space-between; align-items: center;
}
.custom-scrollbar-thumb {
  position: absolute; left: -2px; width: 8px; height: 60px;
  background-color: #000; border-radius: 10px; transition: top 0.1s linear;
}
.scroll-arrow { position: absolute; font-size: 0.9rem; color: #333; left: -5px; }
.scroll-arrow.up { top: -25px; }
.scroll-arrow.down { bottom: -25px; }

/* --- GRID YAPISI --- */
.gallery-grid {
  display: grid;
  grid-template-columns: 50% 50%;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  gap: 0; /* BOŞLUK YOK */
  padding: 0; /* PADDING YOK - SOLA YAPIŞIR */
  scrollbar-width: none;
}
.gallery-grid::-webkit-scrollbar { display: none; }

/* KUTULAR VE RESİMLER */
.gallery-item {
  width: 100%;
  position: relative;
  /* Önemli: Overflow hidden demeyelim ki resim sığsın */
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Resmi kutuya yay, boşluk bırakma */
  display: block;
}

/* --- YÜKSEKLİK AYARLARI (UZATMA İŞLEMİ BURADA) --- */

.gallery-item.small {
  /* Küçükler bile ekranın %80'i kadar olsun */
  height: 80vh; 
}

.gallery-item.large {
  grid-column: span 2;
  /* --- İŞTE BURASI: KUTU YÜKSEKLİĞİ --- */
  /* Ekranın 2 katı kadar yükseklik veriyoruz. */
  /* İçindeki resim de object-fit: cover ile bu 2 katlık alana yayılacak */
  height: 200vh; 
}

@media (max-width: 768px) {
  .gallery-grid { grid-template-columns: 1fr; }
  .custom-scrollbar-track { display: none; }
  .gallery-item.small { height: 60vh; }
  .gallery-item.large { height: 100vh; }
}
</style>