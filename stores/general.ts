import { defineStore } from 'pinia'
import type { ISubscriber } from '../types'

export const useGeneralStore = defineStore('general', {
  state: () => ({
    subscribers: [] as ISubscriber[]
  }),

  actions: {
    // Bültene abone ol (İlerde Firebase'e yazacak)
    async subscribeToNewsletter(email: string) {
      console.log('Abone olundu:', email)
      
      this.subscribers.push({
        email,
        subscribedAt: new Date()
      })
      
      alert('Teşekkürler! Bültene abone oldunuz.')
    }
  }
})