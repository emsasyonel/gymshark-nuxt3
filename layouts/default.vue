<script setup lang="ts">
// Organizmalarımızı çağırıyoruz
import AppHeader from '~/components/organisms/AppHeader.vue'
import AppFooter from '~/components/organisms/AppFooter.vue'
import CartSidebar from '~/components/organisms/CartSidebar.vue'
import AnnouncementBar from '~/components/atoms/AnnouncementBar.vue'
</script>

<template>
  <div class="layout-container">

<AnnouncementBar />

    <AppHeader />

    <CartSidebar />

    <main class="main-content">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1; /* Footer'ı aşağı itmek için */
}
</style>