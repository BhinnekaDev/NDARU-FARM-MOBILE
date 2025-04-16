import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { View, Image, TouchableOpacity, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// COMPONENTS
import MyText from "@/components/text";
import MyButton from "@/components/button";
// INTERFACES
import { MyCardProps } from "@/interfaces/cardProps";

const CartDetails = ({ image, bgImageStyle, imageStyle, name, description, price, quantity, date, detailType, rating, id, onPress, buttonType = "default", isDisabled, onDelete }: MyCardProps) => {
  const router = useRouter();
  const [currentQuantity, setCurrentQuantity] = useState(quantity || 1);
  const [currentPrice, setCurrentPrice] = useState(price ? parseInt(price.replace("Rp", "").replace(".", "")) : 0);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

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

    // Jika quantity mencapai 0, tampilkan tombol delete tanpa animasi
    if (currentQuantity === 1) {
      setShowDeleteButton(true);
    }
  };

  // Fungsi untuk menambah jumlah produk
  const increaseQuantity = () => {
    const currentQuantityNumber = typeof currentQuantity === "number" ? currentQuantity : parseInt(currentQuantity, 10);
    const numericPrice = price ? parseInt(price.replace("Rp", "").replace(".", ""), 10) : 0;
    setCurrentQuantity(currentQuantityNumber + 1);
    setCurrentPrice(currentPrice + numericPrice);

    // Sembunyikan tombol delete saat quantity lebih dari 0
    setShowDeleteButton(false);
  };

  useEffect(() => {
    if (currentQuantity === 0) {
      setShowDeleteButton(true); // Menampilkan tombol delete jika quantity = 0
    } else {
      setShowDeleteButton(false); // Menyembunyikan tombol delete jika quantity > 0
    }
  }, [currentQuantity]);

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onDetail}>
      <View className="p-4 w-full rounded-3xl shadow-md" style={{ backgroundColor: getCardBackgroundColor() }}>
        {/* Tombol Hapus */}
        {showDeleteButton && onDelete && (
          <View
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: "black",
              padding: 10,
              borderRadius: 25,
              zIndex: 1,
            }}
          >
            <TouchableOpacity onPress={onDelete} style={{ padding: 10 }}>
              <Ionicons name="trash-outline" size={44} color="white" />
            </TouchableOpacity>
          </View>
        )}

        <View className="flex-row items-center">
          {/* Gambar Produk */}
          <View className="w-2/5 flex-row items-center h-full justify-center">
            <View
              className={`w-[95px] h-[95px] absolute rounded-lg ${bgImageStyle} `}
              style={{
                backgroundColor: getBgImageColor(),
              }}
            />
            <Image source={image} className={`w-24 h-24 rounded-xl ${imageStyle} `} resizeMode="cover" />
          </View>

          <View className="flex-1 h-full">
            {/* Teks Nama Produk */}
            <MyText fontSize={26} fontFamily="LexBlack" color="white">
              {name.length > 11 ? `${name.slice(0, 11)}...` : name}
            </MyText>

            {/* Teks Deskripsi Produk */}
            <MyText fontSize={15} fontFamily="LexMedium" color="white" textstyle="ml-4">
              {description.length > 17 ? description.slice(0, 17) + " ..." : description}
            </MyText>
            <MyText fontSize={15} fontFamily="LexMedium" color="white" textstyle="ml-4">
              {rating}
            </MyText>
            {/* Teks Harga atau Tanggal Produk */}
            {price ? (
              <View className="flex-row justify-center items-center my-5">
                <MyText fontSize={20} fontFamily="LexBlack" color="white">
                  {`Rp${currentPrice.toLocaleString()}`}
                </MyText>
                <MyText fontSize={15} fontFamily="LexLight" color="white">
                  /{currentQuantity}
                </MyText>
              </View>
            ) : date ? (
              <MyText fontSize={20} fontFamily="LexBlack" color="white" textstyle="text-center my-5">
                {date}
              </MyText>
            ) : null}

            {/* Tombol Kurang, Quantity, dan Tambah */}
            <View className="flex-row items-center justify-between mt-4">
              <TouchableOpacity onPress={decreaseQuantity} className="px-4 py-2 bg-gray-300 rounded-lg">
                <Ionicons name="remove" size={24} color="black" />
              </TouchableOpacity>
              <MyText fontSize={18} fontFamily="LexMedium" color="white" textstyle="mx-4">
                {currentQuantity}
              </MyText>
              <TouchableOpacity onPress={increaseQuantity} className="px-4 py-2 bg-gray-300 rounded-lg">
                <Ionicons name="add" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CartDetails;
