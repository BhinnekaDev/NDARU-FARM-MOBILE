import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "expo-router";
import { View, Image, useColorScheme, Animated, PanResponder } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
// OUR COMPONENTS
import MyText from "@/components/text";
import MyButton from "@/components/ButtonCustomProfile";

// OUR INTERFACES
import { useCartAnimations } from "@/hooks/Frontend/cartDetailsScreen/useCartAnimation";
import { useQuantity } from "@/hooks/Frontend/cartDetailsScreen/useQuantity";
import { MyCardProps } from "@/interfaces/cardProps";

// OUR UTILS
import { maxLengthText } from "@/utils/maxLengthText";

const CartDetails = ({
  image, //
  bgImageStyle,
  imageStyle,
  name,
  description,
  price = 0,
  quantity,
  detailType = "vegetable",
  rating,
  id,
  onDelete,
}: MyCardProps) => {
  const router = useRouter();
  const isDarkMode = useColorScheme() === "dark";
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const translateX = useRef(new Animated.Value(0)).current;
  const [showDelete, setShowDelete] = useState(false);
  const { slideLeftAnim, animateLeft } = useCartAnimations();

  const {
    currentQuantity, //
    getTotalPrice,
    increaseQuantityAndUpdateTotal,
    decreaseQuantityAndUpdateTotal,
    totalCartPrice,
  } = useQuantity({
    id: id,
    name: name,
    initialQuantity: quantity,
    price: price,
    onZeroQuantity: () => {
      setShowDeleteButton(true);
      animateLeft(-65);
    },
    onResetDelete: () => {
      setShowDeleteButton(true);
      animateLeft(0);
    },
  });

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 10,
    onPanResponderRelease: (_, gesture) => {
      if (gesture.dx < -65) {
        Animated.timing(translateX, {
          toValue: -65,
          duration: 500,
          useNativeDriver: true,
        }).start(() => setShowDelete(true));
      } else {
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
          bounciness: 20,
        }).start(() => setShowDelete(true));
      }
    },
  });

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

  return (
    <View>
      {/* PEMBUNGKUS MEMUNCULKAN DELETE */}
      {(showDelete || showDeleteButton) && onDelete && (
        <MyButton
          onPress={onDelete} //
          classNameContainer="absolute h-full pl-5 w-24 flex items-center justify-center right-0 bg-[#C40E0E] rounded-tr-[15px] rounded-br-[15px]"
        >
          <View style={{ padding: 10 }}>
            <FontAwesome5 name="trash" size={32} color="white" />
          </View>
        </MyButton>
      )}
      <MyText fontSize={18} fontFamily="LexBold" color="white" textstyle="mt-5 text-right pr-4">
        Total Harga: Rp{totalCartPrice.toLocaleString()}
      </MyText>
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          transform: [{ translateX }, { translateX: slideLeftAnim }],
          backgroundColor: isDarkMode ? "#333836" : "#159778",
        }}
        className="px-4 py-3 w-full h-44 rounded-2xl shadow-md flex-row items-center  justify-between"
      >
        {/* PEMBUNGKUS GAMBAR */}
        <View className="w-40 h-full flex-row items-center justify-center rounded-lg">
          <View className={`w-40 h-full absolute rounded-lg ${bgImageStyle}`} />

          <MyButton onPress={onDetail}>
            {/* GAMBAR + OVERLAY */}
            <View className="w-full h-full rounded-xl overflow-hidden relative">
              <Image source={image} className={`w-full h-full rounded-xl ${imageStyle}`} resizeMode="cover" />

              {/* OVERLAY TULISAN DETAILS DI TENGAH */}
              <View className="absolute inset-0 items-center justify-center flex ">
                <MyText fontSize={14} fontFamily="LexBold" color="white">
                  Details
                </MyText>
              </View>
            </View>
          </MyButton>
        </View>

        {/* PEMBUNGKUS INFORMASI KERANJANG */}
        <View className="flex-1  px-2 ">
          <MyText fontSize={20} fontFamily="LexBold" color="white">
            {maxLengthText(name, 7)}
          </MyText>

          <MyText fontSize={14} fontFamily="LexBold" color="white" textstyle="mt-1 opacity-50">
            {maxLengthText(description, 12)}
          </MyText>

          <View className="flex-row items-center mt-1">
            <Ionicons name="star" size={16} color="white" />
            <MyText fontSize={20} fontFamily="LexMedium" color="white" textstyle="ml-1">
              {rating}
              <MyText fontSize={11} fontFamily="LexBold" color="white" textstyle="opacity-50">
                {" "}
                (10K/Penilaian)
              </MyText>
            </MyText>
          </View>

          <View className="flex-row items-center mt-1">
            <MyText fontSize={22} fontFamily="LexBlack" color="white">
              Rp{getTotalPrice().toLocaleString()}
            </MyText>
            <MyText fontSize={12} fontFamily="LexSemiBold" color="white" textstyle="ml-1 opacity-50">
              x{currentQuantity}
            </MyText>
          </View>
        </View>

        {/* PEMBUNGKUS KUANTITAS */}
        <View className="items-center p-2 border-white border rounded-lg">
          <MyButton
            onPress={increaseQuantityAndUpdateTotal} //
            classNameContainer="w-[32px] h-[32px] rounded-md items-center justify-center"
          >
            <FontAwesome5 name="plus" size={24} color="white" solid />
          </MyButton>

          <MyText fontSize={16} fontFamily="LexBold" color="white" textstyle="my-1">
            {currentQuantity}
          </MyText>

          <MyButton
            onPress={decreaseQuantityAndUpdateTotal} //
            classNameContainer="w-[32px] h-[32px] rounded-md items-center justify-center"
          >
            <FontAwesome5 name="minus" size={24} color="white" solid />
          </MyButton>
        </View>
      </Animated.View>
    </View>
  );
};

export default CartDetails;
