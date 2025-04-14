// interfaces.ts

// Definisikan interface untuk CartItem
export interface CartItem {
  id: string; // id harus ada dan bertipe string
  name: string;
  price: number;
  quantity: number;
  // Properti lainnya jika diperlukan
}

// Definisikan interface untuk return value hook useCart
export interface UseCartReturn {
  cartItems: CartItem[]; // Daftar item yang ada di keranjang
  cartCount: number; // Jumlah total item dalam keranjang
  disabledButtons: Set<string>; // Set yang menyimpan item yang tombolnya dinonaktifkan
  handleAddToCart: (item: CartItem) => void; // Fungsi untuk menambahkan item ke keranjang
  clearCart: () => void; // Fungsi untuk menghapus semua item dari keranjang
  isItemDisabled: (id: string) => boolean; // Fungsi untuk memeriksa apakah tombol harus dinonaktifkan
}
