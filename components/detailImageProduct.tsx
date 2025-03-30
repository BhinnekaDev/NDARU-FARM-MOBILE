import React, { useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import {
  imageAssets,
  ProductImageType,
} from "@/interfaces/detailImageProductProps";

interface MyDetailImageProductProps {
  productImageType: ProductImageType;
}

const MyDetailImageProduct: React.FC<MyDetailImageProductProps> = ({
  productImageType,
}) => {
  const selectedImages = imageAssets[productImageType] || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleSelectImage = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <View style={{ alignItems: "center", marginBottom: 8 }}>
      {/* Banner Image */}
      <Image
        source={selectedImages[currentIndex]}
        style={{
          width: "100%",
          height: 240,
          borderRadius: 12,
        }}
        resizeMode="cover"
      />

      <View style={{ flexDirection: "row", marginTop: 16, gap: 8 }}>
        {/* Thumbnail Images */}
        {selectedImages.slice(1, 5).map((thumb, index) => {
          const isSelected = currentIndex === index + 1;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelectImage(index + 1)}
            >
              <Image
                source={thumb}
                style={{
                  width: 82,
                  height: 82,
                  borderRadius: 8,
                  borderWidth: 2,
                  borderColor: isSelected ? "#3b82f6" : "#ccc",
                  transform: [{ scale: isSelected ? 1.05 : 1 }],
                }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default MyDetailImageProduct;
