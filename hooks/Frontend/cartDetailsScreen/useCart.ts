import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// OUR INTERFACES
import { CartItem } from "@/interfaces/cartDetailsProps";

export default function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  // Ambil data keranjang dari AsyncStorage
  const fetchCartData = async () => {
    const storedCart = await AsyncStorage.getItem("cartItems");
    if (storedCart) {
      const parsedCart: CartItem[] = JSON.parse(storedCart);

      // Hapus item yang tidak valid
      const validCart = parsedCart.filter((item) => item.id && item.name && item.price !== undefined);

      setCartItems(validCart);
      setCartCount(validCart.length);

      // Simpan kembali cart yang bersih
      await AsyncStorage.setItem("cartItems", JSON.stringify(validCart));
    } else {
      setCartItems([]);
      setCartCount(0);
    }
  };

  // Efek pertama kali untuk ambil data keranjang dari AsyncStorage
  useEffect(() => {
    fetchCartData();
  }, []);

  // Efek untuk menyimpan data keranjang yang sudah diubah
  useEffect(() => {
    const saveCartData = async () => {
      await AsyncStorage.setItem("cartItems", JSON.stringify(cartItems));
    };

    saveCartData();
  }, [cartItems]);

  // Fungsi untuk me-refresh data keranjang
  const refreshCart = (): Promise<void> => {
    return new Promise((resolve) => {
      setRefreshing(true);
      fetchCartData().then(() => {
        setRefreshing(false);
        resolve();
      });
    });
  };

  // Fungsi untuk menambahkan item ke keranjang
  const handleAddToCart = (item: CartItem) => {
    // Validasi item terlebih dahulu
    if (!item.id || !item.name || item.price === undefined) {
      console.warn("Item tidak valid, tidak ditambahkan ke keranjang:", item);
      return;
    }

    const itemExists = cartItems.some((cartItem) => cartItem.id === item.id);

    if (!itemExists) {
      setCartItems((prevItems) => [...prevItems, item]);
      setCartCount((prevCount) => prevCount + 1);
      alert("Item berhasil dipesan.");
    } else {
      alert("Item ini sudah dipesan, tidak bisa dipesan lagi.");
    }
  };

  // Fungsi untuk menghapus item dari keranjang
  const handleDeleteFromCart = (itemId: string) => {
    const updatedItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedItems);
    setCartCount(updatedItems.length);
  };

  // Fungsi untuk menghapus seluruh item dalam keranjang
  const clearCart = () => {
    setCartItems([]);
    setCartCount(0);
    AsyncStorage.removeItem("cartItems");
  };

  // Fungsi untuk memperbarui kuantitas item dalam keranjang
  const updateQuantity = (itemId: string, newQuantity: number) => {
    const updatedItems = cartItems.map((item) => (item.id === itemId ? { ...item, quantity: String(newQuantity) } : item));
    setCartItems(updatedItems);

    setCartCount(updatedItems.length);
  };

  return {
    cartItems,
    cartCount,
    refreshing,
    refreshCart,
    handleAddToCart,
    handleDeleteFromCart,
    clearCart,
    updateQuantity, // Tambahkan fungsi update kuantitas
  };
}
