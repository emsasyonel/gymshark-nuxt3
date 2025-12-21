<script setup lang="ts">
// --- ORGANİZMALARI ÇAĞIRIYORUZ ---
import HeroBanner from '~/components/organisms/HeroBanner.vue'
import CategorySale from '~/components/organisms/CategorySale.vue'
import BestsellerSlider from '~/components/organisms/BestsellerSlider.vue'
import MensSale from '~/components/organisms/MensSale.vue'
import WomensSale from '~/components/organisms/WomensSale.vue'
import ExploreSection from '~/components/organisms/ExploreSection.vue'
import EmailSignupBanner from '~/components/organisms/EmailSignupBanner.vue'
import CategoryGrid from '~/components/organisms/CategoryGrid.vue'
import SeoTextBlock from '~/components/molecules/SeoTextBlock.vue'

// Email Banner verisi burada yönetilebilir
const emailBannerData = {
  titleHighlight: 'GET AN EXTRA 10% OFF',
  titleMain: 'BLACK FRIDAY',
  description: 'Sign up to our emails to get an extra 10% off on top of up to 50% off everything. New Customers only.',
  buttonText: 'SIGN UP'
}
</script>

<template>
  <div class="home-page">
    
    <HeroBanner />

   

      <EmailSignupBanner 
      :title-highlight="emailBannerData.titleHighlight"
      :title-main="emailBannerData.titleMain"
      :description="emailBannerData.description"
      :button-text="emailBannerData.buttonText"
    />
    <WomensSale />

    
    <MensSale />


    <BestsellerSlider />


    <ExploreSection />


    <CategorySale />

    


    
  
    
    <CategoryGrid />

    <SeoTextBlock />

  </div>
</template>

<style scoped>
.home-page {
  /* Sayfa genelinde arka plan beyaz */
  background-color: #ffffff;
  padding-bottom: 2rem;
}
</style>