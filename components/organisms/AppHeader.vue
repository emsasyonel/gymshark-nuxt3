<script setup lang="ts">
import { ref } from 'vue'

// --- İMPORTLAR ---
// MegaMenu bileşeni (Organism)
import MegaMenu from './MegaMenu.vue' 

// Atom ve Moleküller
import AppLogo from '../atoms/AppLogo.vue'
import NavBar from '../molecules/NavBar.vue'
import SearchBar from '../molecules/SearchBar.vue'
import UserActions from '../molecules/UserActions.vue'

// --- MENÜ STATE (DURUMU) ---
const openedMenu = ref<'women' | 'men' | 'accessories' | null>(null)

// --- SABİT YOLLAR (HİLELİ KISIM) ---
// Tüm kadın ürünleri tıklandığında bu sayfaya gidecek
const PATH_WOMEN = '/collections/womens-products'
// Tüm erkek ürünleri tıklandığında bu sayfaya gidecek
const PATH_MEN = '/collections/mens-products'

// --- KADIN KATEGORİSİ VERİLERİ ---
const womenCategories = [
  {
    title: 'TRENDING',
    links: [
      { text: 'New Releases', href: PATH_WOMEN },
      { text: 'Best Sellers', href: PATH_WOMEN },
      { text: 'Matching Sets', href: PATH_WOMEN },
      { text: 'Gymshark x David Laid', href: PATH_WOMEN },
      { text: 'Winter Shop', href: PATH_WOMEN },
    ]
  },
  {
    title: 'PRODUCTS',
    links: [
      { text: 'All Products', href: PATH_WOMEN },
      { text: 'Leggings', href: PATH_WOMEN },
      { text: 'Sports Bras', href: PATH_WOMEN },
      { text: 'Crop Tops', href: PATH_WOMEN },
      { text: 'T-Shirts & Tops', href: PATH_WOMEN },
      { text: 'Hoodies & Jackets', href: PATH_WOMEN },
      { text: 'Shorts', href: PATH_WOMEN },
      { text: 'Joggers & Sweatpants', href: PATH_WOMEN },
    ]
  },
  {
    title: 'COLLECTIONS',
    links: [
      { text: 'Vital Seamless', href: PATH_WOMEN },
      { text: 'Adapt', href: PATH_WOMEN },
      { text: 'Elevate', href: PATH_WOMEN },
      { text: 'Gs Power', href: PATH_WOMEN },
      { text: 'Sweat', href: PATH_WOMEN },
    ]
  },
  {
    title: 'ACCESSORIES',
    links: [
      { text: 'All Accessories', href: PATH_WOMEN },
      { text: 'Bags & Duffels', href: PATH_WOMEN },
      { text: 'Socks', href: PATH_WOMEN },
      { text: 'Headwear', href: PATH_WOMEN },
      { text: 'Equipment', href: PATH_WOMEN },
      { text: 'Bottles', href: PATH_WOMEN },
    ]
  }
];

// Kadın Öne Çıkanlar (Görselleri proje klasörüne ekleyince yolları güncellersin)
const womenFeatured = [
  { 
    title: 'NEW RELEASES', 
    href: PATH_WOMEN, 
    imageUrl: 'https://images.ctfassets.net/wl6q2in9o7k3/2l2M4y9y2y9y2y9y2y9y2/9b9b9b9b9b9b9b9b9b9b9b9b9b9b9b9b/Women_Menu_New_Releases.jpg?w=600&q=80' // Örnek placeholder
  },
  { 
    title: 'BEST SELLERS', 
    href: PATH_WOMEN, 
    imageUrl: 'https://images.ctfassets.net/wl6q2in9o7k3/3k3N5z0z3z0z3z0z3z0z3/8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c8c/Women_Menu_Best_Sellers.jpg?w=600&q=80' 
  }
];

