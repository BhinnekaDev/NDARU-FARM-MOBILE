import { useState } from "react";

interface UseQuantityProps {
  initialQuantity?: string | number;
  price?: string;
  onZeroQuantity?: () => void;
  onResetDelete?: () => void;
}

export const useQuantity = ({ initialQuantity = 1, price = "0", onZeroQuantity, onResetDelete }: UseQuantityProps) => {
  const parsedQuantity = typeof initialQuantity === "string" ? parseInt(initialQuantity, 10) : initialQuantity ?? 1;

  const numericPrice = price ? parseInt(price.replace("Rp", "").replace(".", ""), 10) : 0;

  const [currentQuantity, setCurrentQuantity] = useState(parsedQuantity);
  const [currentPrice, setCurrentPrice] = useState(numericPrice * parsedQuantity);

  const increaseQuantity = () => {
    const newQty = currentQuantity + 1;
    setCurrentQuantity(newQty);
    setCurrentPrice(newQty * numericPrice);
    onResetDelete?.();
  };

  const decreaseQuantity = () => {
    if (currentQuantity > 0) {
      const newQty = currentQuantity - 1;
      setCurrentQuantity(newQty);
      setCurrentPrice(newQty * numericPrice);

      newQty === 0 ? onZeroQuantity?.() : onResetDelete?.();
    }
  };

  return {
    currentQuantity,
    currentPrice,
    increaseQuantity,
    decreaseQuantity,
  };
};
