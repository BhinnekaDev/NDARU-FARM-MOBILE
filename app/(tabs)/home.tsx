import React, { useState, useCallback } from "react";
import { View, Animated, Text, RefreshControl, useColorScheme, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

// COMPONENTS
import MyText from "@/components/text";
import MySearch from "@/components/search";
import MyButtonCategory from "@/components/buttonCategory";
import MyCard from "@/components/card";
// HOOKS
import useHomeInterpolate from "@/hooks/Frontend/homeScreen/useHomeInterpolate";
import useProducts from "@/hooks/Frontend/homeScreen/useProducts";
import { Ionicons } from "@expo/vector-icons";
import MyCart from "@/components/button";
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
    floatingButtonCartOpacity,
    translateXIconCart,
    buttonCartWidth,
    isTextVisible,
    textCartOpacity,
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
      {/* HEADER KONTEN TETAP */}
      <Animated.View
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
        <View className="flex-row items-center justify-between">
          {/* JUDUL "NDARU FARM" - SETELAH SCROLL */}
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

          {/* PEMBUNGKUS BUTTON KERANJANG + PENCARIAN - SETELAH SCROLL */}
          <Animated.View style={{ opacity: headerSearchOpacity }} className="flex-row items-center gap-6">
            {/* Button Keranjang */}
            <View style={{ position: "relative", justifyContent: "center", alignItems: "center" }}>
              <MyCart
                buttonType="icon"
                icon="cart-outline"
                iconLibrary="Ionicons"
                iconSize={28}
                iconColor={colorScheme === "dark" ? "white" : "black"}
                iconPosition="left"
                fontFamily="LexSemiBold"
                myButtonColor="transparent"
                myClassName="w-12 h-12 rounded-full bg-[#131514] flex justify-center items-center pl-2"
                onPress={() => router.push("/screens/cartDetailsScreen")}
              />
              <View
                style={{
                  position: "absolute",
                  top: -4,
                  right: -4,
                  backgroundColor: "red",
                  borderRadius: 999,
                  width: 18,
                  height: 18,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 11, fontFamily: "LexMedium" }}>{cartCount}</Text>
              </View>
            </View>

            {/* ICON PENCARIAN */}
            <TouchableOpacity activeOpacity={0.3} onPress={() => router.push("/screens/searchScreen")}>
              <Ionicons name="search-outline" size={28} color={textColor} />
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* TOMBOL - TOMBOL KATEGORI - SETELAH SCROLL */}
        <Animated.View style={{ opacity: headerCategoryOpacity, paddingVertical: 10 }}>
          <MyButtonCategory selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
        </Animated.View>
      </Animated.View>

      {/* PEMBUNGKUS BUTTON KERANJANG BAGIAN BAWAH  */}
      <Animated.View
        style={{
          position: "absolute",
          bottom: 35,
          right: 35,
          zIndex: 10,
          opacity: floatingButtonCartOpacity,
        }}
      >
        <TouchableOpacity activeOpacity={0.4} onPress={() => router.push("/screens/cartDetailsScreen")}>
          <Animated.View
            style={{
              backgroundColor: "#18b48f",
              paddingVertical: 12,
              borderRadius: 50,
              flexDirection: "row",
              alignItems: "center",
              width: buttonCartWidth,
              overflow: "hidden",
              paddingHorizontal: 13,
              gap: 10,
            }}
          >
            {/* ICON BUTTON KERANJANG BAGIAN BAWAH */}
            <Animated.View style={{ transform: [{ translateX: translateXIconCart }] }}>
              <View style={{ position: "relative" }}>
                <Ionicons name="cart-outline" size={30} color="white" />

                <View
                  style={{
                    position: "absolute",
                    top: -6,
                    right: -6,
                    backgroundColor: "red",
                    borderRadius: 10,
                    minWidth: 18,
                    height: 18,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: 4,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 10,
                      fontWeight: "bold",
                    }}
                  >
                    {cartCount}
                  </Text>
                </View>
              </View>
            </Animated.View>
            {/* Teks */}
            {isTextVisible && (
              <Animated.Text
                style={{
                  opacity: textCartOpacity,
                  color: "white",
                  fontFamily: "LexBold",
                }}
              >
                Keranjang
              </Animated.Text>
            )}
          </Animated.View>
        </TouchableOpacity>
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
            refreshing={refreshing} //
            onRefresh={onRefresh}
            progressViewOffset={150}
            colors={["#9Bd35A", "#689F38"]}
          />
        }
      >
        {/* PEMBUNGKUS JUDUL */}
        <View className="mb-5 flex-col justify-start w-full ">
          <View className="flex-row justify-between items-center">
            {/* JUDUL "NDARU FARM" */}
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
          </View>

          {/* JUDUL TEKS DEKSRIPSI */}
          <Animated.View style={{ opacity: textDecsOpacity }}>
            <MyText fontSize={18} textstyle="uppercase">
              Pertanian sehat dan bersih
            </MyText>
          </Animated.View>
        </View>

        {/* TOMBOL PENCARIAN AWAL*/}
        <Animated.View
          style={{
            transform: [{ scale: searchScale }],
            opacity: searchOpacity,
          }}
        >
          <MySearch />
        </Animated.View>

        {/* TOMBOL - TOMBOL KATEGORI - SEBELUM SCROLL*/}
        <Animated.View className="py-6" style={{ opacity: CategoryOpacity }}>
          <MyButtonCategory selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
        </Animated.View>

        {/* PEMBUNGKUS SELURUH ISI CART*/}
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
