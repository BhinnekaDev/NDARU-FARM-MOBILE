import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Image,
  TouchableOpacity,
  useColorScheme,
  Animated,
  Easing,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
// COMPONENTS
import MyText from "@/components/text";
import MyButton from "@/components/button";
// INTERFACES
import { MyCardProps } from "@/interfaces/cardProps";

const MyCard: React.FC<MyCardProps> = ({
  image,
  bgImageStyle,
  imageStyle,
  name,
  description,
  price,
  quantity,
  date,
  detailType,
  id,
  onPress,
  buttonType = "default",
  buttonTitle,
}) => {
  const router = useRouter();
  const [isFavorited, setIsFavorited] = useState(false);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const scaleAnim = useState(new Animated.Value(1))[0];

  const onDetail = () => {
    const routes = {
      vegetable: "/screens/vegetableDetailScreen",
      news: "/screens/newsDetailScreen",
      service: "/screens/servicesDetailScreen",
      facility: "/screens/facilityDetailScreen",
    } as const;

    const path = detailType
      ? routes[detailType as keyof typeof routes]
      : undefined;

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

  const animateHeart = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.5,
        duration: 150,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onDetail}>
      <View
        className="p-4 w-full rounded-3xl shadow-md"
        style={{ backgroundColor: getCardBackgroundColor() }}
      >
        <View className="flex-row items-center">
          {/* Tombol Love Favorite*/}
          {detailType !== "news" && (
            <TouchableOpacity
              onPress={() => {
                setIsFavorited(!isFavorited);
                animateHeart();
              }}
              className="w-10 flex items-center justify-center absolute top-0 bg-white rounded-full p-1.5"
              activeOpacity={0.8}
            >
              <Animated.View
                className=""
                style={{ transform: [{ scale: scaleAnim }] }}
              >
                <Ionicons
                  name={isFavorited ? "heart" : "heart-outline"}
                  size={23}
                  color={isFavorited ? "#FF3B30" : "#888"}
                />
              </Animated.View>
            </TouchableOpacity>
          )}

          {/* Gambar Produk */}
          <View className="w-2/5 flex-row items-center h-full justify-center">
            <View
              className={`w-[95px] h-[95px] absolute rounded-lg ${bgImageStyle} `}
              style={{
                backgroundColor: getBgImageColor(),
                transform: [{ rotate: "-20deg" }],
              }}
            />
            <Image
              source={image}
              className={`w-24 h-24 rounded-xl ${imageStyle} `}
              resizeMode="cover"
            />
          </View>

          <View className="flex-1 h-full">
            {/* Teks Nama Produk */}
            <MyText fontSize={26} fontFamily="LexBlack" color="white">
              {name.length > 11 ? `${name.slice(0, 11)}...` : name}
            </MyText>

            {/* Teks Deskripsi Produk */}
            <MyText
              fontSize={15}
              fontFamily="LexMedium"
              color="white"
              textstyle="ml-4"
            >
              {description.length > 17
                ? description.slice(0, 17) + " ..."
                : description}
            </MyText>
            {/* Teks Harga atau Tanggal Produk */}
            {price ? (
              <View className="flex-row justify-center items-center my-5">
                <MyText fontSize={20} fontFamily="LexBlack" color="white">
                  {price}
                </MyText>
                <MyText fontSize={15} fontFamily="LexLight" color="white">
                  /{quantity}
                </MyText>
              </View>
            ) : date ? (
              <MyText
                fontSize={20}
                fontFamily="LexBlack"
                color="white"
                textstyle="text-center my-5"
              >
                {date}
              </MyText>
            ) : null}

            {/* Tombol Pesan Sekarang */}
            <MyButton
              title={buttonTitle ?? "Pesan Sekarang"}
              buttonType={buttonType}
              icon="cart-outline"
              iconLibrary="Ionicons"
              iconSize={20}
              iconColor="white"
              iconPosition="left"
              fontFamily="LexSemiBold"
              myClassName="rounded-3xl py-1.5"
              myTouchStyle="gap-4"
              myButtonColor={getBgImageColor()}
              onPress={onPress}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MyCard;
