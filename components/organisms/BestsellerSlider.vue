<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
// Router Servisimizi çağırıyoruz (Temiz Mimari)
import { useAppRouter } from '~/composables/useAppRouter';
// Store'lar
import { useProductStore } from '~/stores/productStore';
import { useCartStore } from '~/stores/cartStore';

// Bileşenler
import CartSidebar from '~/components/organisms/CartSidebar.vue';

// Servis ve Store Kurulumu
const appRouter = useAppRouter();
const productStore = useProductStore();
const cartStore = useCartStore();

// Verileri Reaktif Alma
const { products, loading } = storeToRefs(productStore);

// Sayfa Yüklendiğinde Ürünleri Çek
onMounted(() => {
  productStore.fetchProducts();
});

// Sepete Ekleme Fonksiyonu
const handleAddToCart = (product: any, size: string) => {
  cartStore.addToCart(product, size);
};

// Slider Scroll İşlemleri
const carouselViewport = ref<HTMLElement | null>(null);
const scrollLeft = () => carouselViewport.value?.scrollBy({ left: -320, behavior: 'smooth' });
const scrollRight = () => carouselViewport.value?.scrollBy({ left: 320, behavior: 'smooth' });
</script>

<template>
  <section class="bestseller-slider">
    
    <CartSidebar />

    <div class="carousel-container-override">
      
      <div class="carousel-header">
        <div class="header-left">
          <h2>BESTSELLERS UP TO 50% OFF</h2>
          <a href="#" class="view-all">View All</a>
        </div>
        <div class="header-right">
          <button class="nav-arrow" @click="scrollLeft"><i class="bi bi-chevron-left"></i></button>
          <button class="nav-arrow" @click="scrollRight"><i class="bi bi-chevron-right"></i></button>
        </div>
      </div>

      <div v-if="loading" class="loading-msg">
        <div class="spinner"></div> Yükleniyor...
      </div>

      <div v-else class="carousel-viewport" ref="carouselViewport">
        <div class="carousel-track">
          
          <div 
            v-for="product in products" 
            :key="product.id" 
            class="product-card"
            @click="appRouter.goToProductDetail(product.id)"
          >
            
            <div class="image-wrapper">
              <div v-if="product.tag" class="tag-badge">{{ product.tag }}</div>
              
              <button class="wishlist-btn" @click.stop>
                <i class="bi bi-heart"></i>
              </button>

              <img :src="product.image" class="img-main" :alt="product.name" />
              <img :src="product.imageHover" class="img-hover" :alt="product.name" />
            </div>

            <div class="size-row">
              <button 
                v-for="size in product.sizes" 
                :key="size" 
                class="size-box"
                @click.stop="handleAddToCart(product, size)"
              >
                {{ size }}
              </button>
            </div>

            <div class="product-info">
              <div class="rating">
                <i class="bi bi-star-fill"></i> {{ product.rating }}
              </div>
              <h3 class="title">{{ product.name }}</h3>
              <p class="subtitle">{{ product.color }}</p>
              <div class="price-box">
                <span class="price-curr">US${{ product.price }}</span>
                <span v-if="product.originalPrice" class="price-orig">US${{ product.originalPrice }}</span>
              </div>
            </div>

          </div>
          </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* --- GENEL AYARLAR --- */
.bestseller-slider { padding: 3rem 0; background: #fff; width: 100%; }
.carousel-container-override { max-width: 1800px; margin: 0 auto; padding: 0 40px; }

/* HEADER */
.carousel-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
.header-left h2 { font-size: 1.5rem; font-weight: 900; margin: 0; text-transform: uppercase; display: inline-block; }
.view-all { font-size: 0.9rem; text-decoration: underline; color: #000; font-weight: 600; margin-left: 15px; }
.header-right { display: flex; gap: 8px; }
.nav-arrow { width: 40px; height: 40px; border-radius: 50%; border: 1px solid #ddd; background: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.2s; }
.nav-arrow:hover { background: #000; color: #fff; border-color: #000; }

/* LOADING */
.loading-msg { text-align: center; padding: 40px; font-size: 1.2rem; color: #666; }

/* SLIDER TRACK */
.carousel-viewport { overflow-x: auto; padding-bottom: 20px; scrollbar-width: none; scroll-behavior: smooth; }
.carousel-viewport::-webkit-scrollbar { display: none; }
.carousel-track { display: flex; gap: 20px; }

/* --- KART TASARIMI --- */
.product-card { 
  min-width: 280px; width: 22%; flex-shrink: 0; 
  cursor: pointer; position: relative; 
}

/* RESİM */
.image-wrapper { position: relative; aspect-ratio: 3/4; background: #f4f4f4; overflow: hidden; margin-bottom: 10px; }
.img-main, .img-hover { width: 100%; height: 100%; object-fit: cover; transition: opacity 0.3s ease; }
.img-hover { position: absolute; top: 0; left: 0; opacity: 0; }
.product-card:hover .img-hover { opacity: 1; }

/* ETİKETLER & BUTONLAR */
.tag-badge { position: absolute; top: 10px; left: 10px; background: #fff; padding: 4px 8px; font-weight: 800; font-size: 0.7rem; z-index: 2; text-transform: uppercase; }
.wishlist-btn { 
  position: absolute; top: 10px; right: 10px; 
  background: #fff; border-radius: 50%; width: 35px; height: 35px; 
  border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 5;
  transition: 0.2s;
}
.wishlist-btn:hover { background: #f0f0f0; }

/* --- BEDEN KUTULARI (QUICK ADD) --- */
.size-row { display: flex; gap: 6px; margin-bottom: 12px; }
.size-box {
  flex: 1; /* Eşit genişlik */
  padding: 8px 0;
  background: #fff; 
  border: 1px solid #e5e5e5; 
  color: #000; 
  font-weight: 700; font-size: 0.8rem; 
  cursor: pointer; 
  transition: all 0.2s ease;
}
.size-box:hover {
  background: #000; 
  color: #fff; 
  border-color: #000;
}

/* BİLGİLER */
.product-info { text-align: left; }
.rating { font-size: 0.8rem; font-weight: 700; margin-bottom: 6px; display: flex; gap: 4px; align-items: center; }
.rating i { font-size: 0.75rem; }
.title { font-size: 1rem; font-weight: 600; margin: 0 0 4px 0; color: #000; line-height: 1.3; }
.subtitle { color: #666; font-size: 0.9rem; margin: 0 0 8px 0; }
.price-box { font-weight: 700; font-size: 1rem; display: flex; gap: 8px; align-items: center; }
.price-orig { text-decoration: line-through; color: #d32f2f; font-weight: 400; font-size: 0.9rem; }

/* MOBİL AYARLARI */
@media (max-width: 768px) {
  .product-card { min-width: 180px; width: 45%; }
  .carousel-container-override { padding: 0 20px; }
  .nav-arrow { display: none; } /* Mobilde okları gizle */
  /* Mobilde beden butonlarını gizleyip sadece detayda göstermek istersen: */
  /* .size-row { display: none; } */
}
</style>