// --- ERKEK KATEGORİSİ VERİLERİ ---
const menCategories = [
  {
    title: 'TRENDING',
    links: [
      { text: 'New Releases', href: PATH_MEN },
      { text: 'Best Sellers', href: PATH_MEN },
      { text: 'Pump Covers', href: PATH_MEN },
      { text: 'Oversized', href: PATH_MEN },
      { text: 'Winter Shop', href: PATH_MEN },
    ]
  },
  {
    title: 'PRODUCTS',
    links: [
      { text: 'All Products', href: PATH_MEN },
      { text: 'T-Shirts & Tops', href: PATH_MEN },
      { text: 'Tanks & Stringers', href: PATH_MEN },
      { text: 'Hoodies & Jackets', href: PATH_MEN },
      { text: 'Shorts', href: PATH_MEN },
      { text: 'Joggers & Sweatpants', href: PATH_MEN },
      { text: 'Underwear', href: PATH_MEN },
    ]
  },
  {
    title: 'COLLECTIONS',
    links: [
      { text: 'Crest', href: PATH_MEN },
      { text: 'Arrival', href: PATH_MEN },
      { text: 'Legacy', href: PATH_MEN },
      { text: 'Power', href: PATH_MEN },
      { text: 'Bold', href: PATH_MEN },
    ]
  },
  {
    title: 'ACCESSORIES',
    links: [
      { text: 'All Accessories', href: PATH_MEN },
      { text: 'Bags', href: PATH_MEN },
      { text: 'Socks', href: PATH_MEN },
      { text: 'Hats & Caps', href: PATH_MEN },
      { text: 'Lifting Belts', href: PATH_MEN },
    ]
  }
];

// Erkek Öne Çıkanlar
const menFeatured = [
  { 
    title: 'NEW ARRIVALS', 
    href: PATH_MEN, 
    imageUrl: 'https://images.ctfassets.net/wl6q2in9o7k3/4l4O6a1a4a1a4a1a4a1a4/7d7d7d7d7d7d7d7d7d7d7d7d7d7d7d7d/Men_Menu_New_Arrivals.jpg?w=600&q=80' 
  },
  { 
    title: 'RESTOCKED', 
    href: PATH_MEN, 
    imageUrl: 'https://images.ctfassets.net/wl6q2in9o7k3/5m5P7b2b5b2b5b2b5b2b5/6e6e6e6e6e6e6e6e6e6e6e6e6e6e6e6e/Men_Menu_Restocked.jpg?w=600&q=80' 
  }
];

// Menü Açma/Kapama Fonksiyonları
const openMenu = (menuName: 'women' | 'men' | 'accessories') => {
  openedMenu.value = menuName;
}

const closeMenu = () => {
  openedMenu.value = null;
}
</script>

<template>
  <header class="app-header" @mouseleave="closeMenu">
    
    <div class="header-container-override">
      <div class="header-content">
        
        <div class="header-left">
          <NavBar 
            :active-menu="openedMenu" 
            @set-active="openMenu" 
          />
        </div>

        <div class="header-center">
          <div @mouseenter="closeMenu">
            <AppLogo />
          </div>
        </div>

        <div class="header-right" @mouseenter="closeMenu">
          <SearchBar />
          <UserActions />
        </div>
        
      </div>
    </div>

    <MegaMenu 
      v-if="openedMenu === 'women'" 
      :categories="womenCategories" 
      :featured="womenFeatured" 
      @mouseenter="openMenu('women')" 
    />

    <MegaMenu 
      v-if="openedMenu === 'men'" 
      :categories="menCategories" 
      :featured="menFeatured" 
      @mouseenter="openMenu('men')" 
    />

    <MegaMenu 
      v-if="openedMenu === 'accessories'" 
      :categories="[{ title: 'Coming Soon', links: [] }]" 
      @mouseenter="openMenu('accessories')" 
    />

  </header>
</template>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: #ffffff;
  padding: 0.5rem 0;
  /* Menü açıkken border kalksın, kapalıyken gri çizgi olsun */
  border-bottom: 1px solid v-bind("openedMenu ? 'transparent' : '#e0e0e0'");
  transition: border-color 0.1s ease;
}

.header-container-override {
  width: 99%;
  padding-left: 10px;
  padding-right: 30px;
}

.header-content {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 48px;
}

.header-left {
  position: absolute;
  left: 30px; 
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: flex-start;
  z-index: 1;
}

.header-center {
  display: flex;
  justify-content: center;
}

.header-right {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  z-index: 1;
}
</style>