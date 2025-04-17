import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import { View, Image, TouchableOpacity, useColorScheme, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
// COMPONENTS
import MyText from "@/components/text";
import MyButton from "@/components/button";

// OUR HOOKS
import { useCartAnimations } from "@/hooks/Frontend/cartDetailsScreen/useCartAnimation";
// INTERFACES
import { MyCardProps } from "@/interfaces/cardProps";

const CartDetails = ({
  image, //
  bgImageStyle,
  imageStyle,
  name,
  description,
  price,
  quantity,
  date,
  detailType,
  rating,
  id,
  onPress,
  buttonType = "default",
  isDisabled,
  onDelete,
}: MyCardProps) => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const [currentQuantity, setCurrentQuantity] = useState(quantity || 1);
  const [currentPrice, setCurrentPrice] = useState(price ? parseInt(price.replace("Rp", "").replace(".", "")) : 0);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const { slideLeftAnim, animateLeft } = useCartAnimations();

  const onDetail = () => {
    const routes = {
      vegetable: "/screens/vegetableDetailScreen",
      news: "/screens/newsDetailScreen",
      service: "/screens/servicesDetailScreen",
      facility: "/screens/facilityDetailScreen",
    };

    const path = detailType ? routes[detailType as keyof typeof routes] : undefined;

    if (!path) {
      console.error("Unknown detailType:", detailType);
      return;
    }

    router.push(path as any);
  };

  const getCardBackgroundColor = () => {
    const bgColors: Record<string, string> = {
      vegetable: "#093731",
      news: "#3D081C",
      service: "#071758",
      facility: "#074558",
    };

    return bgColors[detailType ?? "facility"];
  };

  const getBgImageColor = () => {
    const bgColors: Record<string, string> = {
      vegetable: "#159778",
      news: "#5A0B29",
      service: "#1C2D6F",
      facility: "#248EAE",
    };

    return bgColors[detailType ?? "vegetable"];
  };

  const decreaseQuantity = () => {
    // Ensure currentQuantity is treated as a number
    const currentQuantityNumber = typeof currentQuantity === "number" ? currentQuantity : parseInt(currentQuantity, 10);

    if (currentQuantityNumber > 0) {
      const numericPrice = price ? parseInt(price.replace("Rp", "").replace(".", ""), 10) : 0;
      setCurrentQuantity(currentQuantityNumber - 1);
      setCurrentPrice(currentPrice - numericPrice);
    }

    if (currentQuantityNumber - 1 === 0) {
      setShowDeleteButton(true);
      animateLeft(-65);
      alert("Item berhasil dihapus.");
    } else {
      setShowDeleteButton(false);
      animateLeft(0);
    }
  };

  const increaseQuantity = () => {
    // Ensure currentQuantity is treated as a number
    const currentQuantityNumber = typeof currentQuantity === "number" ? currentQuantity : parseInt(currentQuantity, 10);
    const numericPrice = price ? parseInt(price.replace("Rp", "").replace(".", ""), 10) : 0;
    setCurrentQuantity(currentQuantityNumber + 1);
    setCurrentPrice(currentPrice + numericPrice);

    setShowDeleteButton(false);
    animateLeft(0);
  };

  // useEffect(() => {
  //   if (currentQuantity === 0) {
  //     setShowDeleteButton(true);
  //     animateLeft(-65);
  //   } else {
  //     setShowDeleteButton(true);
  //     animateLeft(0);
  //   }
  // }, [currentQuantity]);

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onDetail}>
      {/* Tombol Hapus */}
      {showDeleteButton && onDelete && (
        <TouchableOpacity onPress={onDelete} className="absolute h-full pl-5  w-24 flex items-center justify-center right-0 bg-[#C40E0E] rounded-tr-[15px] rounded-br-[15px]">
          <View style={{ padding: 10 }}>
            <FontAwesome5 name="trash" size={32} color="white" />
          </View>
        </TouchableOpacity>
      )}

      {/* Animated View for Cart */}
      <Animated.View
        style={{
          transform: [{ translateX: slideLeftAnim }],
          backgroundColor: getCardBackgroundColor(),
        }}
        className="px-4 py-3 w-full h-44 rounded-2xl shadow-md flex-row items-center justify-between"
      >
        {/* Gambar Produk */}
        <View className="w-40 h-full flex-row items-center  justify-center bg-purple-400 rounded-lg">
          <View
            className={`w-40 h-full absolute rounded-lg ${bgImageStyle} `}
            style={{
              backgroundColor: getBgImageColor(),
            }}
          />
          <Image source={image} className={`w-24 h-24 rounded-xl ${imageStyle} `} resizeMode="cover" />
        </View>

        {/* Info Produk */}
        <View className="flex-1">
          <MyText fontSize={16} fontFamily="LexBold" color="white">
            {name}
          </MyText>

          <MyText fontSize={13} fontFamily="LexBold" color="gray" textstyle="mt-1">
            {description}
          </MyText>

          <View className="flex-row items-center mt-1">
            <Ionicons name="star" size={14} color="white" />
            <MyText fontSize={13} fontFamily="LexMedium" color="white" textstyle="ml-1">
              {rating}{" "}
              <MyText fontSize={11} fontFamily="LexBold" color="gray">
                (10K/Penilaian)
              </MyText>
            </MyText>
          </View>

          <View className="flex-row items-center mt-1">
            <MyText fontSize={15} fontFamily="LexBlack" color="white">
              Rp{currentPrice.toLocaleString()}
            </MyText>
            <MyText fontSize={12} fontFamily="LexSemiBold" color="gray" textstyle="ml-1">
              x{currentQuantity}
            </MyText>
          </View>
        </View>

        {/* Tombol Tambah & Kurang */}
        <View className="items-center p-2 border-white border rounded-lg">
          <TouchableOpacity onPress={increaseQuantity} className="w-[32px] h-[32px] rounded-md  items-center justify-center">
            <FontAwesome5 name="plus" size={24} color="white" solid />
          </TouchableOpacity>

          <MyText fontSize={16} fontFamily="LexBold" color="white" textstyle="my-1">
            {currentQuantity}
          </MyText>

          <TouchableOpacity onPress={decreaseQuantity} className="w-[32px] h-[32px] rounded-md  items-center justify-center">
            <FontAwesome5 name="minus" size={24} color="white" solid />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default CartDetails;
