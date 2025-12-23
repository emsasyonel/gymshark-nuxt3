<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useWishlistStore } from '~/stores/wishlistStore'
import { useCartStore } from '~/stores/cartStore'

const router = useRouter()
const wishlistStore = useWishlistStore()
const cartStore = useCartStore()

// Sayfa açıldığında favorileri yükle
onMounted(() => {
  wishlistStore.loadFromLocalStorage()
})

// Ürün detayına git
const goToProduct = (id: string) => {
  router.push(`/products/${id}`)
}

// Favoriden Çıkar
const removeFromWishlist = (product: any) => {
  wishlistStore.toggleWishlist(product)
}

// Hızlı Sepete Ekle (Overlay üzerinden)
const quickAddToCart = (product: any) => {
  const defaultSize = product.sizes ? product.sizes[0] : 'One Size'
  cartStore.addToCart(product, defaultSize)
  // İstersen burada bildirim gösterebilirsin
}

// Login ve Register yönlendirmeleri (Sayfaların varsa)
const goToLogin = () => router.push('/login')
const goToRegister = () => router.push('/register')
</script>

<template>
  <div class="page-content">
    <main class="main-content">
      
      <div v-if="wishlistStore.items.length === 0" class="empty-state-container">
        
        <div class="empty-content">
          <h2 class="empty-title">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" class="heart-icon-title">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
            SAVE TO WISHLIST
          </h2>

          <p class="empty-desc">
            Ever wish you could save all your fave fits & accessories in one place to come back to later? Almost like a ✨ wishlist ✨.
          </p>

          <div class="auth-buttons">
            <button class="btn-black" @click="goToRegister">CREATE ACCOUNT</button>
            <button class="btn-grey" @click="goToLogin">LOG IN</button>
          </div>
        </div>

      </div>

      <div v-else>
        <section class="wishlist-header">
          <h1 class="main-title">WISHLIST</h1>
          <p class="sub-text">{{ wishlistStore.items.length }} Items</p>
        </section>

        <div class="products-grid-container">
          <div class="product-grid">
            
            <div 
              v-for="product in wishlistStore.items" 
              :key="product.id" 
              class="product-card"
              @click="goToProduct(product.id)"
            >
              <div class="prod-image-wrapper">
                <button class="remove-btn" @click.stop="removeFromWishlist(product)">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <img :src="product.image" :alt="product.title" class="prod-img" />
                
                <div class="add-overlay" @click.stop="quickAddToCart(product)">
                  ADD TO BAG
                </div>
              </div>

              <div class="prod-info">
                <h3 class="prod-title">{{ product.title }}</h3>
                <p class="prod-desc">{{ product.color }}</p>
                <p class="prod-price">{{ product.price }}</p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </main>
  </div>
</template>

<style scoped>
/* --- TEMEL AYARLAR --- */
.page-content { background-color: #fff; min-height: 80vh; font-family: 'Roboto', 'Helvetica', sans-serif; display: flex; flex-direction: column; }
.main-content { flex: 1; max-width: 1600px; margin: 0 auto; width: 100%; padding: 0 30px; }

/* --- EMPTY STATE (FOTOĞRAFA GÖRE TASARIM) --- */
.empty-state-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh; /* Ekranın ortasında durması için */
  text-align: center;
}

.empty-content {
  max-width: 600px;
  padding: 20px;
}

/* Başlık ve Kalp İkonu */
.empty-title {
  font-size: 1.2rem;
  font-weight: 800; /* Kalın font */
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
  color: #000;
}

.heart-icon-title {
  width: 20px;
  height: 20px;
}

/* Açıklama Metni */
.empty-desc {
  font-size: 1rem;
  color: #444; /* Koyu gri */
  line-height: 1.6;
  margin-bottom: 30px;
  font-weight: 400;
}

/* Butonlar Grubu */
.auth-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
}

/* Siyah Buton (Create Account) */
.btn-black {
  background-color: #000;
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 30px; /* Hap şeklinde */
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.2s;
}
.btn-black:hover {
  transform: scale(1.05);
}

/* Gri Buton (Log In) */
.btn-grey {
  background-color: #555; /* Fotoğraftaki koyu gri tonu */
  color: #fff;
  border: none;
  padding: 12px 30px;
  border-radius: 30px; /* Hap şeklinde */
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 0.2s;
}
.btn-grey:hover {
  transform: scale(1.05);
  background-color: #333;
}


/* --- DOLU STATE HEADER (Standart) --- */
.wishlist-header { text-align: center; margin: 40px 0; padding-bottom: 20px; border-bottom: 1px solid #eee; }
.main-title { font-size: 2rem; font-weight: 900; letter-spacing: 1px; margin: 0; }
.sub-text { color: #666; margin-top: 5px; font-weight: 500; }

/* --- GRID VE KARTLAR (Öncekiyle Aynı) --- */
.products-grid-container { width: 100%; padding-bottom: 60px; }
.product-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px 15px; }

.product-card { display: flex; flex-direction: column; cursor: pointer; position: relative; }

.prod-image-wrapper { 
  position: relative; 
  aspect-ratio: 3/4; 
  background-color: #f5f5f5; 
  margin-bottom: 15px; 
  overflow: hidden; 
}
.prod-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
.product-card:hover .prod-img { transform: scale(1.03); }

.remove-btn {
  position: absolute; top: 10px; right: 10px;
  width: 30px; height: 30px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%; border: none;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; z-index: 5;
  transition: all 0.2s;
}
.remove-btn:hover { background: #000; color: #fff; }

.add-overlay {
  position: absolute; bottom: 0; left: 0; width: 100%;
  background: rgba(0, 0, 0, 0.8); color: #fff;
  text-align: center; padding: 12px 0;
  font-weight: 700; font-size: 0.9rem;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}
.product-card:hover .add-overlay { transform: translateY(0); }

.prod-info { text-align: left; }
.prod-title { font-size: 1rem; font-weight: 600; margin: 0 0 5px 0; line-height: 1.3; color: #000; }
.prod-desc { font-size: 0.9rem; color: #666; margin: 0 0 8px 0; }
.prod-price { font-size: 1rem; font-weight: 700; color: #000; }

/* --- RESPONSIVE --- */
@media (max-width: 1024px) {
  .product-grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 768px) {
  .product-grid { grid-template-columns: repeat(2, 1fr); }
  .empty-desc { padding: 0 20px; }
  .auth-buttons { flex-direction: column; gap: 10px; padding: 0 40px; }
}
</style>