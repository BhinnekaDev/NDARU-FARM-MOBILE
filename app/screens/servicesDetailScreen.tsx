import { useState, useRef } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  useColorScheme,
  Animated,
  TouchableOpacity,
} from "react-native";
// COMPONENTS
import MyButtonBack from "@/components/buttonBack";
import MyDetailImageProduct from "@/components/detailImageProduct";
import MyText from "@/components/text";
import MyTextProductStats from "@/components/textProductStats";
import MyButtonQuantityProduct from "@/components/buttonQuantityProduct";
import MyButton from "@/components/button";
import MyTextDescription from "@/components/textDescriptionProduct";
import MyTextComment from "@/components/textComment";
// ICONS
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
// HOOKS
import { useServicesAnimation } from "@/hooks/Frontend/detailProductScreen/servicesAnimation";

function servicesDetailScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const textColor = colorScheme === "dark" ? "#FFFFFF80" : "#00000080";
  const textColor2 = colorScheme === "dark" ? "#FFFFFF" : "#000000";
  const floatingBackgroundColor =
    colorScheme === "dark" ? "#156F32" : "#159778";
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const basePrice = 275000;
  const totalPrice = basePrice * selectedQuantity;
  const scrollY = useRef(new Animated.Value(0)).current;

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
  } = useServicesAnimation(scrollY);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colorScheme === "dark" ? "#131514" : "white",
      }}
    >
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
            backgroundColor:
              useColorScheme() === "dark" ? "#131514" : "#00000090",
          }}
        />
      </Animated.View>
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
        {/* Fixed Tombol Kembali */}
        <MyButtonBack
          mySize={30}
          myActiveOpacity={0.5}
          onPress={() => router.back()}
          myColor="white"
          myClassName="p-2 rounded-full"
          iconStyle={{ color: useColorScheme() === "dark" ? "white" : "black" }}
        />
        <View
          style={{
            flex: 1,
            marginLeft: 12,
            paddingVertical: 10,
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {/* Fixed Header Bar Teks */}
          <Animated.Text
            style={{
              flex: 1,
              fontFamily: "LexBold",
              fontSize: 20,
              color: textColor2,
              opacity: textHeaderOpacity,
              transform: [{ translateY: textHeaderTranslateY }],
            }}
          >
            Pelatihan Selada
          </Animated.Text>

          {/* Fixed Header Bar Teks Status Produk */}
          <Animated.View
            style={{
              flex: 1,
              opacity: textRatingStatsOpacity,
              transform: [{ translateY: textRatingStatsTranslateY }],
            }}
          >
            <MyTextProductStats
              rating="4.9"
              reviews="2.5K"
              sales="1.5K"
              iconSize={15}
              ratingFontSize={14}
              reviewsFontSize={14}
              salesFontSize={14}
              paddingTop={0}
              paddingBottom={0}
            />
          </Animated.View>
        </View>
      </Animated.View>

      {/* Body Konten Di Scroll */}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 50,
          paddingBottom: 80,
          paddingHorizontal: 20,
        }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        {/* Tombol Kembali ke halaman sebelumnya */}
        <MyButtonBack
          myClassName="absolute top-20 left-5 z-10 p-2"
          mySize={30}
          myActiveOpacity={0.5}
          onPress={() => router.back()}
          myColor="white"
        />

        {/* Detail Gambar Produk */}
        <MyDetailImageProduct productImageType="service" />

        {/* Detail Teks Produk */}
        <MyText fontFamily="LexBlack" fontSize={24} textstyle="uppercase">
          Pelatihan Selada
        </MyText>

        {/* Detail Rating Produk */}
        <MyTextProductStats rating="4.9" reviews="2.5K" sales="1.5K" />

        {/* Detail Harga Produk */}
        <View className="flex-row gap-2">
          {/* Teks Harga */}
          <MyText fontFamily="LexBold" fontSize={20} textstyle="uppercase">
            harga
          </MyText>
          <MyText fontFamily="LexBold" fontSize={20}>
            Rp{totalPrice.toLocaleString("id-ID")}
          </MyText>
        </View>
        {/* Teks Kuantitas */}
        <Text
          style={{
            fontFamily: "LexBold",
            color: textColor,
            fontSize: 16,
            paddingVertical: 5,
          }}
        >
          Paket:
        </Text>

        {/* Tombol Set Kuantitas */}
        <MyButtonQuantityProduct
          selectedQuantity={selectedQuantity}
          onSelectQuantity={setSelectedQuantity}
          quantityType="bulan"
        />

        {/* Tombol Beli Produk */}
        <MyButton
          title="Beli Sekarang"
          myActiveOpacity={0.8}
          myClassName="p-4 rounded-xl my-4"
          myTextStyle="text-xl"
          fontFamily="LexBold"
        />

        {/* Tombol Masukan Ke Keranjang */}
        <MyButton
          title="Masukan Ke Keranjang"
          myActiveOpacity={0.6}
          myTouchStyle="p-4 rounded-md"
          myTextStyle="text-xl"
          myButtonColor="transparent"
          fontFamily="LexBold"
          borderColor="auto"
          borderWidth={2}
          textColor="auto"
        />

        {/* Judul Teks Deskripsi */}
        <Text
          className="pt-4"
          style={{
            fontFamily: "LexBold",
            color: textColor,
            fontSize: 16,
          }}
        >
          Deskripsi:
        </Text>
        {/* Teks Deskripsi */}
        <MyTextDescription />

        {/* Komentar */}
        <MyTextComment showComment={3} />
      </Animated.ScrollView>

      {/* Tombol Kontak Penjual Mengambang */}
      <Animated.View
        style={{
          position: "absolute",
          bottom: 35,
          right: 35,
          zIndex: 10,
          opacity: bottomBarIconRightOpacity,
        }}
      >
        <TouchableOpacity activeOpacity={0.4}>
          <Animated.View
            style={{
              backgroundColor: floatingBackgroundColor,
              paddingVertical: 12,
              borderRadius: 50,
              flexDirection: "row",
              alignItems: "center",
              width: buttonWidth,
              overflow: "hidden",
              paddingHorizontal: 15,
              gap: 10,
            }}
          >
            {/* Icon */}
            <Animated.View
              style={{ transform: [{ translateX: translateXIcon }] }}
            >
              <AntDesign
                name="message1"
                size={30}
                color="white"
                style={{ transform: [{ scaleX: -1 }] }}
              />
            </Animated.View>
            {/* Teks */}
            {isTextVisible && (
              <Animated.Text
                style={{
                  opacity: textOpacity,
                  color: "white",
                  fontFamily: "LexBold",
                }}
              >
                Kontak Penjual
              </Animated.Text>
            )}
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>

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
          <TouchableOpacity
            className="border border-white p-2 rounded-lg"
            activeOpacity={0.4}
          >
            <Ionicons
              name="chatbox-ellipses-outline"
              color={"white"}
              size={24}
            />
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

export default servicesDetailScreen;
