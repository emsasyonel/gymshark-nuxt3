import { defineStore } from 'pinia'
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile 
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { useNuxtApp } from '#app'
import type { IUser, IAuthCredentials } from '~/types'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as IUser | null, // Kullanıcı bilgisi
    loading: false,
    error: null as string | null
  }),

  actions: {
    // --- REGISTER (KAYIT OL) ---
    async registerUser(creds: IAuthCredentials) {
      this.loading = true
      this.error = null
      const { $auth, $db } = useNuxtApp()

      try {
        // 1. Firebase Auth ile kullanıcı oluştur
        const userCredential = await createUserWithEmailAndPassword($auth, creds.email, creds.password)
        const firebaseUser = userCredential.user

        // 2. Profil ismini güncelle (Auth tarafında)
        await updateProfile(firebaseUser, {
          displayName: `${creds.firstName} ${creds.lastName}`
        })

        // 3. FIRESTORE'a Kullanıcıyı Kaydet (İşte 3. Tablomuz: 'users')
        const newUser: IUser = {
          uid: firebaseUser.uid,
          email: creds.email,
          firstName: creds.firstName || '',
          lastName: creds.lastName || '',
          createdAt: new Date(),
          role: 'customer' // <-- BUNU EKLE (Varsayılan olarak müşteri)
        }

        // 'users' koleksiyonuna, döküman ID'si kullanıcının UID'si olacak şekilde yazıyoruz
        await setDoc(doc($db, 'users', firebaseUser.uid), newUser)

        // 4. State'i güncelle
        this.user = newUser
        
        // Başarılı olursa true dön
        return true

      } catch (err: any) {
        console.error("Register Hatası:", err)
        this.error = err.message
        return false
      } finally {
        this.loading = false
      }
    },

    // --- LOGIN (GİRİŞ YAP) ---
    async loginUser(creds: IAuthCredentials) {
      this.loading = true
      this.error = null
      const { $auth, $db } = useNuxtApp()

      try {
        // 1. Giriş yap
        const userCredential = await signInWithEmailAndPassword($auth, creds.email, creds.password)
        
        // 2. Firestore'dan detaylı bilgiyi çek
        const docRef = doc($db, 'users', userCredential.user.uid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          this.user = docSnap.data() as IUser
        } else {
          // Eğer firestore'da kaydı yoksa basic auth bilgisini kullan
          this.user = {
            uid: userCredential.user.uid,
            email: userCredential.user.email || '',
            firstName: 'User',
            lastName: '',
            createdAt: new Date(),
            role: 'customer' // <-- BUNU DA EKLE
          }
        }
        return true

      } catch (err: any) {
        console.error("Login Hatası:", err)
        this.error = "Email or Password incorrect."
        return false
      } finally {
        this.loading = false
      }
    },

    // --- LOGOUT ---
    async logoutUser() {
      const { $auth } = useNuxtApp()
      await signOut($auth)
      this.user = null
    }
  }
})