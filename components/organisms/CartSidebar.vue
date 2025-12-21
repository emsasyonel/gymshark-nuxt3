<script setup lang="ts">
import { useUiStore } from '../../stores/ui'
import { useCartStore } from '../../stores/cartStore'
import { storeToRefs } from 'pinia'
import CartEmpty from '../molecules/CartEmpty.vue'

const uiStore = useUiStore()
const cartStore = useCartStore()

const { items, subTotal, shippingCost, grandTotal } = storeToRefs(cartStore)
</script>

<template>
  <div v-if="uiStore.isCartOpen" class="cart-sidebar-wrapper">
    
    <div class="overlay" @click="uiStore.closeCart"></div>
    
    <div class="cart-panel">
      
      <div class="mini-cart-header">
        <h2>Your bag</h2>
        <div class="header-controls">
          <button class="icon-toggle" type="button">
            <i class="bi bi-bag-fill"></i>
          </button>
          <button class="close-btn" @click="uiStore.closeCart" aria-label="Close">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
      </div>

      <div class="panel-content">
        
        <CartEmpty v-if="cartStore.totalItems === 0" />

        <div v-else class="cart-filled-container">
          
          <div class="shipping-message">
            Delivery & Shipping Information <i class="bi bi-info-circle-fill"></i>
          </div>

          <p class="urgency-message">
            <i class="bi bi-info-circle-fill"></i>
            <span><strong>Your items aren’t reserved</strong>, checkout quickly.</span>
          </p>

          <div class="cart-line-items">
            <ul>
              <li v-for="item in items" :key="item.productId + item.selectedSize" class="line-item">
                <article class="product-card-mini">
                  
                  <button class="wishlist-btn-abs">
                     <i class="bi bi-heart"></i>
                  </button>

                  <div class="product-img">
                    <img :src="item.image" :alt="item.name" />
                  </div>
                  
                  <div class="product-info">
                    <a href="#"><h3 class="product-title">{{ item.name }}</h3></a>
                    <div class="product-meta">
                      <span>{{ item.color }}</span>
                      <span>{{ item.selectedSize }}</span>
                    </div>
                    <span class="stock-prompt">Last item in stock</span>
                    
                    <div class="product-footer">
                      <p class="price">US${{ item.price }}</p>
                      
                      <div class="qty-selector">
                        <button @click="cartStore.updateQuantity(item.productId, item.selectedSize, item.quantity - 1)"><i class="bi bi-dash"></i></button>
                        <span>{{ item.quantity }}</span>
                        <button @click="cartStore.updateQuantity(item.productId, item.selectedSize, item.quantity + 1)"><i class="bi bi-plus"></i></button>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            </ul>
          </div>

          <section class="recommendations">
            <div class="rec-header">
              <h2>Add a little extra</h2>
            </div>
            <h3>Add one or more of these items to get free delivery</h3>
            
            <ul class="rec-list-horizontal">
              <li class="rec-card">
                <div class="rec-img"><div class="placeholder-img">🎒</div></div>
                <div class="rec-content">
                  <div class="rec-title">Tactical Backpack</div>
                  <div class="rec-price">US$110</div>
                  <button class="rec-add-btn">+ ADD</button>
                </div>
              </li>
              <li class="rec-card">
                <div class="rec-img"><div class="placeholder-img">🧢</div></div>
                <div class="rec-content">
                  <div class="rec-title">Gym Cap</div>
                  <div class="rec-price">US$25</div>
                  <button class="rec-add-btn">+ ADD</button>
                </div>
              </li>
            </ul>
          </section>

          <div class="discount-wrapper">
            <p class="discount-title">Discount code</p>
            
            <div class="discount-flex-group">
              <input type="text" placeholder="Enter code" class="discount-input" />
              <button class="btn-apply">APPLY</button>
            </div>
            
            <p class="input-desc"><i class="bi bi-info-circle-fill"></i> Gift Card codes can be applied at checkout.</p>
          </div>

          <div class="summary-wrapper">
            <p class="summary-title">Order summary</p>
            <div class="summary-row">
              <p>Sub Total</p><p>US${{ subTotal }}</p>
            </div>
            <div class="summary-row">
              <p>Estimated Shipping</p><p>{{ shippingCost === 0 ? 'Free' : `US$${shippingCost}` }}</p>
            </div>
            <div class="summary-row bold">
              <p>Total</p><p>US${{ grandTotal }}</p>
            </div>
          </div>

        </div> 
      </div> <div v-if="cartStore.totalItems > 0" class="fixed-footer">
        <div class="checkout-cta">
          <a href="#" class="btn-primary">
            <i class="bi bi-lock-fill"></i> CHECKOUT SECURELY
          </a>
        </div>
        <div class="payment-icons">
          <span class="pay-icon visa">VISA</span>
          <span class="pay-icon master">MC</span>
          <span class="pay-icon amex">AMEX</span>
          <span class="pay-icon paypal">Paypal</span>
          <span class="pay-icon apple">Pay</span>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* --- TEMEL PANEL --- */
