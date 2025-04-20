import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "expo-router";
import { View, Animated, useColorScheme } from "react-native";

// COMPONENTS
import MyButtonBack from "@/components/buttonBack";
import MyText from "@/components/text";
import MyButton from "@/components/button";
import MyCartDetails from "@/components/cartDetails";

// ICONS
import Ionicons from "@expo/vector-icons/Ionicons";

// HOOKS
import { useCartAnimations } from "@/hooks/Frontend/cartDetailsScreen/useCartAnimation";
import useCart from "@/hooks/Frontend/cartDetailsScreen/useCart";

function cartleDetailScreen() {
  const router = useRouter();
  const isDarkMode = useColorScheme() === "dark";
  const { cartItems, cartCount, handleDeleteFromCart } = useCart();
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    console.log("Cart items in CartDetailsScreen:", cartItems);
    console.log("Cart count in CartDetailsScreen:", cartCount);
  }, [cartItems, cartCount]);

  const {
    backgroundColor, //
    buttonBackOpacity,
    buttonBackOpacityFirst,
    buttonBackTranslateYFirst,
    textHeaderOpacity,
    textHeaderTranslateY,
    bottomBackgroundColor,
  } = useCartAnimations(scrollY);

  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? "#131514" : "white" }}>
      {/* BUTTON KEMBALI - KEDUA */}
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
            backgroundColor: isDarkMode ? "#131514" : "#00000090",
          }}
        />
      </Animated.View>

      {/* BUTTON KEMBALI - KETIGA */}
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
        <MyButtonBack
          mySize={30}
          customIcon={<Ionicons name="chevron-back" size={24} color={isDarkMode ? "#FFFFFF" : "#000000"} />}
          myActiveOpacity={0.5}
          onPress={() => router.back()}
          myColor="white"
          myClassName="p-2 rounded-full"
          iconStyle={{ color: isDarkMode ? "white" : "black" }}
        />

        <View className="flex-1 justify-center items-center mr-10">
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

      {/* ISI KERANJANG */}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 50, paddingBottom: 80, paddingHorizontal: 20 }}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false,
        })}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 60,
            marginBottom: 30,
          }}
        >
          <MyButtonBack
            customIcon={<Ionicons name="chevron-back" size={24} color={isDarkMode ? "#FFFFFF" : "#000000"} />}
            mySize={30}
            myActiveOpacity={0.5}
            onPress={() => router.push("/(tabs)/home")}
            myColor="black"
            myClassName="p-2"
            style={{ position: "absolute", left: 0 }}
          />

          <MyText fontFamily="LexBold" fontSize={20} textstyle="uppercase">
            KERANJANG
          </MyText>
        </View>

        <View className="w-full gap-6">
          {cartItems.map((item) => (
            <MyCartDetails
              key={item.id} // wajib ada key prop
              id={item.id}
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

      {/* BOTTOM BAR */}
      <Animated.View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 20,
          gap: 30, // Tambahkan gap antara total dan tombol
          backgroundColor: bottomBackgroundColor,
        }}
      >
        {/* TOTAL */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "80%" }}>
          <MyText fontFamily="LexBlack" fontSize={16} textstyle="">
            TOTAL :
          </MyText>
          <MyText fontFamily="LexBlack" fontSize={16} textstyle="">
            100000
          </MyText>
        </View>

        {/* BUTTON Lanjutkan */}
        <Animated.View>
          <MyButton
            title="Lanjutkan" //
            myActiveOpacity={0.7}
            myClassName="px-10 py-2 rounded-lg"
            myTextStyle="text-xl"
            fontFamily="LexBlack"
            myTouchStyle="gap-2"
            buttonColorType="type2"
          />
        </Animated.View>
      </Animated.View>
    </View>
  );
}

export default cartleDetailScreen;
