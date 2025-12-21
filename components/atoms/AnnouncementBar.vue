<template>
  <div class="announcement-bar">
    <p>Free standard shipping on orders over $75 🚚</p>
  </div>
</template>

<style scoped>
.announcement-bar {
  background-color: rgb(233, 233, 233); 
  color: #000; 
  padding: 0.6rem 1rem;
  display: flex;
  justify-content: center; 
  align-items: center;
  font-family: 'Roboto', sans-serif; 
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 1px;
  width: 100%; /* Tam genişlik */
}

.announcement-bar p {
  margin: 0;
  font-size: 0.85rem;
  font-weight: 700; /* Biraz daha kalın yaptım okunurluk için */
  text-align: center;
}
</style>