.cart-sidebar-wrapper { 
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 2000; 
  overflow: hidden; /* Dışarı taşmayı engelle */
}
.overlay { 
  width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); 
  position: absolute; animation: fadeIn 0.3s forwards; 
}

.cart-panel { 
  position: absolute; top: 0; right: 0; height: 100%; 
  background-color: #ffffff; 
  /* Genişlik ayarı: Sabit max-width */
  width: 100%; max-width: 480px; min-width: 320px; 
  display: flex; flex-direction: column; 
  transform: translateX(100%); animation: slide-in 0.3s forwards; 
  box-shadow: -5px 0 15px rgba(0,0,0,0.1);
}

.panel-content { 
  flex: 1; overflow-y: auto; padding-bottom: 20px; 
  overflow-x: hidden; /* Yatay scrollu engelle */
}

/* --- HEADER --- */
.mini-cart-header { 
  display: flex; justify-content: space-between; align-items: center; 
  padding: 20px 24px; border-bottom: 1px solid #f5f5f5; flex-shrink: 0; 
}
.mini-cart-header h2 { font-size: 1.4rem; font-weight: 800; text-transform: uppercase; margin: 0; }
.header-controls { display: flex; gap: 10px; align-items: center; }
.icon-toggle { background: #000; color: #fff; width: 36px; height: 36px; border-radius: 50%; border: none; display: flex; align-items: center; justify-content: center; }
.close-btn { background: transparent; border: none; font-size: 1.5rem; cursor: pointer; }

/* --- MESSAGES --- */
.shipping-message { padding: 12px 24px; font-size: 0.85rem; border-bottom: 1px solid #eee; display: flex; align-items: center; gap: 6px; }
.urgency-message { margin: 16px 24px; background: #f9f9f9; padding: 12px; font-size: 0.85rem; display: flex; gap: 8px; border-radius: 4px; }

/* --- PRODUCTS --- */
.cart-line-items ul { list-style: none; padding: 0; margin: 0 24px; }
.line-item { padding: 24px 0; border-bottom: 1px solid #eee; }

.product-card-mini { display: flex; gap: 16px; position: relative; }
.wishlist-btn-abs {
  position: absolute; top: 0; right: 0;
  background: none; border: none; font-size: 1.1rem; cursor: pointer; color: #333; z-index: 2;
}
.product-img img { width: 90px; height: 115px; object-fit: cover; }
.product-info { flex: 1; display: flex; flex-direction: column; padding-right: 25px; }
.product-title { font-size: 0.95rem; font-weight: 600; margin: 0 0 4px 0; color: #000; }
.product-meta { font-size: 0.85rem; color: #666; display: flex; gap: 10px; margin-bottom: 4px; }
.stock-prompt { color: #d32f2f; font-size: 0.75rem; font-weight: 500; }
.product-footer { margin-top: auto; display: flex; justify-content: space-between; align-items: flex-end; }
.price { font-weight: 700; font-size: 0.95rem; }

.qty-selector { display: flex; align-items: center; border: 1px solid #ddd; border-radius: 20px; height: 32px; overflow: hidden; }
.qty-selector button { background: none; border: none; width: 32px; height: 100%; cursor: pointer; display: flex; align-items: center; justify-content: center; }
.qty-selector span { font-size: 0.85rem; font-weight: 600; padding: 0 4px; }

/* --- ADD EXTRA (YAN YANA LISTE) --- */
.recommendations { padding: 0 24px 24px; border-bottom: 1px solid #eee; }
.rec-header h2 { font-size: 0.9rem; font-weight: 700; text-transform: uppercase; margin: 0 0 4px 0; }
.recommendations h3 { font-size: 0.8rem; font-weight: 400; color: #666; margin: 0 0 16px 0; }

.rec-list-horizontal {
  display: flex; gap: 12px; 
  /* Eğer çok ürün varsa kendi içinde kayabilir ama dışarı taşmaz */
  overflow-x: auto; padding-bottom: 10px;
  list-style: none; padding-left: 0;
}
.rec-list-horizontal::-webkit-scrollbar { height: 4px; }
.rec-list-horizontal::-webkit-scrollbar-thumb { background: #ccc; border-radius: 4px; }

.rec-card {
  min-width: 130px; /* Kart genişliği */
  border: 1px solid #eee; padding: 10px; border-radius: 4px;
  display: flex; flex-direction: column;
}
.placeholder-img { width: 100%; height: 80px; background: #f4f4f4; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin-bottom: 8px; }
.rec-content { flex: 1; display: flex; flex-direction: column; }
.rec-top { flex: 1; }
.rec-title { font-size: 0.8rem; font-weight: 600; line-height: 1.2; margin-bottom: 4px; }
.rec-price { font-size: 0.85rem; margin-bottom: 8px; }
.rec-add-btn { width: 100%; background: #fff; border: 1px solid #000; font-weight: 700; font-size: 0.75rem; padding: 6px; cursor: pointer; transition: 0.2s; }
.rec-add-btn:hover { background: #000; color: #fff; }

/* --- DISCOUNT CODE (DÜZELTİLDİ: YAN YANA) --- */
.discount-wrapper { padding: 24px; border-bottom: 1px solid #eee; }
.discount-title { font-size: 0.9rem; font-weight: 700; margin-bottom: 8px; }

.discount-flex-group {
  display: flex; gap: 10px; /* Kutu ile buton arası boşluk */
  align-items: center;
}
.discount-input {
  flex: 1; /* Kalan tüm alanı kapla */
  padding: 12px; border: 1px solid #ccc; font-size: 0.9rem; border-radius: 4px;
  height: 48px;
}
.btn-apply {
  background: #000; color: #fff; border: none; 
  padding: 0 24px; height: 48px; /* Input ile aynı yükseklik */
  font-weight: 700; font-size: 0.8rem; cursor: pointer; border-radius: 4px;
  flex-shrink: 0; /* Buton sıkışmasın */
}
.input-desc { font-size: 0.75rem; color: #666; margin-top: 8px; display: flex; gap: 4px; align-items: center; }

/* --- SUMMARY --- */
.summary-wrapper { padding: 24px; background: #f9f9f9; }
.summary-title { font-size: 1rem; font-weight: 700; margin-bottom: 16px; }
.summary-row { display: flex; justify-content: space-between; font-size: 0.9rem; margin-bottom: 8px; color: #333; }
.summary-row.bold { font-weight: 800; font-size: 1rem; margin-top: 12px; border-top: 1px solid #ddd; padding-top: 12px; }

/* --- FOOTER (SABİT) --- */
.fixed-footer {
  padding: 20px 24px; background: #fff; border-top: 1px solid #e5e5e5;
  box-shadow: 0 -4px 20px rgba(0,0,0,0.05); flex-shrink: 0; z-index: 10;
}
.btn-primary { 
  display: flex; justify-content: center; align-items: center; gap: 8px; 
  width: 100%; background: #000; color: #fff; padding: 16px; border-radius: 30px; 
  font-weight: 700; text-decoration: none; font-size: 1rem; 
}
.payment-icons { display: flex; gap: 6px; margin-top: 12px; justify-content: center; }
.pay-icon { font-size: 0.6rem; font-weight: 800; color: white; padding: 2px 5px; border-radius: 2px; }
.visa { background: #1a1f71; } .master { background: #eb001b; } .amex { background: #006fcf; } .paypal { background: #003087; } .apple { background: #000; }

@keyframes slide-in { from { transform: translateX(100%); } to { transform: translateX(0); } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
</style>