import { useState } from "react";
import { MyCardProps } from "@/interfaces/cardProps";

// Data Produk
const products: MyCardProps[] = [
  {
    id: "1",
    image: require("@/assets/images/lettuce.png"),
    name: "Selada",
    description: "Sayuran segar dari pertanian organik.",
    price: "Rp5.000",
    quantity: "1KG",
    detailType: "vegetable",
    buttonType: "icon",
  },
  {
    id: "2",
    image: require("@/assets/images/lettuceservices.png"),
    name: "Pelatihan Selada",
    description: "Dapatkan pelatihan selada di Ndaru Farm.",
    price: "Rp275.000",
    quantity: "1Bulan",
    detailType: "service",
    buttonTitle: "Baca Selengkapnya",
  },
  {
    id: "3",
    image: require("@/assets/images/news.png"),
    name: "Viral! Selada yang...",
    description: "Lorem ipsum dolor sit amet.",
    date: "12 Februari 2024",
    detailType: "news",
    buttonType: "icon",
  },
  {
    id: "4",
    image: require("@/assets/images/sarana.png"),
    name: "Fungisida Tebukonazol",
    description:
      "Gabungan fungisida methoxyacrylate trifloxystrobin dan triazole tebuconazole.",
    price: "Rp75.000",
    quantity: "1PCS",
    detailType: "facility",
    buttonType: "icon",
  },
];

// Mapping Kategori
const categoryMap: Record<
  string,
  "vegetable" | "news" | "facility" | "service" | undefined
> = {
  Sayuran: "vegetable",
  Jasa: "service",
  Berita: "news",
  "Sarana Pertanian": "facility",
};

export default function useProducts() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  // Filter Produk berdasarkan Kategori
  const filteredProducts = products.filter(
    (item: MyCardProps) =>
      selectedCategory === "Semua" ||
      item.detailType === categoryMap[selectedCategory]
  );

  return {
    selectedCategory,
    setSelectedCategory,
    filteredProducts,
  };
}
