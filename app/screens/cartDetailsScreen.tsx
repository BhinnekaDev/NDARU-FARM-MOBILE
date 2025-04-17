import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "expo-router";
import { View, Text, useColorScheme, Animated, TouchableOpacity, FlatList, Image } from "react-native";
// COMPONENTS
import MyButtonBack from "@/components/buttonBack";
import MyDetailImageProduct from "@/components/detailImageProduct";
import MyText from "@/components/text";
import MyTextProductStats from "@/components/textProductStats";
import MyButtonQuantityProduct from "@/components/buttonQuantityProduct";
import MyButton from "@/components/button";
import MyTextDescription from "@/components/textDescriptionProduct";
import MyTextComment from "@/components/textComment";
import MyCartDetails from "@/components/cartDetails";

// ICONS
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
// HOOKS
import { useCartAnimations } from "@/hooks/Frontend/cartDetailsScreen/useCartAnimation";
import useProducts from "@/hooks/Frontend/homeScreen/useProducts";
import useCart from "@/hooks/Frontend/cartDetailsScreen/useCart";

function cartleDetailScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const textColor = colorScheme === "dark" ? "#FFFFFF80" : "#00000080";
  const textColor2 = colorScheme === "dark" ? "#FFFFFF" : "#000000";
  const floatingBackgroundColor = colorScheme === "dark" ? "#156F32" : "#159778";
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const { selectedCategory, setSelectedCategory, filteredProducts, refreshProducts } = useProducts();
  const { cartItems, cartCount, handleDeleteFromCart } = useCart();
  const basePrice = 5000;
  const totalPrice = basePrice * selectedQuantity;
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    console.log("Cart items in CartDetailsScreen:", cartItems); // Verifikasi cartItems
    console.log("Cart count in CartDetailsScreen:", cartCount); // Verifikasi cartCount
  }, [cartItems, cartCount]);

  const {
    backgroundColor,
    buttonBackOpacity,
    buttonBackOpacityFirst,
    buttonBackTranslateYFirst,
    textHeaderOpacity,
    textHeaderTranslateY,
    textRatingStatsOpacity,
    textRatingStatsTranslateY,
    bottomBarIconRightOpacity,
    buttonWidth,
    translateXIcon,
    textOpacity,
    bottomBackgroundColor,
    bottomBarOpacity,
    bottomBarTranslateY,
    bottomBarIconLeftOpacity,
    bottomButtonBarOpacity,
    isTextVisible,
  } = useCartAnimations(scrollY);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colorScheme === "dark" ? "#131514" : "white",
      }}
    >
      {/* PEMBUNGKUS BUTTON KEMBALI - KEDUA*/}
      <Animated.View
        style={{
          position: "absolute",
          top: 48,
          zIndex: 10,
          left: 15,
          opacity: buttonBackOpacityFirst,
          transform: [{ translateY: buttonBackTranslateYFirst }],
        }}
      >
        <MyButtonBack
          mySize={30}
          myActiveOpacity={0.5}
          onPress={() => router.back()}
          myColor="white"
          myClassName="p-2 rounded-full"
          style={{
            backgroundColor: useColorScheme() === "dark" ? "#131514" : "#00000090",
          }}
        />
      </Animated.View>

      {/* PEMBUNGKUS BUTTON KEMBALI - KETIGA */}
      <Animated.View
        style={{
          position: "absolute",
          top: 30,
          left: 0,
          right: 0,
          zIndex: 10,
          backgroundColor: backgroundColor,
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 5,
          paddingHorizontal: 15,
          opacity: buttonBackOpacity,
        }}
      >
        {/* TOMBOL BUTTON KEMBALI - KETIGA*/}
        <MyButtonBack
          mySize={30}
          customIcon={<Ionicons name="chevron-back" size={24} color={colorScheme === "dark" ? "#FFFFFF" : "#000000"} />}
          myActiveOpacity={0.5}
          onPress={() => router.back()}
          myColor="white"
          myClassName="p-2 rounded-full"
          iconStyle={{
            color: useColorScheme() === "dark" ? "white" : "black",
          }}
        />

        {/* JUDUL KERANJANG - KETIGA*/}
        <View className="flex-1  justify-center items-center  mr-10">
          <Animated.View
            style={{
              opacity: textHeaderOpacity,
              transform: [{ translateY: textHeaderTranslateY }],
            }}
          >
            <MyText fontFamily="LexBold" fontSize={20} textstyle="uppercase text-center">
              KERANJANG
            </MyText>
          </Animated.View>
        </View>
      </Animated.View>

      {/*SCROLL DAN PEMBUNGKUS BUTTON KEMBALI DAN ISI KERANJANG - PERTAMA */}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 50,
          paddingBottom: 80,
          paddingHorizontal: 20,
        }}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
      >
        {/* PEMBUNGKUS TOMBOL KEMBALI - PERTAMA */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 60, // Atur jarak dari atas
            marginBottom: 30,
          }}
        >
          {/* TOMBOL BUTTON KEMBALI - KETIGA*/}
          <MyButtonBack
            customIcon={<Ionicons name="chevron-back" size={24} color={colorScheme === "dark" ? "#FFFFFF" : "#000000"} />}
            mySize={30}
            myActiveOpacity={0.5}
            onPress={() => router.push("/(tabs)/home")}
            myColor="black"
            myClassName="p-2"
            style={{
              position: "absolute",
              left: 0,
            }}
          />

          {/* JUDUL KERANJANG - KETIGA*/}
          <MyText fontFamily="LexBold" fontSize={20} textstyle="uppercase">
            KERANJANG
          </MyText>
        </View>

        {/* Body Card Konten */}
        <View className="w-full gap-8">
          {cartItems.map((item) => (
            <MyCartDetails
              key={item.id} //
              image={item.image}
              name={item.name}
              description={item.description}
              price={item.price}
              rating={item.rating}
              quantity={item.quantity}
              date={item.date}
              detailType={item.detailType}
              onDelete={() => handleDeleteFromCart(item.id ?? "")}
            />
          ))}
        </View>
      </Animated.ScrollView>

      {/* Bottom Bar */}
      <Animated.View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 20,
          gap: 24,
          backgroundColor: bottomBackgroundColor,
          opacity: bottomBarOpacity,
          transform: [{ translateY: bottomBarTranslateY }],
        }}
      >
        {/* Tombol Chat */}
        <Animated.View
          style={{
            opacity: bottomBarIconLeftOpacity,
          }}
        >
          <TouchableOpacity className="border border-white p-2 rounded-lg" activeOpacity={0.4}>
            <Ionicons name="chatbox-ellipses-outline" color={"white"} size={24} />
          </TouchableOpacity>
        </Animated.View>
        {/* Tombol Keranjang */}
        <Animated.View
          style={{
            opacity: bottomButtonBarOpacity,
          }}
        >
          <MyButton
            title="Keranjang"
            myActiveOpacity={0.7}
            myClassName="px-10 py-2 rounded-lg"
            myTextStyle="text-xl"
            buttonType="icon"
            icon="plus"
            iconLibrary="FontAwesome"
            iconSize={14}
            iconPosition="left"
            iconColor="white"
            fontFamily="LexBold"
            myTouchStyle="gap-2"
            buttonColorType="type2"
          />
        </Animated.View>
      </Animated.View>
    </View>
  );
}

export default cartleDetailScreen;
