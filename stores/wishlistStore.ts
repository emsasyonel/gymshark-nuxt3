// stores/wishlistStore.ts
import { defineStore } from 'pinia'

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    items: [] as any[] // Favori ürünleri tutan dizi
  }),
  
  actions: {
    // Ürünü favorilere ekle veya çıkar (Toggle mantığı)
    toggleWishlist(product: any) {
      const existingIndex = this.items.findIndex(item => item.id === product.id)
      
      if (existingIndex !== -1) {
        // Zaten varsa çıkar
        this.items.splice(existingIndex, 1)
        console.log('Favorilerden çıkarıldı:', product.title)
      } else {
        // Yoksa ekle
        this.items.push(product)
        console.log('Favorilere eklendi:', product.title)
      }
      
      // Tarayıcı hafızasına kaydet (Sayfa yenilenince gitmesin)
      this.saveToLocalStorage()
    },

    // Bir ürünün favoride olup olmadığını kontrol et (Kalp ikonunu doldurmak için)
    isInWishlist(productId: string) {
      return this.items.some(item => item.id === productId)
    },

    saveToLocalStorage() {
      if (process.client) {
        localStorage.setItem('my-wishlist', JSON.stringify(this.items))
      }
    },

    loadFromLocalStorage() {
      if (process.client) {
        const stored = localStorage.getItem('my-wishlist')
        if (stored) {
          this.items = JSON.parse(stored)
        }
      }
    }
  }
})