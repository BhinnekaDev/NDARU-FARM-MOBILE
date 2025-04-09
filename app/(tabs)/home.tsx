import React from "react";
import {
  useColorScheme,
  View,
  Animated,
  TouchableOpacity,
  Text,
} from "react-native";
// COMPONENTS
import MyText from "@/components/text";
import MySearch from "@/components/search";
import MyButtonCategory from "@/components/buttonCategory";
import MyCard from "@/components/card";
// HOOKSFE
import useHomeInterpolate from "@/hooks/Frontend/homeScreen/useHomeInterpolate";
import useProducts from "@/hooks/Frontend/homeScreen/useProducts";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Home() {
  const colorScheme = useColorScheme() ?? "light";
  const textColor = colorScheme === "dark" ? "#FFFFFF" : "#000000";
  const jumlahItemDiKeranjang = 1;
  const { selectedCategory, setSelectedCategory, filteredProducts } =
    useProducts();

  const {
    scrollY,
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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colorScheme === "dark" ? "#131514" : "white",
      }}
    >
      {/* Header Fixed Konten */}
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

          {/* Header Fixed Tombol Keranjang dan Cari */}
          <Animated.View
            style={{ opacity: headerSearchOpacity }}
            className="flex-row gap-6"
          >
            {/* Cart dengan badge */}
            <TouchableOpacity activeOpacity={0.3}>
              <View className="relative">
                {/* Icon Keranjang */}
                <Ionicons name="cart-outline" size={28} color={textColor} />

                {/* Badge */}
                {jumlahItemDiKeranjang > 0 && (
                  <View
                    className="absolute -top-1.5 -right-1.5 bg-red-500 rounded-full items-center justify-center"
                    style={{
                      minWidth: 16,
                      height: 16,
                      paddingHorizontal: 3,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 10,
                        fontWeight: "bold",
                      }}
                    >
                      {jumlahItemDiKeranjang}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>

            {/* Search icon */}
            <TouchableOpacity
              activeOpacity={0.3}
              onPress={() => router.push("/screens/searchScreen")}
            >
              <Ionicons name="search-outline" size={28} color={textColor} />
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Header Fixed Tombol Kategori */}
        <Animated.View
          style={{ opacity: headerCategoryOpacity, paddingVertical: 10 }}
        >
          <MyButtonCategory
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </Animated.View>
      </Animated.View>

      {/* Floating Button Keranjang */}
      <Animated.View
        style={{
          position: "absolute",
          bottom: 35,
          right: 35,
          zIndex: 10,
          opacity: floatingButtonCartOpacity,
        }}
      >
        <TouchableOpacity activeOpacity={0.4}>
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
            {/* Icon dengan badge */}
            <Animated.View
              style={{ transform: [{ translateX: translateXIconCart }] }}
            >
              <View style={{ position: "relative" }}>
                <Ionicons name="cart-outline" size={30} color="white" />

                {jumlahItemDiKeranjang > 0 && (
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
                      {jumlahItemDiKeranjang}
                    </Text>
                  </View>
                )}
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
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        {/* Header Teks */}
        <View className="mb-5 flex-col justify-start w-full">
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
          <MyButtonCategory
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
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
            />
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
}
