<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// Store bağlantıları
import { useUiStore } from '../../stores/ui'
import { useCartStore } from '../../stores/cartStore'
import { useAuthStore } from '../../stores/authStore' // Auth store eklendi

const router = useRouter()
const uiStore = useUiStore()
const cartStore = useCartStore()
const authStore = useAuthStore()

// Menü açık/kapalı durumu
const isUserMenuOpen = ref(false)

// İkona tıklama mantığı
const handleUserIconClick = () => {
  if (authStore.user) {
    // Giriş yapılmışsa menüyü aç/kapat
    isUserMenuOpen.value = !isUserMenuOpen.value
  } else {
    // Giriş yapılmamışsa Login sayfasına git
    router.push('/login')
  }
}

// Çıkış yapma mantığı
const handleLogout = () => {
  authStore.logoutUser()
  isUserMenuOpen.value = false
  router.push('/')
}
</script>

<template>
  <div class="actions">
    
    <NuxtLink to="/wishlist" aria-label="Favoriler (Wishlist)">
      <i class="bi bi-heart"></i>
    </NuxtLink>
    
    <div class="user-menu-wrapper">
      <button 
        class="action-btn" 
        aria-label="Hesabım (Account)"
        @click="handleUserIconClick"
      >
        <i class="bi bi-person"></i>
      </button>

      <div v-if="authStore.user && isUserMenuOpen" class="user-dropdown">
        
        <div class="dropdown-header">
          <span class="greeting">Hi,</span>
          <span class="username">
            {{ authStore.user.firstName }} {{ authStore.user.lastName }}
          </span>
        </div>

        <button class="dropdown-item logout-btn" @click="handleLogout">
          LOG OUT
        </button>
      </div>
    </div>
    
    <button 
      type="button" 
      class="cart-button" 
      aria-label="Sepet (Bag)"
      @click="uiStore.toggleCart"
    >
      <i class="bi bi-bag"></i>
      <span v-if="cartStore.totalItems > 0" class="cart-badge">
        {{ cartStore.totalItems }}
      </span>
    </button>

  </div>
</template>

<style scoped>
.actions {
  display: flex;
  gap: 2.5rem;
  padding-left: 20px;
  align-items: center;
}

/* Linkler ve Butonlar için Ortak Stil */
.actions a,
.actions .cart-button,
.actions .action-btn {
  text-decoration: none;
  color: #000;
  font-size: 1.3rem;
  line-height: 1;
  display: inline-block;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
}

/* --- KULLANICI MENÜSÜ (DROPDOWN) STİLLERİ --- */
.user-menu-wrapper {
  position: relative; /* Dropdown buna göre konumlanacak */
}

.user-dropdown {
  position: absolute;
  top: 100%; /* İkonun tam altına */
  right: -10px; /* Biraz sağa yaslı ortalamak için */
  margin-top: 10px;
  background-color: #ffffff;
  border: 1px solid #e5e5e5;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  min-width: 180px;
  border-radius: 4px;
  z-index: 1000; /* Diğer öğelerin üstünde */
  display: flex;
  flex-direction: column;
  text-align: left;
}

/* Dropdown Ok İşareti (Üçgen) */
.user-dropdown::before {
  content: "";
  position: absolute;
  top: -6px;
  right: 14px;
  width: 12px;
  height: 12px;
  background: #fff;
  border-left: 1px solid #e5e5e5;
  border-top: 1px solid #e5e5e5;
  transform: rotate(45deg);
}

.dropdown-header {
  padding: 15px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #eee;
  display: flex;
  flex-direction: column;
}

.greeting {
  font-size: 0.8rem;
  color: #666;
}

.username {
  font-weight: 800;
  font-size: 0.95rem;
  color: #000;
  text-transform: uppercase;
  margin-top: 2px;
}

.logout-btn {
  width: 100%;
  text-align: left;
  padding: 12px 15px;
  background: none;
  border: none;
  font-weight: 700;
  font-size: 0.85rem;
  color: #d32f2f; /* Kırmızımsı */
  cursor: pointer;
  transition: background 0.2s;
  text-transform: uppercase;
}

.logout-btn:hover {
  background-color: #f5f5f5;
}

/* Sepet Sayacı (Badge) Stili */
.cart-badge {
  position: absolute;
  top: -5px;
  right: -8px;
  background-color: #000;
  color: #fff;
  font-size: 0.7rem;
  font-weight: bold;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>