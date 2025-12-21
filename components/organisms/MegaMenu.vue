<script setup lang="ts">
// Nuxt yapısına uygun import yolları (Molecules klasörüne çıkıyoruz)
import MenuColumn from '../molecules/MenuColumn.vue'
import MenuFeaturedCard from '../molecules/MenuFeaturedCard.vue'

// Tip tanımları (Aynen korundu)
type CategoryLink = {
  text: string;
  href: string;
};
type CategoryGroup = {
  title: string;
  links: CategoryLink[];
};
type FeaturedItem = {
  title: string;
  href: string;
  imageUrl: string;
};

// Props
defineProps<{
  categories: CategoryGroup[];
  featured?: FeaturedItem[];
}>();
</script>

<template>
  <div class="mega-menu">
    <div class="mega-menu-content">
      
      <div class="menu-links-grid">
        <MenuColumn
          v-for="categoryGroup in categories"
          :key="categoryGroup.title"
          :title="categoryGroup.title"
          :links="categoryGroup.links"
        />
      </div>

      <div v-if="featured && featured.length > 0" class="menu-featured-column">
        <h4 class="column-title-featured">FEATURED</h4>
        
        <MenuFeaturedCard
          v-for="item in featured"
          :key="item.title"
          :title="item.title"
          :href="item.href"
          :image-url="item.imageUrl"
        />
      </div>

    </div>
  </div>
</template>

<style scoped>
/* --- SENİN CSS YAPIN (Birebir Korundu) --- */
.mega-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  border-top: 1px solid #e0e0e0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  z-index: 999;
}

.mega-menu-content {
  padding: 2.5rem 10px;
  max-width: 1400px; /* İçeriğin çok yayılmaması için bir sınır ekledim, istersen kaldır */
  margin: 0 auto;    /* Ortalamak için */
  display: flex;
  justify-content: space-between;
  gap: 3rem;
}

.menu-links-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 2rem 1.5rem;
  flex-grow: 1;
}

.menu-featured-column {
  flex-shrink: 0;
  width: 280px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.column-title-featured {
  font-size: 0.8rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  text-transform: uppercase;
  color: #888;
}
</style>