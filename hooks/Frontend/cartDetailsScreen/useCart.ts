import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// OUR INTERFACES
import { CartItem } from "@/interfaces/cartDetailsProps";

export default function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCartData = async () => {
    const storedCart = await AsyncStorage.getItem("cartItems");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      setCartItems(parsedCart);
      setCartCount(parsedCart.length);
    } else {
      setCartItems([]);
      setCartCount(0);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  useEffect(() => {
    const saveCartData = async () => {
      await AsyncStorage.setItem("cartItems", JSON.stringify(cartItems));
    };

    saveCartData();
  }, [cartItems]);

  const refreshCart = (): Promise<void> => {
    return new Promise((resolve) => {
      setRefreshing(true);
      fetchCartData().then(() => {
        setRefreshing(false);
        resolve();
      });
    });
  };

  const handleAddToCart = (item: CartItem) => {
    const itemExists = cartItems.some((cartItem) => cartItem.id === item.id);

    if (!itemExists) {
      setCartItems((prevItems) => [...prevItems, item]);
      setCartCount((prevCount) => prevCount + 1);
      alert("Item berhasil dipesan.");
    } else {
      alert("Item ini sudah dipesan, tidak bisa dipesan lagi.");
    }
  };

  const handleDeleteFromCart = (itemId: string) => {
    const updatedItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedItems);
    setCartCount(updatedItems.length);
  };

  const clearCart = () => {
    setCartItems([]);
    setCartCount(0);
    AsyncStorage.removeItem("cartItems");
  };

  return {
    cartItems,
    cartCount,
    refreshing,
    refreshCart,
    handleAddToCart,
    handleDeleteFromCart,
    clearCart,
  };
}
