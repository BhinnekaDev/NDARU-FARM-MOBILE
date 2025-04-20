import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UseQuantityProps {
  initialQuantity?: string | number;
  price?: number;
  id?: string;
  name?: string;
  onZeroQuantity?: () => void;
  onResetDelete?: () => void;
}

export const useQuantity = ({ initialQuantity = 1, price = 0, id, name, onZeroQuantity, onResetDelete }: UseQuantityProps) => {
  const parsedQuantity = isNaN(Number(initialQuantity)) ? 1 : typeof initialQuantity === "string" ? parseInt(initialQuantity, 10) : initialQuantity;
  const numericPrice = price && !isNaN(price) ? parseInt(`${price}`.replace("Rp", "").replace(".", ""), 10) : 0;
  const [currentQuantity, setCurrentQuantity] = useState(parsedQuantity);
  const [totalCartPrice, setTotalCartPrice] = useState(0);

  // Fungsi untuk menyimpan data ke AsyncStorage
  const saveToStorage = async () => {
    try {
      const data = {
        id,
        name,
        quantity: currentQuantity,
        price: numericPrice,
      };

      const cartItems = JSON.parse((await AsyncStorage.getItem("cartItems")) || "[]");
      const itemIndex = cartItems.findIndex((item: any) => item.id === id);

      if (itemIndex !== -1) {
        cartItems[itemIndex] = { ...cartItems[itemIndex], quantity: currentQuantity };
      } else {
        cartItems.push(data);
      }

      await AsyncStorage.setItem("cartItems", JSON.stringify(cartItems));
      console.log("MENYIMPAN DATA AWAL KE STORAGE:", data);
    } catch (error) {
      console.error("Error saving to SAVE STORAGE:", error);
    }
  };

  // Fungsi untuk menghitung total harga keranjang

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

  // Simpan item ke AsyncStorage dan update total cart price
  const saveCartItem = async (item: any) => {
    try {
      const storedCart = await AsyncStorage.getItem("cartItems");
      const parsedCart = storedCart ? JSON.parse(storedCart) : [];

      const index = parsedCart.findIndex((cartItem: any) => cartItem.id === item.id);
      if (index !== -1) {
        parsedCart[index] = item; // Update item yang sudah ada
      } else {
        parsedCart.push(item); // Tambahkan item baru
      }

      await AsyncStorage.setItem("cartItems", JSON.stringify(parsedCart));
      console.log("Data saved to AsyncStorage:", JSON.stringify(parsedCart));
      updateTotalCartPrice(); // Update harga total setelah perubahan
    } catch (err) {
      console.error("Error saving data to AsyncStorage", err);
    }
  };

  // Modifikasi fungsi increaseQuantity dan decreaseQuantity untuk langsung update total dan simpan ke AsyncStorage
  const increaseQuantityAndUpdateTotal = () => {
    increaseQuantity();
    const newQuantity = currentQuantity + 1;
    saveCartItem({ id, name, price, quantity: newQuantity });
    setTotalCartPrice((prevTotal) => prevTotal + price);
  };

  const decreaseQuantityAndUpdateTotal = () => {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      decreaseQuantity();
      saveCartItem({ id, name, price, quantity: newQuantity });
      setTotalCartPrice((prevTotal) => prevTotal - price);
    } else if (currentQuantity === 1) {
      decreaseQuantity();
      saveCartItem({ id, name, price, quantity: 0 });
      setTotalCartPrice((prevTotal) => prevTotal - price);
    }
  };

  const updateTotalCartPrice = async () => {
    try {
      const cartItems = JSON.parse((await AsyncStorage.getItem("cartItems")) || "[]");

      const total = cartItems.reduce((sum: number, item: any) => {
        let quantity =
          typeof item.quantity === "string"
            ? parseFloat(item.quantity.replace(/[^\d.-]/g, "")) // Ambil angka saja dari string
            : item.quantity;

        if (isNaN(quantity)) {
          console.warn(`Invalid quantity for item ${item.id}, using 1 as default.`);
          quantity = 1; // Default ke 1 jika quantity tidak valid
        }

        return sum + item.price * quantity;
      }, 0);

      setTotalCartPrice(total);
      console.log("TOTAL UPDATE TERBARU :", total);
    } catch (error) {
      console.error("Error calculating TOTAL UPDATE TERBARU:", error);
    }
  };

  useEffect(() => {
    const updateCart = async () => {
      await saveToStorage(); // Simpan ke AsyncStorage
      await updateTotalCartPrice(); // Update total harga setelah perubahan
    };

    updateCart();
    console.log("Current quantity changed:", currentQuantity);
  }, [currentQuantity]);

  return {
    currentQuantity,
    totalCartPrice,
    increaseQuantity,
    decreaseQuantity,
    increaseQuantityAndUpdateTotal,
    decreaseQuantityAndUpdateTotal,
  };
};
