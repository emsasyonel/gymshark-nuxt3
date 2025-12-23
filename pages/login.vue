<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/authStore'

definePageMeta({
  layout: 'auth'
})

// Store ve Router Kurulumu
const authStore = useAuthStore()
const router = useRouter()

// Form Verileri
const email = ref('')
const password = ref('') 
const isPasswordVisible = ref(false)

// Giriş işlemi fonksiyonu
const handleLogin = async () => {
  // Store action'ını çağırıyoruz
  const success = await authStore.loginUser({
    email: email.value,
    password: password.value
  })

  // Başarılıysa ana sayfaya git
  if (success) {
    router.push('/')
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-box">
      
        <div class="logo-container">
            <img src="../../images/logo.png" alt="Gymshark Logo" class="site-logo" />
        </div>
      
      <h1 class="title">GYMSHARK LOGIN</h1>
      <p class="subtitle">
        Shop your styles, save top picks to your wishlist,
        <br>
        track those orders & train with us.
      </p>

      <form @submit.prevent="handleLogin" class="login-form">
        
        <div class="input-group">
          <label for="email">Email address*</label>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            required 
          />
        </div>

        <div class="input-group">
          <label for="password">Password*</label>
          <input 
            :type="isPasswordVisible ? 'text' : 'password'" 
            id="password" 
            v-model="password" 
            required 
          />
          <button 
            type="button" 
            class="toggle-password" 
            @click="isPasswordVisible = !isPasswordVisible"
            aria-label="Toggle password visibility"
          >
            <i v-if="isPasswordVisible" class="bi bi-eye-slash"></i>
            <i v-else class="bi bi-eye"></i>
          </button>
        </div>

        <NuxtLink to="#" class="forgot-password">Forgot password?</NuxtLink>

        <div v-if="authStore.error" class="error-text">
          {{ authStore.error }}
        </div>

        <button type="submit" class="btn btn-primary" :disabled="authStore.loading">
          {{ authStore.loading ? 'LOGGING IN...' : 'LOG IN' }}
        </button>

      </form>
      
      <p class="signup-link">
        Don't have an account? 
        <NuxtLink to="/register">Sign up</NuxtLink>
      </p>

    </div>
  </div>
</template>

<style scoped>
/* Senin gönderdiğin orijinal CSS kodları */
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh; 
  width: 100%;
  padding: 2rem 1.5rem;
  font-family: Arial, sans-serif;
}

.login-box {
  width: 100%;
  max-width: 400px; 
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.logo-container {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
}

.site-logo {
  width: 60px; 
  height: auto;
  object-fit: contain;
}

.title {
  font-size: 1.5rem; 
  font-weight: 800; 
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  color: #000;
}

.subtitle {
  font-size: 0.95rem;
  color: #555;
  line-height: 1.5;
  margin-bottom: 2rem;
}

.login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.input-group {
  position: relative;
  width: 100%;
  margin-bottom: 1.5rem;
  text-align: left;
}

.input-group label {
  position: absolute;
  top: 10px;
  left: 12px;
  font-size: 0.75rem; 
  color: #767676;
  pointer-events: none; 
}

.input-group input {
  width: 100%;
  padding: 1.8rem 12px 0.6rem 12px; 
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  background-color: transparent;
}

.input-group input:focus {
  outline: 1px solid #000;
  border-color: #000;
}

.toggle-password {
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: #767676;
}

.forgot-password {
  font-size: 0.85rem;
  font-weight: 600;
  color: #000;
  text-decoration: underline;
  margin-bottom: 1.5rem;
  align-self: flex-start; 
}

.btn-primary {
  background-color: #000;
  color: #fff;
  padding: 1rem 2rem;
  text-decoration: none;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 1rem;
  border: none;
  border-radius: 30px; 
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%; 
}
.btn-primary:hover {
  background-color: #333;
  transform: scale(1.02); 
}

/* Disabled durumu için stil */
.btn-primary:disabled {
  background-color: #777;
  cursor: not-allowed;
  transform: none;
}

/* Hata mesajı stili */
.error-text {
  color: #d32f2f;
  font-size: 0.85rem;
  margin-bottom: 15px;
  text-align: left;
  font-weight: 600;
}

.signup-link {
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: #555;
}
.signup-link a {
  color: #000;
  font-weight: 700;
  text-decoration: underline;
}
</style>