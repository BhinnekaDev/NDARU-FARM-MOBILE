import { useState, useMemo } from "react";

export interface Product {
  id: string;
  name: string;
  description: string;
  image: any;
  price: number;
  type: "vegetable" | "facility" | "service";
  unit?: string;
}

const dummyProducts: Product[] = [
  {
    id: "1",
    name: "Selada Segar",
    description: "Sayuran hijau segar dan sehat.",
    image: require("@/assets/images/news.png"),
    price: 5000,
    type: "vegetable",
  },
  {
    id: "2",
    name: "Pelatihan Selada",
    description: "Dapatkan pelatihan selada di Ndaru Farm.",
    image: require("@/assets/images/lettuceservices.png"),
    price: 275000,
    type: "service",
  },
  {
    id: "3",
    name: "Fungisida Tebukonazol",
    description:
      "Gabungan fungisida methoxyacrylate trifloxystrobin dan triazole tebuconazole.",
    image: require("@/assets/images/sarana.png"),
    price: 75000,
    type: "facility",
  },
];

function getUnitByType(type: Product["type"]): string {
  switch (type) {
    case "vegetable":
      return "KG";
    case "service":
      return "Bulan";
    case "facility":
      return "PCS";
    default:
      return "";
  }
}

function getQuantitiesByType(type: Product["type"]) {
  let max = 10;
  if (type === "service") max = 12;

  const unit = getUnitByType(type);

  return Array.from({ length: max }, (_, i) => {
    const value = (i + 1).toString();
    return {
      label: `${value} ${unit}`,
      value,
    };
  });
}

export default function useFavoriteProduct() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  const filteredProducts = useMemo(() => {
    let products = dummyProducts;

    if (selectedCategory !== "Semua") {
      products = dummyProducts.filter((item) => {
        if (selectedCategory === "Sayuran") return item.type === "vegetable";
        if (selectedCategory === "Sarana Pertanian")
          return item.type === "facility";
        if (selectedCategory === "Jasa") return item.type === "service";
        return false;
      });
    }

    return products.map((item) => ({
      ...item,
      unit: getUnitByType(item.type),
    }));
  }, [selectedCategory]);

  return {
    selectedCategory,
    setSelectedCategory,
    filteredProducts,
    getQuantitiesByType,
  };
}
