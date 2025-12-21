// Bu dosya tüm yönlendirme (routing) işlerini tek bir yerden yönetir.
// Component'ler nereye gideceğini bilmez, sadece bu fonksiyonları çağırır.

export const useAppRouter = () => {
  const router = useRouter(); // Nuxt'ın kendi router'ını alıyoruz

  // 1. Ürün Detayına Git
  const goToProductDetail = (id: string) => {
    router.push(`/products/${id}`);
  };

  // 2. Sepete Git (İleride gerekirse diye)
  const goToCart = () => {
    // Eğer sepet ayrı bir sayfaysa:
    // router.push('/cart');
    
    // Ama senin projende sepet sağdan açılıyor (UI Store ile), 
    // o yüzden burası boş kalabilir veya UI store tetiklenebilir.
  };

  // 3. Anasayfaya Dön
  const goToHome = () => {
    router.push('/');
  };

  // 4. Giriş Sayfasına Git
  const goToLogin = () => {
    router.push('/login');
  };

  return {
    goToProductDetail,
    goToCart,
    goToHome,
    goToLogin
  };
};