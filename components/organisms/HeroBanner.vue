<script setup lang="ts">
const heroImageUrl = '/images/image.avif'
</script>

<template>
  <section class="hero-section" :style="{ backgroundImage: `url(${heroImageUrl})` }">
    <div class="hero-overlay"></div>

    <div class="hero-content">
      <h1 class="hero-title">BLACK FRIDAY</h1>
      <h2 class="hero-subtitle-cyan">
        UP TO 50% OFF<br>
        EVERYTHING
      </h2>
      
      <div class="hero-actions">
        <NuxtLink to="#" class="hero-link-btn">Shop Women's</NuxtLink>
        <NuxtLink to="#" class="hero-link-btn">Shop Men's</NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  
  width: calc(100% - 20px); 
  max-width: 1800px; 
  height: 80vh; 
  
  margin: 0 auto; 
  margin-bottom: 50px; 
  border-radius: 8px;
  overflow: hidden;
  
  /* KRİTİK NOKTA 1: İçerik buna göre konumlanacak */
  position: relative; 
  font-family: 'Roboto', sans-serif;
}

/* Sadece Karartma Efekti (Konumlandırma görevi alındı) */
.hero-overlay {
  position: absolute; /* Arka planda kalması için */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 50%);
  z-index: 1; /* Resmin üstünde ama yazının altında */
}

/* KRİTİK NOKTA 2: İçeriği elle çiviliyoruz */
.hero-content {
  position: absolute; /* Flex'ten bağımsız, özgür konumlandırma */
  z-index: 2; /* Gradyanın üstüne çık */
  
  /* En alttan tam 20px yukarıda dur */
  bottom: 80px; 
  /* Soldan 50px içeride dur */
  left: 50px;
  
  text-align: left;
  /* Genişlik sınırı koymazsak yazı tek satıra uzayabilir, o yüzden: */
  width: auto; 
  max-width: 80%; /* Çok uzarsa mobilde taşmasın */
}

/* Yazı Stilleri (Aynı) */
.hero-title {
  color: #ffffff;
  font-size: 4rem;
  font-weight: 900;
  text-transform: uppercase;
  margin: 0;
  line-height: 0.9;
  letter-spacing: -1px;
}

.hero-subtitle-cyan {
  color: #56F5F5;
  font-size: 4rem;
  font-weight: 900;
  text-transform: uppercase;
  margin: 0;
  line-height: 0.9;
  letter-spacing: -1px;
}

.hero-actions {
  display: flex;
  gap: 20px;
  margin-top: 15px;
}

.hero-link-btn {
  color: #ffffff;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 700;
  text-transform: capitalize;
  border-bottom: 2px solid #ffffff; 
  padding-bottom: 2px;
  transition: opacity 0.2s;
}

.hero-link-btn:hover {
  opacity: 0.8;
}

/* MOBİL UYUMLULUK */
@media (max-width: 768px) {
  .hero-section {
    height: 60vh;
  }
  
  /* Mobilde sol boşluk biraz azalmalı */
  .hero-content {
    left: 20px; 
    bottom: 20px; /* Mobilde de 20px kalsın */
  }

  .hero-title, 
  .hero-subtitle-cyan {
    font-size: 2.5rem; 
  }
}
</style>