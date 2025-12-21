<template>
  <div class="search-bar">
    <button aria-label="Aramayı başlat"><i class="bi bi-search"></i></button>
    <input type="text" placeholder="what are you looking for today?" />
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  /* Görseldeki gibi açık gri arka plan */
  background-color: #f5f5f5; 
  /* Kenarlık kaldırıldı */
  border: none; 
  border-radius: 4px; /* Hafif köşe, tam yuvarlak değil */
  padding: 0.5rem 0.8rem;
  width: 250px; /* Genişlik sabitleme */
}
.search-bar input {
  border: none;
  outline: none;
  background: transparent;
  font-size: 0.9rem;
  flex: 1;
  min-width: 0; /* Flexbox taşmasını önler */
  color: #666;
}
.search-bar input::placeholder {
  color: #999;
}
.search-bar button {
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  margin-right: 0.5rem; /* İkon solda */
  font-size: 1.1rem;
  color: #333;
}
</style>