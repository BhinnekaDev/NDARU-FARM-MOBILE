import { useState } from "react";

export default function useCart() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [disabledButtons, setDisabledButtons] = useState<Set<string>>(new Set());

  const handleAddToCart = (item: any) => {
    if (!disabledButtons.has(item.id)) {
      setDisabledButtons((prev) => new Set(prev.add(item.id)));
      setCartItems((prevItems) => [...prevItems, item]);
      setCartCount((prevCount) => prevCount + 1);
    } else {
      console.log("Item ini sudah dipesan, tidak bisa dipesan lagi.");
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setCartCount(0);
    setDisabledButtons(new Set());
  };

  return {
    cartItems,
    cartCount,
    disabledButtons,
    handleAddToCart,
    clearCart,
  };
}
