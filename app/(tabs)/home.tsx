import React, { useState, useCallback } from "react";
import { View, Animated, Text, RefreshControl, ScrollView, ActivityIndicator } from "react-native";
import { useColorScheme } from "react-native";
import { useRouter } from "expo-router";

// COMPONENTS
import MyText from "@/components/text";
import MySearch from "@/components/search";
import MyButtonCategory from "@/components/buttonCategory";
import MyCard from "@/components/card";
import MyCart from "@/components/button";
// HOOKS
import useHomeInterpolate from "@/hooks/Frontend/homeScreen/useHomeInterpolate";
import useProducts from "@/hooks/Frontend/homeScreen/useProducts";
import useCart from "@/hooks/Frontend/cartDetailsScreen/useCart";

export default function Home() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const textColor = colorScheme === "dark" ? "#FFFFFF" : "#000000";

  const { selectedCategory, setSelectedCategory, filteredProducts, refreshProducts } = useProducts();

  const {
    scrollY, //
    fontSizeAnim,
    textDecsOpacity,
    textOpacity,
    searchOpacity,
    searchScale,
    headerBackgroundColor,
    headerBorderWidth,
    headerTextOpacity,
    headerSearchOpacity,
    headerCategoryOpacity,
    CategoryOpacity,
  } = useHomeInterpolate(colorScheme);

  const { cartCount, handleAddToCart, refreshCart, cartItems } = useCart();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await Promise.all([refreshProducts(), refreshCart()]);
      console.log("✅ Refresh berhasil");
    } catch (error) {
      console.error("❌ Error saat refresh:", error);
    } finally {
      setRefreshing(false);
    }
  }, [refreshProducts, refreshCart]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colorScheme === "dark" ? "#131514" : "white",
      }}
    >
      {/* Header Fixed Konten */}
      <Animated.View
        pointerEvents="box-none"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          paddingTop: 50,
          paddingHorizontal: 25,
          backgroundColor: headerBackgroundColor,
          borderBottomWidth: headerBorderWidth,
          borderBottomColor: "rgba(255,255,255,0.7)",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Header Fixed Text */}
          <Animated.Text
            style={{
              fontSize: fontSizeAnim,
              textTransform: "uppercase",
              fontFamily: "LexBold",
              color: textColor,
              opacity: headerTextOpacity,
            }}
          >
            Ndaru Farm
          </Animated.Text>

          {/* Header Fixed Tombol Cari */}
          <Animated.View
            style={{
              flex: 1,
              marginLeft: 10,
              opacity: headerSearchOpacity,
            }}
          >
            <MySearch />
          </Animated.View>
          {/* Button Keranjang */}
          <Animated.View
            style={{
              opacity: headerSearchOpacity,
            }}
          >
            <MyCart
              buttonType="icon" //
              icon="cart-outline"
              iconLibrary="Ionicons"
              iconSize={35}
              iconColor={colorScheme === "dark" ? "white" : "black"}
              iconPosition="left"
              fontFamily="LexSemiBold"
              myButtonColor="transparent"
              myClassName="w-14 h-14 rounded-full bg-[#131514] flex justify-center items-center pl-2"
              onPress={() => router.push("/screens/cartDetailsScreen")}
            />
            <View
              style={{
                position: "absolute", //
                top: -5,
                right: -5,
                backgroundColor: "red",
                borderRadius: 999,
                width: 20,
                height: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 12, fontFamily: "LexMedium" }}>{cartCount}</Text>
            </View>
          </Animated.View>
        </View>

        {/* Header Fixed Tombol Kategori */}
        <Animated.View
          style={{
            opacity: headerCategoryOpacity,
            paddingVertical: 10,
          }}
        >
          <MyButtonCategory selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
        </Animated.View>
      </Animated.View>

      {/* Header Konten */}
      <Animated.ScrollView
        contentContainerStyle={{
          paddingTop: 100,
          paddingBottom: 80,
          paddingHorizontal: 25,
        }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        refreshControl={
          <RefreshControl
            refreshing={refreshing} // Status refreshing
            onRefresh={onRefresh} // Fungsi refresh
            progressViewOffset={150}
            colors={["#9Bd35A", "#689F38"]} // Warna loading spinner
          />
        }
      >
        {/* Header Teks */}
        <View className="mb-5 flex-col justify-start w-full ">
          <View className="flex-row justify-between items-center">
            {/* Teks "Ndaru Farm" */}
            <Animated.Text
              style={{
                fontSize: fontSizeAnim,
                textTransform: "uppercase",
                color: textColor,
                fontFamily: "LexBold",
                opacity: textOpacity,
              }}
            >
              Ndaru Farm
            </Animated.Text>

            {/* Button Keranjang */}
            <Animated.View style={{ opacity: textDecsOpacity }}>
              <MyCart
                buttonType="icon"
                icon="cart-outline"
                iconLibrary="Ionicons"
                iconSize={35}
                iconColor={colorScheme === "dark" ? "white" : "black"}
                iconPosition="left"
                fontFamily="LexSemiBold"
                myButtonColor="transparent"
                myClassName="w-14 h-14 rounded-full bg-[#131514] flex justify-center items-center pl-2"
                onPress={() => router.push("/screens/cartDetailsScreen")}
              />
              <View
                style={{
                  position: "absolute",
                  top: -5,
                  right: -5,
                  backgroundColor: "red",
                  borderRadius: 999,
                  width: 20,
                  height: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 12, fontFamily: "LexMedium" }}>{cartCount}</Text>
              </View>
            </Animated.View>
          </View>

          {/* Header Deskripsi Teks */}
          <Animated.View style={{ opacity: textDecsOpacity }}>
            <MyText fontSize={18} textstyle="uppercase">
              Pertanian sehat dan bersih
            </MyText>
          </Animated.View>
        </View>

        {/* Header Tombol cari */}
        <Animated.View
          style={{
            transform: [{ scale: searchScale }],
            opacity: searchOpacity,
          }}
        >
          <MySearch />
        </Animated.View>

        {/* Header Tombol Kategori */}
        <Animated.View className="py-6" style={{ opacity: CategoryOpacity }}>
          <MyButtonCategory selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
        </Animated.View>

        {/* Body Card Konten */}
        <View className="w-full gap-8">
          {filteredProducts.map((item) => (
            <MyCard
              key={item.id}
              image={item.image}
              name={item.name}
              description={item.description}
              price={item.price}
              quantity={item.quantity}
              detailType={item.detailType}
              buttonType={item.buttonType}
              buttonTitle={item.buttonTitle}
              date={item.date}
              onPress={() => handleAddToCart(item)}
              isDisabled={cartItems.some((cartItem) => cartItem.id === item.id)}
            />
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
}
