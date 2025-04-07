import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
  ScrollView,
} from "react-native";
import { MyButtonQuantityProductProps } from "@/interfaces/buttonQuantityProductProps";

const MyButtonQuantityProduct: React.FC<MyButtonQuantityProductProps> = ({
  selectedQuantity: externalSelectedQuantity,
  onSelectQuantity,
  quantityType = "kilogram",
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const scrollViewRef1 = useRef<ScrollView>(null);
  const scrollViewRef2 = useRef<ScrollView>(null);

  const [selectedQuantity, setSelectedQuantity] = useState<number>(
    externalSelectedQuantity || 1
  );

  const handleSelectQuantity = (qty: number, index: number) => {
    setSelectedQuantity(qty);
    if (onSelectQuantity) {
      onSelectQuantity(qty);
    }

    const itemsPerRow = quantityType === "bulan" ? 6 : 5;
    const scrollPosition = (index % itemsPerRow) * 60; // Menyesuaikan index dengan jumlah item per baris

    if (index < itemsPerRow) {
      scrollViewRef1.current?.scrollTo({ x: scrollPosition, animated: true });
    } else {
      scrollViewRef2.current?.scrollTo({ x: scrollPosition, animated: true });
    }
  };

  const quantities =
    quantityType === "bulan"
      ? Array.from({ length: 12 }, (_, i) => i + 1)
      : Array.from({ length: 10 }, (_, i) => i + 1);

  const getQuantityLabel = (qty: number) => {
    if (quantityType === "kilogram") return `${qty}KG`;
    if (quantityType === "bulan") return `${qty} Bulan`;
    if (quantityType === "unit") return `${qty} Pcs`;
    return `${qty}`;
  };

  return (
    <View className="flex-col w-full gap-4 py-2">
      <ScrollView
        ref={scrollViewRef1}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <View className="flex-row gap-2">
          {quantities
            .slice(0, quantityType === "bulan" ? 6 : 5)
            .map((qty, index) => {
              const isSelected = selectedQuantity === qty;
              return (
                <TouchableOpacity
                  key={qty}
                  onPress={() => handleSelectQuantity(qty, index)}
                  className="border py-1.5 px-5 rounded-2xl"
                  style={{
                    backgroundColor: isSelected
                      ? isDark
                        ? "#333836"
                        : "#159778"
                      : "transparent",
                    borderColor: isSelected
                      ? isDark
                        ? "#333836"
                        : "#159778"
                      : isDark
                      ? "white"
                      : "black",
                  }}
                >
                  <Text
                    className="text-sm"
                    style={{
                      color: isSelected ? "white" : isDark ? "white" : "black",
                      fontFamily: "LexBold",
                    }}
                  >
                    {getQuantityLabel(qty)}
                  </Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView>

      <ScrollView
        ref={scrollViewRef2}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <View className="flex-row gap-2">
          {quantities
            .slice(quantityType === "bulan" ? 6 : 5)
            .map((qty, index) => {
              const isSelected = selectedQuantity === qty;
              return (
                <TouchableOpacity
                  key={qty}
                  onPress={() =>
                    handleSelectQuantity(
                      qty,
                      index + (quantityType === "bulan" ? 6 : 5)
                    )
                  }
                  className="border py-1.5 px-5 rounded-2xl"
                  style={{
                    backgroundColor: isSelected
                      ? isDark
                        ? "#333836"
                        : "#159778"
                      : "transparent",
                    borderColor: isSelected
                      ? isDark
                        ? "#333836"
                        : "#159778"
                      : isDark
                      ? "white"
                      : "black",
                  }}
                >
                  <Text
                    className="text-sm"
                    style={{
                      color: isSelected ? "white" : isDark ? "white" : "black",
                      fontFamily: "LexBold",
                    }}
                  >
                    {getQuantityLabel(qty)}
                  </Text>
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
};

export default MyButtonQuantityProduct;
