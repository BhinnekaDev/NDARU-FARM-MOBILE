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

function orderTrackingTabs() {
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
          {/* JUDUL PESANAN - PERTAMA*/}
          <MyText fontFamily="LexBold" fontSize={20} textstyle="uppercase">
            PESANAN
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
              showQuantityControl={false}
            />
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
}

export default orderTrackingTabs;
