import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    isCartOpen: false,
    isMobileMenuOpen: false
  }),

  actions: {
    toggleCart() {
      this.isCartOpen = !this.isCartOpen
    },
    openCart() {
      this.isCartOpen = true
    },
    closeCart() {
      this.isCartOpen = false
    }
  }
})