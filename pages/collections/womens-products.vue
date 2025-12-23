<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useNuxtApp } from '#app'
import { collection, getDocs } from 'firebase/firestore'
import { useCartStore } from '~/stores/cartStore'
import { useWishlistStore } from '~/stores/wishlistStore'



const wishlistStore = useWishlistStore()

// Sayfa yüklendiğinde favorileri hafızadan geri getir:
onMounted(() => {
  wishlistStore.loadFromLocalStorage() // <-- Bunu ekle
  fetchProducts()
})

// Kalp butonuna basınca çalışacak fonksiyon:
const toggleWishlist = (product: any) => {
  wishlistStore.toggleWishlist(product)
}


// --- 1. FIREBASE & ROUTER KURULUMU ---
const router = useRouter()
const { $db } = useNuxtApp()
const cartStore = useCartStore()

// --- SAYFA BAŞLIK VERİLERİ ---
const pageInfo = ref({
  breadcrumb: 'WOMENS',
  title: 'BEST SELLERS',
  productCount: 'Loading...',
  description: 'Everyone loves them, and so will you.'
})

// --- 5'Lİ KATEGORİ VİTRİNİ ---
const bestSellerCategories = ref<any[]>([])

// --- FİLTRE VERİLERİ ---
const openFilters = ref<{ [key: string]: boolean }>({
  sortBy: true, productType: true, size: true, features: false, fit: false, 
  activity: false, collection: false, color: false, price: false
})

const toggleFilter = (filterName: string) => {
  openFilters.value[filterName] = !openFilters.value[filterName]
}

// -- DATA SETLERİ --
const filterOptions = {
  productTypes: ['Hoodies & Sweatshirts', 'Joggers', 'Women\'s Underwear & Basics', 'Vests', 'Leggings', 'Sports Bras', 'Shorts', 'T-Shirts & Tops', 'Long Sleeve', 'All Accessories'],
  sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'No Size'],
  features: ['Seamless', 'Lightweight', 'Breathable', 'Sweat Wicking', 'Bum Scrunch', 'Pockets', 'Adjustable Waistbands'],
  fits: ['Regular', 'Light Support', 'Oversized Fit', 'Regular Fit', 'Compression Fit', 'High Support', 'Medium Support', 'Short', 'Tall'],
  activities: ['Conditioning', 'Lifting', 'Pilates'],
  collections: ['Essentials', 'Gs X Ws', 'Apex', 'Everyday', 'Lift Seamless', 'Fundamental Sports Bras', 'Everyday Seamless', 'To From', 'Vital', 'Lifting Goods', 'Training', 'Crest', 'Gymshark Power', 'Sharkhead', 'Collegiate', 'Conditioning Goods'],
  colors: [
    { name: 'Black', hex: '#000000' }, { name: 'Blue', hex: '#3b5998' }, { name: 'Brown', hex: '#654321' }, 
    { name: 'White', hex: '#ffffff', border: true }, { name: 'Pink', hex: '#e75480' }, { name: 'Purple', hex: '#800080' }, 
    { name: 'Grey', hex: '#808080' }, { name: 'Green', hex: '#228b22' }, { name: 'Red', hex: '#cc0000' }
  ],
  prices: ['US$10 - US$20', 'US$20 - US$30', 'US$30 - US$50', 'US$50 - US$75', 'US$75 - US$100']
}

// --- ÜRÜN VERİLERİ (FIREBASE'DEN GELECEK) ---
const products = ref<any[]>([])
const loading = ref(true)

// --- FIREBASE VERİ ÇEKME FONKSİYONU ---
const fetchProducts = async () => {
  try {
    loading.value = true
    const querySnapshot = await getDocs(collection($db as any, 'products'))
    const fetchedData: any[] = []

    querySnapshot.forEach((doc) => {
      const data = doc.data()
      fetchedData.push({
        id: doc.id,
        title: data.name || data.title || 'Product',
        price: data.price ? `US$${data.price}` : 'US$0',
        color: data.color || 'Multi',
        fit: data.fit || 'Regular',
        rating: data.rating || 5.0,
        
        // --- RESİM MANTIĞI ---
        // Ana resim
        image: data.imageUrl || data.image || 'https://via.placeholder.com/300x400',
        // Hover resmi (Yoksa ana resmi kullanır)
        imageHover: data.imageHoverUrl || data.imageHover || data.imageUrl || 'https://via.placeholder.com/300x400',
        
        // --- BEDENLER ---
        sizes: data.sizes || ['XS', 'S', 'M', 'L', 'XL'],
        
        tag: data.tag ? { text: data.tag, type: 'gifting' } : null
      })
    })

    products.value = fetchedData
    bestSellerCategories.value = fetchedData.slice(0, 5)
    pageInfo.value.productCount = `${fetchedData.length} Products`
  } catch (error) {
    console.error("Firebase Hatası:", error)
    pageInfo.value.productCount = "0 Products"
  } finally {
    loading.value = false
  }
}

