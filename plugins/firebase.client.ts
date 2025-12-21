import { defineNuxtPlugin } from '#app'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default defineNuxtPlugin((nuxtApp) => {
  // ⚠️ BURAYI DOLDURMAN GEREKİYOR ⚠️
  // Firebase Konsolundan (Project Settings -> General -> Your Apps) aldığın bilgileri buraya yapıştır.
const firebaseConfig = {
  apiKey: "AIzaSyAG4P1snbtAX5rbPSsEwzNizK07N5RhLbI",
  authDomain: "gymshark-clone-2be5e.firebaseapp.com",
  projectId: "gymshark-clone-2be5e",
  storageBucket: "gymshark-clone-2be5e.firebasestorage.app",
  messagingSenderId: "439057196348",
  appId: "1:439057196348:web:84a77f084c0b1636e46a39",
  measurementId: "G-X660CJ0D3C"
};

  // Firebase'i başlatıyoruz
  const app = initializeApp(firebaseConfig);
  
  // Veritabanı ve Kimlik Doğrulama servislerini başlatıyoruz
  const db = getFirestore(app);
  const auth = getAuth(app);

  return {
    provide: {
      db,
      auth
    }
  }
});