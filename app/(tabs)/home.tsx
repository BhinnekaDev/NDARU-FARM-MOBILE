import React, { useState } from "react";
import { useColorScheme, View, Animated } from "react-native";
// COMPONENTS
import MyText from "@/components/text";
import MySearch from "@/components/search";
import MyButtonCategory from "@/components/buttonCategory";
import MyCard from "@/components/card";
// HOOKS
import useHomeInterpolate from "@/hooks/Frontend/homeScreen/useHomeInterpolate";

export default function Home() {
  const colorScheme = useColorScheme() ?? "light";
  const [selectedCategory, setSelectedCategory] = useState("Semua");

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
  } = useHomeInterpolate(colorScheme);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colorScheme === "dark" ? "black" : "white",
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
              color: "white",
              opacity: headerTextOpacity,
            }}
          >
            Ndaru Farm
          </Animated.Text>

          {/* Header Fixed Tombol Cari */}
          <Animated.View
            style={{ flex: 1, marginLeft: 10, opacity: headerSearchOpacity }}
          >
            <MySearch />
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
              color: "white",
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

        {/* Body Konten */}
        <View className="w-full gap-8">
          {/* Card Sayuran */}
          <MyCard
            image={require("@/assets/images/lettuce.png")}
            imageStyle="w-36 h-36"
            name="Selada"
            description="Lorem ipsum dolor sit amet."
            price="Rp5.000"
            quantity="1KG"
            detailType="vegetable"
          />

          {/* Card Berita */}
          <MyCard
            image={require("@/assets/images/news.png")}
            name="Viral Selada adalah sayuran yang"
            description="Lorem ipsum dolor sit amet."
            date="12 Februari 2024"
          />

          {/* Card Sarana Pertanian */}
          <MyCard
            image={require("@/assets/images/sarana.png")}
            name="Fungisida Tebukonazol"
            description="Produk ini merupakan gabungan dari fungisida methoxyacrylate trifloxystrobin dan fungisida triazole tebuconazole."
            price="Rp75.000"
            quantity="1PCS"
          />
        </View>
      </Animated.ScrollView>
    </View>
  );
}
