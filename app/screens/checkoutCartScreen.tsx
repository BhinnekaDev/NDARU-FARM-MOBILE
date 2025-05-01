import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "expo-router";
import { View, Animated, useColorScheme, ScrollView, Text, TouchableOpacity, TextInput } from "react-native";

// OUR ICONS
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome5 } from "@expo/vector-icons";

// OUR COMPONENTS
import MyButtonBack from "@/components/buttonBack";
import MyText from "@/components/text";
import MyCartDetails from "@/components/cartDetails";
import MyButton from "@/components/button";
import MyInput from "@/components/input";
import MyButtonAdd from "@/components/ButtonCustomProfile";

// OUR HOOKS
import { useCartAnimations } from "@/hooks/Frontend/cartDetailsScreen/useCartAnimation";
import useCart from "@/hooks/Frontend/cartDetailsScreen/useCart";

// OUR UTILS
import { numberFormatter } from "@/utils/validationNumberFormatter";

function checkoutCartScreen() {
  const router = useRouter();
  const isDarkMode = useColorScheme() === "dark";
  const { cartItems, handleDeleteFromCart } = useCart();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [kodePromo, setKodePromo] = useState("");

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
          mySize={30} //
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
              Pembayaran
            </MyText>
          </Animated.View>
        </View>
      </Animated.View>

      {/* ISI PEMBAYARAN */}
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
            marginTop: 40,
            marginBottom: 30,
          }}
        >
          {/* BUTTON KEMBALI - PERTAMA*/}
          <MyButtonBack
            mySize={30} //
            myActiveOpacity={0.5}
            onPress={() => router.push("/(tabs)/home")}
            myColor="black"
            myClassName="p-2"
            style={{ position: "absolute", left: 0 }}
            iconStyle={{ color: isDarkMode ? "white" : "black" }}
          />

          <MyText fontFamily="LexBold" fontSize={20}>
            Pembayaran
          </MyText>
        </View>

        {/* PEMBUNGKUS UBAH ALAMAT */}
        <Animated.View className="px-2">
          <View
            style={{ borderColor: isDarkMode ? "#333836" : "#159778" }} //
            className="w-full flex-row items-center justify-between border-2  rounded-xl p-3 gap-2"
          >
            {/* ICON RUMAH DAN TEXT*/}
            <View className="flex-row items-center gap-3">
              <View style={{ backgroundColor: isDarkMode ? "#333836" : "#159778" }} className=" p-3 rounded-md">
                <Ionicons name="home-outline" size={24} color="white" />
              </View>
              <View>
                <MyText fontSize={20}>Rumah</MyText>
                <MyText textstyle="opacity-50">Jalan Batujajar...</MyText>
              </View>
            </View>

            {/* TOMBOL UBAH */}
            <MyButton
              title="Ubah" //
              fontFamily="LexBold"
              myClassName="rounded-md w-44"
              myTextStyle="text-white text-xl"
              myTouchStyle={` px-4 py-3  ${isDarkMode ? "#333836" : "#159778"} `}
              onPress={() => alert("halo")}
            />
          </View>
        </Animated.View>

        {/* ISI DI PILIH UNTUK PEMBAYARAN - MODE SCROLL */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false} //
          contentContainerStyle={{ justifyContent: "center", alignItems: "center", flexGrow: 1 }}
        >
          <View className="items-center py-3 ">
            {cartItems.length === 0 ? (
              <View className="rounded-2xl h-44 shadow-md items-center justify-center">
                <MyText>There's no cart</MyText>
              </View>
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: "center" }}>
                <View className="flex-row gap-3 py-3">
                  {cartItems.map((item) => (
                    <View key={item.id} style={{ width: 370 }}>
                      <MyCartDetails
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
                    </View>
                  ))}
                </View>
              </ScrollView>
            )}
          </View>
        </ScrollView>

        {/* PEMBUNGKUS SEMUA PEMBAYARAN DAN PENGIRIMAN DAN KODE PROMO */}
        <View className="w-full rounded-2xl p-4">
          {/* PEMBUNGKUS PILIH METODE PEMBAYARAN */}
          <View className="mb-6 gap-4">
            <MyText fontSize={20}>Pilih Metode Pembayaran</MyText>
            <View className="flex-row items-center">
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row gap-2">
                  {[1, 2, 3, 4].map((_, i) => (
                    <MyButton
                      key={i}
                      title="LOGO BANK" //
                      fontFamily="LexBold"
                      myClassName="rounded-md w-24 h-14 p-2 justify-center items-center"
                      myTextStyle="text-white text-[10px]"
                      myTouchStyle={` ${isDarkMode ? "#333836" : "#159778"} `}
                      onPress={() => alert("halo")}
                    />
                  ))}
                </View>
              </ScrollView>
              <MyButtonAdd classNameContainer="ml-2 p-2 rounded-full" onPress={() => router.push("/screens/editPaymentMethod")}>
                <FontAwesome5 name="plus" size={24} color={`${isDarkMode ? "white" : "black"}`} />
              </MyButtonAdd>
            </View>
          </View>

          {/* PEMBUNGKUS PILIH METODE PENGIRIMAN */}
          <View className="mb-6 gap-4">
            <MyText fontSize={20}>Pilih Metode Pengiriman</MyText>
            <View className="flex-row items-center">
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row gap-2">
                  {[1, 2, 3, 4].map((_, i) => (
                    <MyButton
                      key={i}
                      title="Keterangan" //
                      fontFamily="LexBold"
                      myClassName="rounded-md w-24 h-14 p-2 justify-center items-center"
                      myTextStyle="text-white text-[10px]"
                      myTouchStyle={` ${isDarkMode ? "#333836" : "#159778"} `}
                      onPress={() => alert("halo")}
                    />
                  ))}
                </View>
              </ScrollView>
              <MyButtonAdd classNameContainer="ml-2 p-2 rounded-full" onPress={() => router.push("/screens/editSalesMethod")}>
                <FontAwesome5 name="plus" size={24} color={`${isDarkMode ? "white" : "black"}`} />
              </MyButtonAdd>
            </View>
          </View>

          {/* PEMBUNGKUS KODE PROMO*/}
          <View
            style={{ borderColor: isDarkMode ? "#333836" : "#159778" }} //
            className="flex-row items-center border rounded-xl px-2 py-2"
          >
            {/* INPUT KODE PROMO */}
            <View className="flex-1">
              <MyInput
                placeholder="Kode Promo" //
                placeholderFont="LexBold"
                inputFontSize={20}
                withBorder={false}
                myClassName="text-[20px] opacity-50"
                value={kodePromo}
                onChangeText={(input) => setKodePromo(numberFormatter(input, 6))}
              />
            </View>

            {/* BUTTON TERAPKAN */}
            <MyButton
              title="Terapkan" //
              fontFamily="LexBold"
              myClassName="rounded-md w-44"
              myTextStyle="text-white text-[20px]"
              myTouchStyle={` px-4 py-3  ${isDarkMode ? "#333836" : "#159778"} `}
              onPress={() => alert(`KODE PROMO ${kodePromo}`)}
            />
          </View>
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
          paddingVertical: 40,
          gap: 10,
          backgroundColor: bottomBackgroundColor,
        }}
      >
        {/* BIAYA PENGIRIMAN */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "90%" }}>
          <MyText fontFamily="LexBlack" fontSize={22}>
            Biaya Pengiriman
          </MyText>
          <MyText fontFamily="LexBlack" fontSize={22}>
            Gratis
          </MyText>
        </View>

        {/* TOTAL */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "90%" }}>
          <MyText fontFamily="LexBlack" fontSize={22}>
            TOTAL :
          </MyText>
          <MyText fontFamily="LexBlack" fontSize={22}>
            100000
          </MyText>
        </View>

        {/* BUTTON LANJUTKAN */}
        <Animated.View style={{ width: "90%" }}>
          <MyButton
            title="Bayar Sekarang" //
            fontFamily="LexBlack"
            myActiveOpacity={1}
            myClassName="px-10 py-3 rounded-lg "
            myTextStyle="text-xl"
            onPress={() => null}
          />
        </Animated.View>
      </Animated.View>
    </View>
  );
}

export default checkoutCartScreen;
