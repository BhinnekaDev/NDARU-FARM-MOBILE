import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UseQuantityProps {
  initialQuantity?: string | number;
  price?: number;
  id?: string; // Adding ID here
  name?: string; // Adding name here
  onZeroQuantity?: () => void;
  onResetDelete?: () => void;
}

export const useQuantity = ({ initialQuantity = 1, price = 0, id, name, onZeroQuantity, onResetDelete }: UseQuantityProps) => {
  const parsedQuantity = typeof initialQuantity === "string" ? parseInt(initialQuantity, 10) : initialQuantity ?? 1;
  const numericPrice = price ? parseInt(`${price}`.replace("Rp", "").replace(".", ""), 10) : 0;

  const [currentQuantity, setCurrentQuantity] = useState(parsedQuantity);

  // Fungsi untuk menyimpan data ke AsyncStorage
  const saveToStorage = async () => {
    try {
      const data = {
        id,
        name,
        quantity: currentQuantity,
        price: numericPrice, // gunakan numericPrice, bukan currentPrice
      };

      // Ambil data keranjang yang sudah ada dari AsyncStorage
      const cartItems = JSON.parse((await AsyncStorage.getItem("cartItems")) || "[]");

      // Temukan item dengan ID yang sesuai
      const itemIndex = cartItems.findIndex((item: any) => item.id === id);
      if (itemIndex !== -1) {
        // Jika item sudah ada, update kuantitas
        cartItems[itemIndex] = { ...cartItems[itemIndex], quantity: currentQuantity };
      } else {
        // Jika item belum ada, tambahkan item baru
        cartItems.push(data);
      }

      // Simpan kembali ke AsyncStorage
      await AsyncStorage.setItem("cartItems", JSON.stringify(cartItems));
      console.log("Data saved to AsyncStorage:", data);
    } catch (error) {
      console.error("Error saving to AsyncStorage:", error);
    }
  };

  // Mengupdate AsyncStorage setiap kali kuantitas berubah
  useEffect(() => {
    saveToStorage();
  }, [currentQuantity]); // hanya bergantung pada currentQuantity

  const increaseQuantity = () => {
    const newQty = currentQuantity + 1;
    setCurrentQuantity(newQty);
    onResetDelete?.();
  };

  const decreaseQuantity = () => {
    if (currentQuantity > 0) {
      const newQty = currentQuantity - 1;
      setCurrentQuantity(newQty);
      newQty === 0 ? onZeroQuantity?.() : onResetDelete?.();
    }
  };

  const getTotalPrice = () => {
    return currentQuantity * numericPrice; // menggunakan numericPrice, bukan currentPrice
  };

  return {
    currentQuantity,
    getTotalPrice, // gunakan getTotalPrice untuk menghitung total
    increaseQuantity,
    decreaseQuantity,
  };
};
