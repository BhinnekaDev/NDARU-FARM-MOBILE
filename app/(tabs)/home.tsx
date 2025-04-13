import React from "react";
import { useColorScheme, View, Animated, Text } from "react-native";

// COMPONENTS
import MyText from "@/components/text";
import MySearch from "@/components/search";
import MyButtonCategory from "@/components/buttonCategory";
import MyCard from "@/components/card";
import MyCart from "@/components/button";

// HOOKS
import useHomeInterpolate from "@/hooks/Frontend/homeScreen/useHomeInterpolate";
import useProducts from "@/hooks/Frontend/homeScreen/useProducts";

export default function Home() {
  const colorScheme = useColorScheme() ?? "light";
  const textColor = colorScheme === "dark" ? "#FFFFFF" : "#000000";

  const { selectedCategory, setSelectedCategory, filteredProducts } = useProducts();

  const { scrollY, fontSizeAnim, textDecsOpacity, textOpacity, searchOpacity, searchScale, headerBackgroundColor, headerBorderWidth, headerTextOpacity, headerSearchOpacity, headerCategoryOpacity, CategoryOpacity } =
    useHomeInterpolate(colorScheme);

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
        {/* Baris Ndaru Farm + Keranjang */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Teks NDARU FARM */}
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
              iconColor="white"
              iconPosition="left"
              fontFamily="LexSemiBold"
              myButtonColor="transparent"
              myClassName="w-14 h-14 rounded-full bg-[#131514] flex justify-center items-center pl-2"
              onPress={() => alert("Keranjang")}
            />
            <View style={{ position: "absolute", top: -5, right: -5, backgroundColor: "red", borderRadius: 999, width: 20, height: 20, justifyContent: "center", alignItems: "center" }}>
              <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>1</Text>
            </View>
          </Animated.View>
        </View>

        {/* Input Cari */}
        <Animated.View
          style={{
            flex: 1,
            marginTop: 10,
            opacity: headerSearchOpacity,
          }}
        >
          <MySearch />
        </Animated.View>

        {/* Tombol Kategori */}
        <Animated.View
          style={{
            opacity: headerCategoryOpacity,
            paddingVertical: 10,
          }}
        >
          <MyButtonCategory selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
        </Animated.View>
      </Animated.View>

      {/* ScrollView */}
      <Animated.ScrollView
        contentContainerStyle={{
          paddingTop: 100,
          paddingBottom: 80,
          paddingHorizontal: 25,
        }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false,
        })}
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
                buttonType="icon" //
                icon="cart-outline"
                iconLibrary="Ionicons"
                iconSize={35}
                iconColor="white"
                iconPosition="left"
                fontFamily="LexSemiBold"
                myButtonColor="transparent"
                myClassName="w-14 h-14 rounded-full bg-[#131514] flex justify-center items-center pl-2"
                onPress={() => alert("Keranjang")}
              />
              <View style={{ position: "absolute", top: -5, right: -5, backgroundColor: "red", borderRadius: 999, width: 20, height: 20, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>1</Text>
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
            />
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
}
