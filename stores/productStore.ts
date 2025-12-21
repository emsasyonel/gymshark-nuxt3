import { defineStore } from 'pinia'
import { collection, getDocs, addDoc } from 'firebase/firestore' // addDoc eklendi
import type { IProduct } from '~/types'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [] as IProduct[],
    loading: false,
    error: null as string | null
  }),

  actions: {
    // --- MEVCUT VERİ ÇEKME FONKSİYONUN ---
    async fetchProducts() {
      this.loading = true
      this.error = null
      
      try {
        const { $db } = useNuxtApp()
        
        const querySnapshot = await getDocs(collection($db, 'products'))
        
        this.products = querySnapshot.docs.map(doc => {
          const data = doc.data()
          
          let finalSizes: string[] = []

          if (Array.isArray(data.sizes)) {
            finalSizes = data.sizes
          } 
          else if (typeof data.sizes === 'string') {
            finalSizes = data.sizes.split(/[\s,]+/).filter(s => s.trim() !== '')
          }
          else {
            finalSizes = ['XS', 'S', 'M', 'L', 'XL']
          }

          return {
            id: doc.id,
            name: data.name || 'İsimsiz Ürün',
            price: Number(data.price) || 0,
            originalPrice: Number(data.originalPrice) || 0,
            image: data.image || '',
            imageHover: data.imageHover || data.image || '',
            sizes: finalSizes, 
            rating: Number(data.rating) || 4.5,
            color: data.color || 'Black',
            tag: data.tag || ''
          } as IProduct
        })

      } catch (err: any) {
        console.error('Store Hatası:', err)
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    async fetchProductById(id: string) {
    // Eğer ürünler zaten yüklendiyse, içinden bul
    if (this.products.length > 0) {
      return this.products.find(p => p.id === id);
    }
    
    // Yüklenmediyse Firebase'den tekil çek (Performans için)
    const { $db } = useNuxtApp();
    const { doc, getDoc } = await import('firebase/firestore');
    
    try {
      const docRef = doc($db, 'products', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        // Veri temizleme (Gallery için sahte çoklu resim oluşturuyoruz)
        return {
            id: docSnap.id,
            name: data.name,
            price: Number(data.price),
            description: data.description || "Great for running, cycling, light exercise...", // Açıklama yoksa
            image: data.image,
            imageHover: data.imageHover,
            sizes: data.sizes || ['XS', 'S', 'M', 'L', 'XL'],
            color: data.color || 'Black',
            // Galeride çok resim varmış gibi davranmak için aynı resmi çoğaltıyoruz
            gallery: [data.image, data.imageHover, data.image, data.imageHover] 
        } as any; // Geçici olarak any kullandık, IProduct'ı güncelleyebilirsin
      }
    } catch (error) {
      console.error("Ürün hatası:", error);
    }
    return null;
  }
  }
})