import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  TouchableOpacity,
  Image,
  useColorScheme,
  Animated,
} from "react-native";
// COMPONENTS
import MyButtonBack from "@/components/buttonBack";
import MyText from "@/components/text";
// HOOKS FE
import { useNewsAnimation } from "@/hooks/Frontend/detailProductScreen/newsAnimation";

function newsDetailScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [isTextScrolling, setIsTextScrolling] = useState(false);

  // MAPPING BERITA
  const dataBerita = [
    {
      id: 1,
      kategori: "Sayuran",
      judul: "Viral Selada Asli Bandung Edan Pisan !!",
      penulis: "Sayyid Gibran",
      waktu: "2 Jam Yang Lalu",
    },
    {
      id: 2,
      kategori: "Jasa",
      judul: "Viral Selada Asli Bandung Edan Pisan !!",
      penulis: "Sandro Anugrah",
      waktu: "4 Jam Yang Lalu",
    },
    {
      id: 3,
      kategori: "Sarana Pertanian",
      judul: "Viral Selada Asli Bandung Edan Pisan !!",
      penulis: "Naufal Fadhil",
      waktu: "5 Jam Yang Lalu",
    },
  ];

  // SELURUH FUNGSI SECARA TERPISAH
  const {
    translateY,
    scrollText,
    panResponder,
    opacityBadgeHeader,
    opacityTitleHeader,
    opacityDescHeader,
    opacityBadgeFloating,
    opacityTitleFloating,
    opacityDescFloating,
  } = useNewsAnimation();

  return (
    <View className="flex-1 justify-center items-center">
      {/* BUTTON KEMBALI */}
      <MyButtonBack
        myActiveOpacity={0.3}
        myClassName="py-2 absolute top-14 left-4 z-10"
        onPress={() => router.back()}
        mySize={35}
        myColor="white"
      />
      {/* HEADER KONTEN */}
      <View
        style={{
          position: "absolute",
          top: 50,
          left: 60,
          zIndex: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {/* TEKS JUDUL BERJALAN BAGIAN HEADER */}
        <View>
          <View
            style={{
              width: "100%",
              overflow: "hidden",
            }}
          >
            <Animated.Text
              numberOfLines={1}
              ellipsizeMode="clip"
              style={{
                fontSize: 22,
                color: "white",
                fontFamily: "LexBlack",
                transform: isTextScrolling ? [{ translateX: scrollText }] : [],
                opacity: opacityTitleHeader,
              }}
            >
              {isTextScrolling
                ? "VIRAL SALADA SEGAR ASLI BANDUNG PISAN"
                : "VIRAL SALADA SEGAR ASLI BANDUNG PISAN".slice(0, 16) + "..."}
            </Animated.Text>
          </View>

          {/* TEKS DESKRIPSI HEADER */}
          <Animated.View style={{ opacity: opacityDescHeader }}>
            <MyText
              fontFamily="LexMedium"
              fontSize={16}
              style={{ color: "white" }}
            >
              Trending . 2 Jam Yang Lalu
            </MyText>
          </Animated.View>
        </View>

        {/* TEKS BADGE HEADER */}
        <Animated.View style={{ opacity: opacityBadgeHeader }}>
          <MyText
            fontFamily="LexMedium"
            fontSize={14}
            textstyle="rounded-full px-2 py-1 text-center absolute z-10 -top-6 left-2"
            style={{
              backgroundColor: colorScheme === "dark" ? "#333836" : "#093731",
              color: "white",
            }}
          >
            Sayuran
          </MyText>
        </Animated.View>
      </View>

      {/* GAMBAR LATAR BELAKANG FIXED */}
      <Image
        source={require("@/assets/images/imageReview/916.png")}
        resizeMode="contain"
      />

      {/* FLOATING KONTEN */}
      <View
        style={{
          position: "absolute",
          top: -30,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <Animated.View
          {...panResponder.panHandlers}
          style={{
            transform: [{ translateY }],
          }}
        >
          {/* BAGIAN TEKS */}
          <Animated.View className="px-5">
            {/* TEKS BADGE FLOATING */}
            <Animated.View
              style={{
                opacity: opacityBadgeFloating,
              }}
            >
              <MyText
                fontFamily="LexMedium"
                fontSize={16}
                textstyle="rounded-full w-1/4 p-1 text-center"
                style={{
                  backgroundColor:
                    colorScheme === "dark" ? "#333836" : "#093731",
                  color: "white",
                }}
              >
                Sayuran
              </MyText>
            </Animated.View>

            {/* TEKS JUDUL FLOATING */}
            <Animated.View
              style={{
                opacity: opacityTitleFloating,
              }}
            >
              <MyText
                fontFamily="LexBlack"
                fontSize={22}
                textstyle="rounded-full p-1"
                style={{ color: "white" }}
              >
                VIRAL SALADA SEGAR ASLI BANDUNG PISAN
              </MyText>
            </Animated.View>

            {/* TEKS DESKRIPSI FLOATING */}
            <Animated.View style={{ opacity: opacityDescFloating }}>
              <MyText
                fontFamily="LexMedium"
                fontSize={16}
                textstyle="rounded-full p-1"
                style={{ color: "white" }}
              >
                Trending . 2 Jam Yang Lalu
              </MyText>
            </Animated.View>
          </Animated.View>

          {/* ISI FLOATING */}
          <View
            style={{
              backgroundColor: colorScheme === "dark" ? "#333836" : "#093731",
            }}
            className="w-full rounded-3xl h-full p-4"
          >
            {/* GARIS MODEL NAVIGASI */}
            <View className="bg-white h-1.5 w-2/5 rounded-full self-center mb-3" />

            <View className="flex-row items-center justify-start gap-3">
              {/* GAMBAR PENGARANG */}
              <Image
                source={require("@/assets/images/defaultProfile.png")}
                className="w-14 h-14"
              />

              {/* TEKS PENGARANG */}
              <MyText
                fontFamily="LexBlack"
                fontSize={18}
                style={{ color: "white" }}
              >
                Nama Pengarang
              </MyText>
            </View>

            {/* TEKS DESKRIPSI BERITA 1 */}
            <MyText
              fontFamily="LexSemiBold"
              fontSize={17}
              textstyle="py-4"
              style={{ color: "white" }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat,
              sequi explicabo obcaecati atque necessitatibus non, repellendus,
              maxime nostrum quaerat laborum labore praesentium numquam illum
              iusto voluptate sint laudantium reprehenderit error?
            </MyText>

            {/* TEKS DESKRIPSI BERITA 2 */}
            <MyText
              fontFamily="LexSemiBold"
              fontSize={17}
              style={{ color: "white" }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat,
              sequi explicabo obcaecati atque necessitatibus non, repellendus,
              maxime nostrum quaerat laborum labore praesentium numquam illum
              iusto voluptate sint laudantium reprehenderit error?
            </MyText>

            {/* TEKS REKOMENDASI BERITA */}
            <MyText
              fontFamily="LexBlack"
              fontSize={18}
              textstyle="mt-6 mb-2"
              style={{ color: "white" }}
            >
              Rekomendasi Berita
            </MyText>

            {/* KONTEN FLOATING MAPPING REKOMENDASI BERITA */}
            {dataBerita.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => router.push("/screens/newsDetailScreen")}
                activeOpacity={0.5}
              >
                <View className="flex-row mb-4">
                  {/* GAMBAR */}
                  <Image
                    source={require("@/assets/images/news.png")}
                    className="w-24 h-24 self-center opacity-75"
                  />
                  <View className="px-2">
                    {/* TEKS KATEGORI */}
                    <MyText
                      fontFamily="LexMedium"
                      fontSize={15}
                      style={{ color: "#FFFFFF60" }}
                    >
                      {item.kategori}
                    </MyText>

                    {/* TEKS JUDUL */}
                    <MyText
                      fontFamily="LexBlack"
                      fontSize={16}
                      textstyle="w-80"
                      style={{ color: "white" }}
                    >
                      {item.judul.length > 46
                        ? item.judul.slice(0, 46) + " ..."
                        : item.judul}
                    </MyText>
                    <View className="flex-row gap-4 items-center">
                      {/* GAMBAR PENULIS */}
                      <Image
                        source={require("@/assets/images/defaultProfile.png")}
                        className="w-7 h-7"
                      />

                      {/* TEKS PENULIS */}
                      <MyText
                        fontFamily="LexBlack"
                        fontSize={14}
                        style={{ color: "white" }}
                      >
                        {item.penulis}
                      </MyText>

                      {/* TEKS WAKTU */}
                      <MyText
                        fontFamily="LexBlack"
                        fontSize={10}
                        style={{ color: "white" }}
                      >
                        {item.waktu}
                      </MyText>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

export default newsDetailScreen;