// Sayfa yüklendiğinde çalıştır
onMounted(() => {
  fetchProducts()
})

// Ürün Detayına Git
const goToProduct = (id: string) => {
  router.push(`/products/${id}`)
}

// Sepete Ekle (Overlay butonuna basınca)
const addToCart = (product: any, size: string) => {
  // Store'daki ekleme fonksiyonunu tetikliyoruz
  // Not: BestSellerSlider'daki yapının aynısını kullandım.
  cartStore.addToCart(product, size);
  
  // İstersen buraya bir bildirim (Toast message) ekleyebilirsin
  console.log(`${product.title} - ${size} sepete eklendi!`)
}
</script>

<template>
  <div class="page-content">
    
    <main class="main-content">
      
<section class="collection-header">
        <div class="header-text">
          <span class="breadcrumb-text">{{ pageInfo.breadcrumb }}</span>
          <h1 class="main-title">{{ pageInfo.title }}</h1>
          <div class="sub-info">
            <span class="product-count">{{ pageInfo.productCount }}</span>
            <p class="desc-text">{{ pageInfo.description }}</p>
          </div>
        </div>
        
        <div class="category-grid">
          <div 
            v-for="cat in bestSellerCategories" 
            :key="cat.id" 
            class="category-card"
            @click="goToProduct(cat.id)" 
          > 
            <div class="image-wrapper">
              <span v-if="cat.tag" class="pop-tag">{{ cat.tag.text }}</span>
              <img :src="cat.image" :alt="cat.title" class="cat-img" />
            </div>
            
            <div class="card-footer">
              <span class="cat-name">{{ cat.title }}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="products-area-wrapper">
        
        <aside class="filter-sidebar">
          
          <div class="filter-header">
            <h3>FILTER & SORT</h3>
            <button class="clear-btn">Clear All</button>
          </div>

          <div class="filter-group">
            <button class="filter-title" @click="toggleFilter('sortBy')">
              <span>SORT BY</span>
              <span class="chevron" :class="{'rotate-180': openFilters.sortBy}">
                <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 1L6 6L1 1" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
            </button>
            <div v-if="openFilters.sortBy" class="filter-content">
              <label class="custom-radio-container">Price: Low to High <input type="radio" name="sort"><span class="checkmark-circle"></span></label>
              <label class="custom-radio-container">Price: High to Low <input type="radio" name="sort"><span class="checkmark-circle"></span></label>
              <label class="custom-radio-container">Relevancy <input type="radio" checked name="sort"><span class="checkmark-circle"></span></label>
              <label class="custom-radio-container">Newest <input type="radio" name="sort"><span class="checkmark-circle"></span></label>
            </div>
          </div>

          <div class="filter-group">
            <button class="filter-title" @click="toggleFilter('productType')">
              <span>PRODUCT TYPE</span>
              <span class="chevron" :class="{'rotate-180': openFilters.productType}">
                <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 1L6 6L1 1" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
            </button>
            <div v-if="openFilters.productType" class="filter-content vertical-list">
               <button v-for="type in filterOptions.productTypes" :key="type" class="clean-list-btn">{{ type }}</button>
            </div>
          </div>

          <div class="filter-group">
            <button class="filter-title" @click="toggleFilter('size')">
              <span>SIZE</span>
              <span class="chevron" :class="{'rotate-180': openFilters.size}">
                <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 1L6 6L1 1" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
            </button>
            <div v-if="openFilters.size" class="filter-content grid-3">
               <button v-for="size in filterOptions.sizes" :key="size" class="grid-btn">{{ size }}</button>
            </div>
          </div>

          <div class="filter-group">
            <button class="filter-title" @click="toggleFilter('features')">
              <span>FEATURES</span>
              <span class="chevron" :class="{'rotate-180': openFilters.features}">
                 <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 1L6 6L1 1" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
            </button>
            <div v-if="openFilters.features" class="filter-content vertical-list">
               <button v-for="feat in filterOptions.features" :key="feat" class="clean-list-btn">{{ feat }}</button>
            </div>
          </div>

          <div class="filter-group">
            <button class="filter-title" @click="toggleFilter('fit')">
              <span>FIT</span>
              <span class="chevron" :class="{'rotate-180': openFilters.fit}">
                 <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 1L6 6L1 1" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
            </button>
            <div v-if="openFilters.fit" class="filter-content vertical-list">
               <button v-for="fit in filterOptions.fits" :key="fit" class="clean-list-btn">{{ fit }}</button>
            </div>
          </div>

          <div class="filter-group">
            <button class="filter-title" @click="toggleFilter('activity')">
              <span>ACTIVITY</span>
              <span class="chevron" :class="{'rotate-180': openFilters.activity}">
                 <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 1L6 6L1 1" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
            </button>
            <div v-if="openFilters.activity" class="filter-content vertical-list">
               <button v-for="act in filterOptions.activities" :key="act" class="clean-list-btn">{{ act }}</button>
            </div>
          </div>

          <div class="filter-group">
            <button class="filter-title" @click="toggleFilter('collection')">
              <span>COLLECTION</span>
              <span class="chevron" :class="{'rotate-180': openFilters.collection}">
                 <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 1L6 6L1 1" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
            </button>
            <div v-if="openFilters.collection" class="filter-content vertical-list">
               <button v-for="col in filterOptions.collections" :key="col" class="clean-list-btn">{{ col }}</button>
            </div>
          </div>

          <div class="filter-group">
            <button class="filter-title" @click="toggleFilter('color')">
              <span>COLOR</span>
              <span class="chevron" :class="{'rotate-180': openFilters.color}">
                 <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 1L6 6L1 1" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
            </button>
            <div v-if="openFilters.color" class="filter-content color-grid">
               <div v-for="color in filterOptions.colors" :key="color.name" class="color-item">
                  <div 
                    class="color-circle" 
                    :style="{ backgroundColor: color.hex, border: color.border ? '1px solid #ddd' : 'none' }"
                  ></div>
                  <span class="color-name">{{ color.name }}</span>
               </div>
            </div>
          </div>

          <div class="filter-group">
            <button class="filter-title" @click="toggleFilter('price')">
              <span>PRICE</span>
              <span class="chevron" :class="{'rotate-180': openFilters.price}">
                 <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 1L6 6L1 1" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
            </button>
            <div v-if="openFilters.price" class="filter-content grid-2">
               <button v-for="price in filterOptions.prices" :key="price" class="grid-btn">{{ price }}</button>
            </div>
          </div>

        </aside>

        <div class="products-grid-container">
          <div class="promo-banner">
            <span class="emoji">🎁</span>
            <div class="promo-text">
              <strong>GET THEM A GIFT CARD</strong>
              <p>The perfect last minute gift for gym lovers! <a href="#">Shop eGift Cards</a></p>
            </div>
          </div>

          <div class="product-grid">
            <div v-if="loading" style="padding: 20px;">Yükleniyor...</div>

            <div 
              v-else 
              v-for="product in products" 
              :key="product.id" 
              class="product-card"
              @click="goToProduct(product.id)"
            >
              <div class="prod-image-wrapper">
            <button 
                  class="wishlist-icon" 
                  @click.stop="toggleWishlist(product)"
                >
                  <svg v-if="wishlistStore.isInWishlist(product.id)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" class="w-6 h-6" style="width: 20px; height: 20px;">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                  
                  <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
            </button>
                <span v-if="product.tag" class="prod-tag">{{ product.tag.text }}</span>
                
                <img :src="product.image" :alt="product.title" class="prod-img img-main" />
                <img :src="product.imageHover" :alt="product.title" class="prod-img img-hover" />

                <div class="size-overlay" @click.stop>
                  <div class="size-overlay-inner">
                    <button 
                      v-for="size in product.sizes" 
                      :key="size" 
                      class="size-btn"
                      @click="addToCart(product, size)"
                    >
                      {{ size }}
                    </button>
                  </div>
                </div>

              </div>

              <div class="prod-info">
                <div class="prod-header">
                  <div class="rating">
                    <svg class="star-icon" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    <span>{{ product.rating }}</span>
                  </div>
                </div>
                <h3 class="prod-title">{{ product.title }}</h3>
                <p class="prod-desc">{{ product.fit }} - {{ product.color }}</p>
                <p class="prod-price">{{ product.price }}</p>
              </div>
            </div>
          </div>
        </div>

      </section>


    </main>
  </div>
