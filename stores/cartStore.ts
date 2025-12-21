import { defineStore } from 'pinia';
import type { ICartItem, IProduct } from '~/types';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as ICartItem[],
    isCartOpen: false,
  }),

  getters: {
    // Toplam Ürün Sayısı
    totalItems: (state) => state.items.reduce((acc, item) => acc + item.quantity, 0),
    
    // Ara Toplam (Ürünlerin fiyatı)
    subTotal: (state) => {
      return state.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    },

    // Kargo Hesabı (HTML'deki bilgiye göre: 100$ üstü bedava, altı 15$)
    shippingCost(): number {
      const sub = this.subTotal;
      if (sub === 0) return 0;
      return sub >= 100 ? 0 : 15;
    },

    // Genel Toplam (Ara Toplam + Kargo)
    grandTotal(): number {
      return this.subTotal + this.shippingCost;
    }
  },

  actions: {
    toggleCart(isOpen?: boolean) {
      this.isCartOpen = isOpen !== undefined ? isOpen : !this.isCartOpen;
    },

    addToCart(product: IProduct, size: string) {
      const existingItem = this.items.find(
        (item) => item.productId === product.id && item.selectedSize === size
      );

      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.items.push({
          productId: product.id,
          name: product.name,
          color: product.color || 'Black',
          price: product.price,
          image: product.image,
          selectedSize: size,
          quantity: 1,
        });
      }
      this.isCartOpen = true;
    },

    updateQuantity(productId: string, size: string, newQty: number) {
      const item = this.items.find((i) => i.productId === productId && i.selectedSize === size);
      if (item) {
        item.quantity = newQty;
        if (item.quantity <= 0) this.removeItem(productId, size);
      }
    },

    removeItem(productId: string, size: string) {
      this.items = this.items.filter((i) => !(i.productId === productId && i.selectedSize === size));
    }
  }
});