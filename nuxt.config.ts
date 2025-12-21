// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  // 1. Modüller (Pinia)
  modules: ['@pinia/nuxt'],

  // 2. Global CSS (Bootstrap Icons)
  css: [
    'bootstrap-icons/font/bootstrap-icons.css'
  ],

  // 3. Atomik Yapı Ayarı (Klasör isimlerini bileşen ismine eklemesin)
  // Bu sayede <AtomsButton> yerine direkt <Button> yazabileceğiz.
  components: [
    {
      path: '~/components',
      pathPrefix: false, 
    }
  ]
})