</template>

<style scoped>
/* --- TEMEL --- */
.page-content { background-color: #fff; min-height: 100vh; font-family: 'Roboto', 'Helvetica', sans-serif; }
.main-content { padding-bottom: 60px; }

/* --- HEADER --- */
.collection-header { max-width: 1600px; margin: 0 auto; padding: 40px 30px; }
.header-text { margin-bottom: 30px; }
.breadcrumb-text { font-size: 0.85rem; font-weight: 600; color: #666; text-transform: uppercase; display: block; margin-bottom: 5px; }
.main-title { font-size: 2.5rem; font-weight: 800; text-transform: uppercase; color: #000; margin: 0 0 10px 0; line-height: 1; }
.sub-info { margin-top: 10px; }
.product-count { font-size: 0.9rem; color: #666; display: block; margin-bottom: 5px; }
.desc-text { font-size: 1rem; color: #333; }

/* 5'li Kategori Grid */
.category-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 15px; }
.category-card { display: flex; flex-direction: column; cursor: pointer; text-decoration: none; }
.image-wrapper { position: relative; aspect-ratio: 4/5; background-color: #f5f5f5; overflow: hidden; }
.cat-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
.category-card:hover .cat-img { transform: scale(1.05); }
.pop-tag { position: absolute; top: 10px; left: 10px; background-color: #fff; color: #000; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; padding: 4px 6px; z-index: 2; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
.card-footer { padding: 12px 0; }
.cat-name { font-size: 0.9rem; color: #333; font-weight: 500; }

/* --- FILTER AREA --- */
.products-area-wrapper {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 30px;
  display: flex;
  gap: 40px;
  position: relative;
}

/* --- SIDEBAR CUSTOMIZATION --- */
.filter-sidebar {
  width: 280px;
  flex-shrink: 0;
  position: sticky;
  top: 80px;
  align-self: flex-start;
  max-height: calc(100vh - 80px);
  overflow-y: auto;
  padding-right: 15px; /* Scroll bar payı */
}
.filter-sidebar::-webkit-scrollbar { width: 4px; }
.filter-sidebar::-webkit-scrollbar-thumb { background: #e0e0e0; border-radius: 4px; }

.filter-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid #e5e5e5; padding-bottom: 15px; }
.filter-header h3 { font-size: 0.9rem; font-weight: 800; margin: 0; text-transform: uppercase; letter-spacing: 0.5px; }
.clear-btn { font-size: 0.8rem; color: #999; border: none; background: none; cursor: pointer; }

/* --- FILTER GROUPS --- */
.filter-group { border-bottom: 1px solid #e5e5e5; margin-bottom: 0; }

.filter-title {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  padding: 18px 0;
  cursor: pointer;
  color: #000;
}
.filter-title span:first-child { font-size: 0.85rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; }
.chevron { transition: transform 0.3s ease; display: flex; align-items: center; }
.rotate-180 { transform: rotate(180deg); }
.filter-content { padding-bottom: 20px; }

/* -- CUSTOM RADIO (SORT BY) -- */
.custom-radio-container { display: flex; align-items: center; position: relative; margin-bottom: 12px; cursor: pointer; font-size: 0.9rem; font-weight: 400; color: #444; padding-left: 30px; }
.custom-radio-container input { position: absolute; opacity: 0; cursor: pointer; height: 0; width: 0; }
.checkmark-circle { position: absolute; top: 0; left: 0; height: 20px; width: 20px; background-color: #fff; border: 1px solid #ccc; border-radius: 50%; }
.custom-radio-container:hover input ~ .checkmark-circle { border-color: #000; }
.custom-radio-container input:checked ~ .checkmark-circle { background-color: #fff; border-color: #000; }
.custom-radio-container input:checked ~ .checkmark-circle:after { content: ""; position: absolute; display: block; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 10px; height: 10px; border-radius: 50%; background: black; }

/* -- CLEAN LIST BUTTONS -- */
.vertical-list { display: flex; flex-direction: column; gap: 4px; }
.clean-list-btn { text-align: left; background: transparent; border: none; padding: 6px 0; font-size: 0.9rem; font-weight: 400; color: #555; cursor: pointer; transition: all 0.2s; }
.clean-list-btn:hover { color: #000; text-decoration: underline; }

/* -- GRID BUTTONS (Size) -- */
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.grid-btn { background: #fff; border: 1px solid #e0e0e0; padding: 10px 0; font-size: 0.85rem; color: #333; cursor: pointer; text-align: center; border-radius: 2px; transition: border-color 0.2s; }
.grid-btn:hover { border-color: #000; color: #000; }

.grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }

/* -- COLORS -- */
.color-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
.color-item { display: flex; flex-direction: column; align-items: center; cursor: pointer; }
.color-circle { width: 36px; height: 36px; border-radius: 50%; margin-bottom: 6px; transition: transform 0.2s; }
.color-circle:hover { transform: scale(1.1); }
.color-name { font-size: 0.75rem; color: #666; font-weight: 400; }

/* --- PRODUCT GRID --- */
.products-grid-container { flex: 1; }
.promo-banner { background-color: #000; color: #fff; padding: 15px 20px; display: flex; align-items: center; gap: 15px; margin-bottom: 30px; }
.promo-banner .emoji { font-size: 1.5rem; }
.promo-text p { margin: 0; font-size: 0.9rem; }
.promo-text a { color: #fff; text-decoration: underline; }

.product-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px 10px; }
.product-card { display: flex; flex-direction: column; cursor: pointer; position: relative; }

/* --- RESİM ALANI & HOVER LOGIC (DEĞİŞTİ) --- */
.prod-image-wrapper { 
  position: relative; 
  aspect-ratio: 3/4; 
  background-color: #f5f5f5; 
  margin-bottom: 10px; 
  overflow: hidden; /* Overlay'in dışarı taşmaması için şart */
}
.prod-img { width: 100%; height: 100%; object-fit: cover; transition: opacity 0.3s ease; position: absolute; top: 0; left: 0; }
.img-main { opacity: 1; z-index: 1; }
.img-hover { opacity: 0; z-index: 2; }
.product-card:hover .img-hover { opacity: 1; }

.wishlist-icon { position: absolute; top: 10px; right: 10px; background: #fff; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border: none; cursor: pointer; color: #333; z-index: 5; }
.prod-tag { position: absolute; bottom: 10px; left: 10px; background-color: #fff; color: #000; font-size: 0.65rem; font-weight: 800; padding: 4px 6px; text-transform: uppercase; box-shadow: 0 1px 3px rgba(0,0,0,0.1); z-index: 5; }

/* --- OVERLAY SIZE SELECTOR (YENİ EKLEME) --- */
.size-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.95); /* Hafif transparan beyaz fon */
  transform: translateY(100%); /* Başlangıçta aşağıda gizli */
  transition: transform 0.3s ease;
  z-index: 10;
  display: flex;
  justify-content: center;
}
/* Hover olunca yukarı kay */
.product-card:hover .size-overlay {
  transform: translateY(0);
}
.size-overlay-inner {
  display: flex;
  gap: 5px;
  width: 100%;
  justify-content: center;
}
.size-btn {
  flex: 1;
  max-width: 40px; /* Çok geniş olmasın */
  height: 30px;
  display: flex; align-items: center; justify-content: center;
  background: #fff; border: 1px solid #e0e0e0;
  font-size: 0.75rem; font-weight: 700; color: #000;
  cursor: pointer;
  transition: all 0.2s;
}
.size-btn:hover { background: #000; color: #fff; border-color: #000; }

/* INFO */
.prod-info { padding: 0 5px; }
.prod-header { display: flex; align-items: center; margin-bottom: 4px; }
.rating { display: flex; align-items: center; font-size: 0.8rem; font-weight: 600; }
.star-icon { width: 14px; height: 14px; color: #000; margin-right: 2px; }
.prod-title { font-size: 0.9rem; font-weight: 600; margin: 0 0 4px 0; line-height: 1.2; color: #000; }
.prod-desc { font-size: 0.85rem; color: #666; margin: 0 0 8px 0; }
.prod-price { font-size: 0.95rem; font-weight: 700; color: #000; }

/* RESPONSIVE */
@media (max-width: 1024px) {
  .category-grid { grid-template-columns: repeat(3, 1fr); }
  .product-grid { grid-template-columns: repeat(3, 1fr); }
  .products-area-wrapper { flex-direction: column; }
  .filter-sidebar { width: 100%; position: static; max-height: none; margin-bottom: 20px; padding-right: 0; }
  .grid-3 { grid-template-columns: repeat(4, 1fr); }
  .color-grid { grid-template-columns: repeat(6, 1fr); }
}
@media (max-width: 768px) {
  .product-grid { grid-template-columns: repeat(2, 1fr); }
  .category-grid { grid-template-columns: repeat(2, 1fr); }
  .main-title { font-size: 1.8rem; }
}
</style>