// 1. Ürün Arayüzü
export interface IProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  imageHover: string;
  sizes: string[];
  category?: string;
  rating?: number;
  color?: string;
  tag?: string;
}

// 2. Sepet Öğesi Arayüzü
export interface ICartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  selectedSize: string;
  quantity: number;
}

// 3. Kullanıcı Arayüzü
export interface IUser {
  uid: string;
  email: string;
  displayName?: string;
  role: 'user' | 'admin';
}

// 4. Kategori Arayüzü (Menü için)
export interface ICategory {
  id: string;
  title: string;
  slug: string; // url dostu isim (örn: mens-workout)
}
// Sepetteki ürünün şablonu
export interface ICartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  selectedSize: string; // Seçilen Beden
  quantity: number;     // Adet
  color: string;        // Renk
}

// Ürünlerin genel şablonu (Zaten vardı, kontrol et)
export interface IProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  imageHover: string;
  sizes: string[];
  color?: string;
  tag?: string;
  rating?: number;
}