<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { useProductStore } from '~/stores/productStore';

// --- BİLEŞENLERİ İÇERİ ALIYORUZ (IMPORT) ---
import ProductGallery from '~/components/organisms/ProductGallery.vue';
import ProductInfo from '~/components/organisms/ProductInfo.vue';
import GetTheLook from '~/components/organisms/GetTheLook.vue';
import YouMightLike from '~/components/organisms/YouMightLike.vue'; // <-- YENİ EKLENEN
import ProductReviews from '~/components/organisms/ProductReviews.vue';


const route = useRoute();
const productStore = useProductStore();
const product = ref<any>(null);
const loading = ref(true);

onMounted(async () => {
  const productId = route.params.id as string;
  product.value = await productStore.fetchProductById(productId);
  loading.value = false;
});
</script>

<template>
  <div v-if="loading" class="loading">Loading...</div>
  
  <div v-else-if="product" class="page-wrapper">
    
    <div class="pdp-layout">
      <div class="left-column">
        <ProductGallery :images="product.gallery || [product.image, product.imageHover, product.image, product.imageHover]" />
      </div>
      <div class="right-column">
        <div class="info-wrapper">
          <ProductInfo :product="product" />
        </div>
      </div>
    </div>

    <GetTheLook />
    
    <YouMightLike />

    <ProductReviews />



  </div>
  
  <div v-else>Product not found</div>
</template>

<style scoped>
.page-wrapper { width: 100%; overflow-x: hidden; }

.pdp-layout {
  display: flex;
  width: 100%;
  position: relative;
}

.left-column {
  width: 60%; 
  flex-shrink: 0;
}

.right-column {
  width: 40%;
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  padding-top: 20px;
}

.info-wrapper {
  max-width: 500px;
  width: 100%;
  padding-right: 40px;
}

@media (max-width: 1024px) {
  .pdp-layout { flex-direction: column; }
  .left-column, .right-column { width: 100%; }
  .right-column { position: static; height: auto; padding: 20px; }
  .info-wrapper { max-width: 100%; padding: 0; }
}
</style>