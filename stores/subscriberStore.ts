import { defineStore } from 'pinia'
import { collection, addDoc } from 'firebase/firestore'
import { useNuxtApp } from '#app'
import type { ISubscriber } from '~/types'

export const useSubscriberStore = defineStore('subscriber', {
  state: () => ({
    loading: false,
    success: false, // İşlem başarılı mı?
    error: null as string | null
  }),

  actions: {
    async subscribeUser(email: string) {
      // Basit doğrulama
      if (!email || !email.includes('@')) {
        this.error = "Please enter a valid email address."
        return
      }

      this.loading = true
      this.error = null
      this.success = false
      
      const { $db } = useNuxtApp()

      try {
        // Veri nesnesini hazırla
        const newSubscriber: ISubscriber = {
          email: email,
          signedUpAt: new Date()
        }

        // 4. TABLOYA YAZMA İŞLEMİ BURADA YAPILIYOR: 'subscribers'
        await addDoc(collection($db as any, 'subscribers'), newSubscriber)

        this.success = true
        this.error = null

      } catch (err: any) {
        console.error("Abonelik hatası:", err)
        this.error = "Something went wrong. Please try again."
      } finally {
        this.loading = false
      }
    },

    // Formu sıfırlamak için
    resetState() {
      this.success = false
      this.error = null
      this.loading = false
    }
  }
})