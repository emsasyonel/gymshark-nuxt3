<script setup lang="ts">
import { ref } from 'vue'
import { useSubscriberStore } from '~/stores/subscriberStore' // Store'u çağırıyoruz

// Alt bileşenler
import SubFooter from '../molecules/SubFooter.vue'
import FooterLinkColumn from '../molecules/FooterLinkColumn.vue'

// --- STORE KURULUMU ---
const subscriberStore = useSubscriberStore()
const emailInput = ref('')

// --- ABONELİK FONKSİYONU ---
const handleSubscribe = async () => {
  await subscriberStore.subscribeUser(emailInput.value)
  
  // Başarılı olursa inputu temizle ve 3 sn sonra eski haline döndür
  if (subscriberStore.success) {
    emailInput.value = ''
    setTimeout(() => {
      subscriberStore.resetState()
    }, 3000)
  }
}

// --- DATA ---
const helpLinks = ref([
  { text: 'FAQ', href: '#' },
  { text: 'Delivery Information', href: '#' },
  { text: 'Returns Policy', href: '#' },
  { text: 'Make A Return', href: '#' },
  { text: 'Orders', href: '#' },
  { text: 'Submit a Fake', href: '#' },
])

const accountLinks = ref([
  { text: 'Login', href: '/login' },
  { text: 'Register', href: '/register' },
])

const pagesLinks = ref([
  { text: 'Stores', href: '#' },
  { text: 'Refer A Friend', href: '#' },
  { text: 'Gymshark Loyalty', href: '#' },
  { text: 'About Us', href: '#' },
  { text: 'Careers', href: '#' },
  { text: 'Student Discount', href: '#' },
  { text: 'Sustainability', href: '#' },
])
</script>

<template>
  <div class="footer-wrapper">

    <footer class="app-footer">
      <div class="footer-container">
        
        <div class="footer-grid">
          <FooterLinkColumn title="HELP" :links="helpLinks" />
          <FooterLinkColumn title="MY ACCOUNT" :links="accountLinks" />
          <FooterLinkColumn title="PAGES" :links="pagesLinks" />
          
          <div class="more-about-column">
            <h3 class="column-title">MORE ABOUT GYMSHARK</h3>
            
            <div class="more-blocks">
              
              <a href="#" class="gymshark-card">
                <div class="card-top">
                  <div class="logo-text">
                    <span class="font-bold">GYMSHARK</span>
                    <span class="font-light tracking-widest text-[0.6rem]">CENTRAL</span>
                  </div>
                </div>
                <div class="card-bottom">BLOG</div>
              </a>

              <a href="#" class="gymshark-card">
                <div class="card-top">
                  <div class="logo-text">
                    <span class="font-bold">GYMSHARK</span>
                    <span class="font-bold tracking-wider">STUDENTS</span>
                  </div>
                </div>
                <div class="card-bottom">15% STUDENT DISCOUNT</div>
              </a>

              <div class="gymshark-card newsletter-card">
                
                <div class="card-top form-container">
                  
                  <div v-if="subscriberStore.success" class="success-state">
                    <i class="bi bi-check-circle-fill success-icon"></i>
                    <span>SIGNED UP!</span>
                  </div>

                  <form v-else @submit.prevent="handleSubscribe" class="mini-form">
                    <div class="input-wrapper">
                      <svg v-if="!subscriberStore.loading" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#999" class="bi bi-envelope input-icon" viewBox="0 0 16 16">
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                      </svg>
                      
                      <input 
                        type="email" 
                        v-model="emailInput" 
                        placeholder="Email..." 
                        required
                        :disabled="subscriberStore.loading"
                      />
                      
                      <button type="submit" class="arrow-btn" :disabled="subscriberStore.loading">
                        <span v-if="subscriberStore.loading">...</span>
                        <i v-else class="bi bi-arrow-right"></i>
                      </button>
                    </div>
                    <div v-if="subscriberStore.error" class="mini-error">{{ subscriberStore.error }}</div>
                  </form>

                </div>

                <div class="card-bottom">
                  {{ subscriberStore.success ? 'THANKS FOR JOINING' : 'EMAIL SIGN UP' }}
                </div>

              </div>

            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="payment-icons">
            <span><img src="https://via.placeholder.com/38x24/00579E/FFFFFF?text=VISA" alt="Visa"></span>
            <span><img src="https://via.placeholder.com/38x24/EB001B/FFFFFF?text=MC" alt="Mastercard"></span>
            <span><img src="https://via.placeholder.com/38x24/003087/FFFFFF?text=PayPal" alt="PayPal"></span>
            <span><img src="https://via.placeholder.com/38x24/FFB3C7/000000?text=Klarna" alt="Klarna"></span>
            <span><img src="https://via.placeholder.com/38x24/B4F2E1/000000?text=Afterpay" alt="Afterpay"></span>
          </div>
          <div class="social-icons">
            <a href="#" aria-label="Discord"><i class="bi bi-discord"></i></a>
            <a href="#" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
            <a href="#" aria-label="Pinterest"><i class="bi bi-pinterest"></i></a>
            <a href="#" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
            <a href="#" aria-label="Twitter"><i class="bi bi-twitter-x"></i></a>
            <a href="#" aria-label="Youtube"><i class="bi bi-youtube"></i></a>
            <a href="#" aria-label="Tiktok"><i class="bi bi-tiktok"></i></a>
          </div>
        </div>
      </div>
    </footer>

    <SubFooter />
  </div>
