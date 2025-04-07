type QuantityType = "kilogram" | "bulan" | "unit";

export interface MyButtonQuantityProductProps {
  selectedQuantity?: number;
  onSelectQuantity?: (quantity: number) => void;
  quantityType?: QuantityType;
  }
  