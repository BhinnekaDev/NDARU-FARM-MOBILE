import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import { View, Image, TouchableOpacity, useColorScheme, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// COMPONENTS
import MyText from "@/components/text";
import MyButton from "@/components/button";
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
  const [currentQuantity, setCurrentQuantity] = useState(quantity || 1);
  const [currentPrice, setCurrentPrice] = useState(price ? parseInt(price.replace("Rp", "").replace(".", "")) : 0);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  // Animated values
  const slideLeftAnim = useRef(new Animated.Value(0)).current;

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

  // Fungsi untuk mengurangi jumlah produk
  const decreaseQuantity = () => {
    const currentQuantityNumber = typeof currentQuantity === "number" ? currentQuantity : parseInt(currentQuantity, 10);

    if (currentQuantityNumber > 0) {
      const numericPrice = price ? parseInt(price.replace("Rp", "").replace(".", ""), 10) : 0;
      setCurrentQuantity(currentQuantityNumber - 1);
      setCurrentPrice(currentPrice - numericPrice);
    }

    // Jika quantity mencapai 0, tampilkan tombol delete dan animasi pergeseran
    if (currentQuantity === 1) {
      setShowDeleteButton(true);
      Animated.timing(slideLeftAnim, {
        toValue: -100, // Bergeser ke kiri
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  // Fungsi untuk menambah jumlah produk
  const increaseQuantity = () => {
    const currentQuantityNumber = typeof currentQuantity === "number" ? currentQuantity : parseInt(currentQuantity, 10);
    const numericPrice = price ? parseInt(price.replace("Rp", "").replace(".", ""), 10) : 0;
    setCurrentQuantity(currentQuantityNumber + 1);
    setCurrentPrice(currentPrice + numericPrice);

    // Sembunyikan tombol delete saat quantity lebih dari 0 dan animasi kembali ke posisi semula
    setShowDeleteButton(false);
    Animated.timing(slideLeftAnim, {
      toValue: 0, // Kembali ke posisi awal
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (currentQuantity === 0) {
      setShowDeleteButton(true); // Menampilkan tombol delete jika quantity = 0
      Animated.timing(slideLeftAnim, {
        toValue: -100, // Bergeser ke kiri
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setShowDeleteButton(false); // Menyembunyikan tombol delete jika quantity > 0
      Animated.timing(slideLeftAnim, {
        toValue: 0, // Kembali ke posisi awal
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [currentQuantity]);

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onDetail}>
      {/* Tombol Hapus */}
      {showDeleteButton && onDelete && (
        <View className="absolute h-full  w-16 flex items-center justify-center right-0 bg-purple-400">
          <TouchableOpacity onPress={onDelete} style={{ padding: 10 }}>
            <Ionicons name="trash-outline" size={32} color="white" />
          </TouchableOpacity>
        </View>
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
          <MyText fontSize={16} fontFamily="LexBlack" color="white">
            {name}
          </MyText>

          <MyText fontSize={13} fontFamily="LexMedium" color="gray" textstyle="mt-1">
            {description}
          </MyText>

          <View className="flex-row items-center mt-1">
            <Ionicons name="star" size={14} color="white" />
            <MyText fontSize={13} fontFamily="LexMedium" color="white" textstyle="ml-1">
              {rating}{" "}
              <MyText fontSize={11} fontFamily="LexLight" color="gray">
                (10K/Penilaian)
              </MyText>
            </MyText>
          </View>

          <View className="flex-row items-center mt-1">
            <MyText fontSize={15} fontFamily="LexBlack" color="white">
              Rp{currentPrice.toLocaleString()}
            </MyText>
            <MyText fontSize={12} fontFamily="LexLight" color="gray" textstyle="ml-1">
              x{currentQuantity}
            </MyText>
          </View>
        </View>

        {/* Tombol Tambah & Kurang */}
        <View className="items-center">
          <TouchableOpacity onPress={increaseQuantity} className="w-[32px] h-[32px] rounded-md bg-white items-center justify-center">
            <Ionicons name="add" size={20} color="black" />
          </TouchableOpacity>

          <MyText fontSize={16} fontFamily="LexBold" color="white" textstyle="my-1">
            {currentQuantity}
          </MyText>

          <TouchableOpacity onPress={decreaseQuantity} className="w-[32px] h-[32px] rounded-md bg-white items-center justify-center">
            <Ionicons name="remove" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default CartDetails;