</template>

<style scoped>
/* --- GENEL FOOTER AYARLARI --- */
.app-footer {
  background-color: #ffffff;
  padding: 4rem 0 2rem 0;
  width: 100%;
}
.footer-container {
  width: 100%;
  max-width: 1600px; 
  margin: 0 auto;
  padding: 0 30px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 0.5fr 0.5fr 1fr 1.5fr;
  gap: 2rem;
  margin-bottom: 4rem;
}

.column-title {
  font-size: 0.95rem;
  font-weight: 800; 
  color: #000;
  margin: 0 0 1.5rem 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* --- KART STİLLERİ --- */
.more-blocks {
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 15px; 
}

.gymshark-card {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  height: 160px; 
  transition: transform 0.2s;
  cursor: pointer;
}

.gymshark-card:hover {
  transform: translateY(-3px); 
}

/* KARTIN ÜST KISMI (SİYAH) */
.card-top {
  background-color: #000;
  color: #fff;
  flex: 1; 
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  position: relative;
}

.logo-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.1;
}

.font-bold { font-weight: 800; font-size: 1rem; }
.font-light { font-weight: 300; font-size: 0.7rem; }

/* KARTIN ALT KISMI (GRİ ŞERİT) */
.card-bottom {
  background-color: #e6e6e6; 
  color: #000;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  padding: 12px 15px;
  text-align: left; 
}

/* --- YENİ EKLENEN FORM STİLLERİ (3. KART İÇİN) --- */
.form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.mini-form {
  width: 100%;
  padding: 0 10px;
}

.input-wrapper {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #666; /* Alt çizgi */
  padding-bottom: 5px;
}

.input-icon {
  margin-right: 8px;
}

.mini-form input {
  background: transparent;
  border: none;
  color: #fff;
  width: 100%;
  font-size: 0.8rem;
  outline: none;
}
.mini-form input::placeholder {
  color: #999;
}

.arrow-btn {
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0;
  margin-left: 5px;
  transition: transform 0.2s;
}
.arrow-btn:hover {
  transform: translateX(3px);
  color: #56F5F5; /* Gymshark turkuazı */
}

.mini-error {
  color: #ff4d4d;
  font-size: 0.6rem;
  margin-top: 5px;
  position: absolute;
  bottom: 5px;
  left: 10px;
}

/* Başarılı Durum */
.success-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  color: #56F5F5; /* Turkuaz */
}
.success-icon {
  font-size: 1.5rem;
}

/* --- FOOTER ALT KISIM (ICONS) --- */
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
}
.payment-icons {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.payment-icons img {
  height: 22px; 
}
.social-icons {
  display: flex;
  gap: 1.2rem;
}
.social-icons a {
  color: #000;
  font-size: 1.2rem;
  text-decoration: none;
  transition: color 0.2s;
}
.social-icons a:hover {
  color: #666;
}

/* --- RESPONSIVE --- */
@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr); 
  }
  .more-about-column {
    grid-column: span 2; 
    margin-top: 20px;
  }
}

@media (max-width: 600px) {
  .footer-grid {
    display: flex;
    flex-direction: column; 
  }
  .more-blocks {
    grid-template-columns: 1fr; 
  }
  .footer-bottom {
    flex-direction: column;
    gap: 20px;
  }
}
</style>