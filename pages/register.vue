<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/authStore'
import type { IAuthCredentials } from '~/types'

// Header ve Footer'ı gizlemek için 'auth' düzenini kullanıyoruz
definePageMeta({
  layout: 'auth'
})

// Store ve Router kurulumu
const authStore = useAuthStore()
const router = useRouter()

// Form verileri
const firstName = ref('')
const lastName = ref('')
const dob = ref('')
const email = ref('')
const password = ref('')
const isPasswordVisible = ref(false)
const agreedToEmails = ref(false)

// Kayıt işlemi fonksiyonu
const handleRegister = async () => {
  // Store'un beklediği formatta veriyi hazırla
  const payload: IAuthCredentials = {
    email: email.value,
    password: password.value,
    firstName: firstName.value,
    lastName: lastName.value
  }

  // Store action'ını çağır
  const success = await authStore.registerUser(payload)

  // Başarılıysa ana sayfaya yönlendir
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
      
      <h1 class="title">GYMSHARK SIGNUP</h1>
      <p class="subtitle">
        One account, across all apps, just to make things a little
        <br>
        easier.
      </p>

      <form @submit.prevent="handleRegister" class="login-form">
        
        <div class="input-group">
          <label for="firstName">First Name</label>
          <input type="text" id="firstName" v-model="firstName" required />
        </div>

        <div class="input-group">
          <label for="lastName">Last Name</label>
          <input type="text" id="lastName" v-model="lastName" required />
        </div>

        <div class="input-group">
          <label for="dob">Date Of Birth</label>
          <input type="text" id="dob" v-model="dob" placeholder="DD/MM/YYYY" />
        </div>

        <div class="input-group">
          <label for="email">Email address*</label>
          <input type="email" id="email" v-model="email" required />
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

        <div class="checkbox-group">
          <input type="checkbox" id="agree" v-model="agreedToEmails" />
          <label for="agree">
            Tick here to receive emails about our products, apps, sales, exclusive content and more. See our 
            <a href="#">Privacy Policy</a> and <a href="#">California Notice</a>.
          </label>
        </div>

        <div v-if="authStore.error" class="error-text">
          {{ authStore.error }}
        </div>

        <button type="submit" class="btn btn-primary" :disabled="authStore.loading">
          {{ authStore.loading ? 'CREATING...' : 'CREATE ACCOUNT' }}
        </button>

      </form>
      
      <p class="login-link">
        Already have an account? 
        <NuxtLink to="/login">Log in</NuxtLink>
      </p>

    </div>
  </div>
</template>

<style scoped>
/* LoginView ile aynı ana stiller */
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
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
  font-size: 1.25rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 0.9rem;
  color: #555;
  line-height: 1.5;
  margin-bottom: 2rem;
}

.login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
}

/* LoginView ile aynı input stili */
.input-group {
  position: relative;
  width: 100%;
  margin-bottom: 1.5rem;
  text-align: left;
}

.input-group label {
  position: absolute;
  top: 6px;
  left: 12px;
  font-size: 0.75rem;
  color: #767676;
  pointer-events: none; /* Tıklamayı engelle, inputa geçsin */
}

.input-group input {
  width: 100%;
  padding: 1.8rem 12px 0.6rem 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}
.input-group input:focus {
  outline: 1px solid #000;
  border-color: #000;
}
/* DOB placeholder'ı için özel stil */
.input-group input::placeholder {
  color: #bbb;
  font-size: 0.9rem;
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

/* YENİ: Checkbox Stili */
.checkbox-group {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  text-align: left;
  margin-bottom: 1.5rem;
}
.checkbox-group input {
  margin-top: 3px;
  flex-shrink: 0;
  accent-color: #000; /* Checkbox rengi siyah */
}
.checkbox-group label {
  font-size: 0.85rem;
  color: #555;
  line-height: 1.5;
}
.checkbox-group a {
  color: #000;
  font-weight: 600;
  text-decoration: underline;
}

/* LoginView ile aynı buton stili */
.btn-primary {
  background-color: #000;
  color: #fff;
  padding: 0.9rem 2rem;
  text-decoration: none;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.9rem;
  border: none;
  border-radius: 30px; /* Login ile uyumlu oval yapıldı */
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}
.btn-primary:hover {
  background-color: #333;
}
/* Buton disable olduğunda (yüklenirken) */
.btn-primary:disabled {
  background-color: #777;
  cursor: not-allowed;
}

/* Hata mesajı stili */
.error-text {
  color: #d32f2f;
  font-size: 0.85rem;
  margin-bottom: 15px;
  text-align: left;
  font-weight: 600;
}

/* LoginView ile aynı alt link stili */
.login-link {
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: #555;
}
.login-link a {
  color: #000;
  font-weight: 600;
  text-decoration: underline;
}
</style>