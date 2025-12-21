<template>
<div class="logo">
  <NuxtLink to="/" class="logo-link">
    <img src="/images/logo-index.avif" alt="Gymshark Home" class="logo-img" />
  </NuxtLink>
</div>
</template>

<style scoped>
/* NuxtLink tarayıcıda 'a' etiketi olarak görünür, stil aynen çalışır */
/* Eski '.logo a' kodlarını sil ve bunları ekle */

.logo {
  /* Logonun dikeyde tam ortalanmasını garantiye alır */
  display: flex;
  align-items: center;
}

.logo-link {
  display: inline-block;
  /* Resmin altında istenmeyen boşluk kalmaması için */
  line-height: 0; 
  text-decoration: none;
}

.logo-img {
  /* HESAPLANMIŞ YÜKSEKLİK: 
     Eski yazının font boyutu ve paddingleri toplamda 
     yaklaşık bu kadar yer kaplıyordu. */
  height: 32px; 
  
  /* Genişlik otomatik ayarlanır, resim bozulmaz */
  width: 100px; 
  
  /* Resmin net görünmesini sağlar */
  object-fit: contain;
}
</style>