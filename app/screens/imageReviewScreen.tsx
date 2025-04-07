import { useState, useRef } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  useColorScheme,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ViewToken,
} from "react-native";
import MyButtonBack from "@/components/buttonBack";
import { Ionicons } from "@expo/vector-icons";

const images = [
  require("@/assets/images/imageReview/916.png"),
  require("@/assets/images/imageReview/916.png"),
  require("@/assets/images/imageReview/916.png"),
  require("@/assets/images/imageReview/916.png"),
];

const { width } = Dimensions.get("window");

function ImageReviewScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const MAX_LENGTH = 90;
  const [isExpanded, setIsExpanded] = useState(false);
  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index ?? 0);
    }
  };

  const comment =
    "Produk ini sangat bagus dan berkualitas tinggi! Saya sangat puas dengan pembelian ini dan pasti akan membeli lagi di masa depan. Terima kasih!";

  const toggleComment = () => {
    setIsExpanded((prev) => !prev);
  };

  const previewText =
    comment.length > MAX_LENGTH
      ? comment.substring(0, MAX_LENGTH) + "..."
      : comment;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#131514",
      }}
    >
      {/* Fixed Header */}
      <View
        style={{
          position: "absolute",
          top: 35,
          left: 20,
          right: 0,
          justifyContent: "flex-start",
        }}
      >
        {/* Tombol Kembali */}
        <MyButtonBack
          mySize={24}
          myActiveOpacity={0.5}
          onPress={() => router.back()}
          myClassName="p-2 rounded-full"
        />
      </View>

      {/* Fixed Header Tengah */}
      <View
        style={{
          position: "absolute",
          top: 35,
          left: 0,
          right: 0,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 5,
        }}
      >
        {/* Indikator halaman gambar */}
        <Text style={{ fontFamily: "LexBold", fontSize: 20, color: "white" }}>
          {currentIndex + 1}/{images.length}
        </Text>
      </View>

      {/* Gambar */}
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        onViewableItemsChanged={onViewableItemsChanged}
        renderItem={({ item }) => (
          <View
            style={{ width, alignItems: "center", justifyContent: "center" }}
          >
            <Image
              source={item}
              style={{ width: "100%", height: "100%" }}
              resizeMode="contain"
            />
          </View>
        )}
      />

      {/* Fixed Footer */}
      <View
        style={{
          position: "absolute",
          bottom: 35,
          left: 0,
          right: 0,
          paddingHorizontal: 15,
          gap: 8,
        }}
      >
        {/* Info Pengguna & Rating */}
        <View className="flex-row items-center justify-between">
          <View className="gap-1">
            <Text style={{ color: "white", fontFamily: "LexBold" }}>
              @Gibran WallMart
            </Text>
            <View className="flex-row gap-1">
              {[...Array(5)].map((_, index) => (
                <Ionicons key={index} name="star" size={18} color={"white"} />
              ))}
            </View>
          </View>
          <Image
            source={require("@/assets/images/defaultProfile.png")}
            className="w-12 h-12 rounded-full"
            resizeMode="cover"
          />
        </View>

        {/* Kuantitas Produk */}
        <View className="flex-row items-center gap-1">
          <Text style={{ color: "white", fontFamily: "LexSemiBold" }}>
            Kuantitas:
          </Text>
          <Text style={{ color: "white", fontFamily: "LexSemiBold" }}>1KG</Text>
        </View>

        {/* Komentar */}
        <View>
          <Text style={{ fontFamily: "LexSemiBold", color: "white" }}>
            {isExpanded ? comment : previewText}
          </Text>

          {/* Button Baca Selengkapnya */}
          {comment.length > MAX_LENGTH && (
            <TouchableOpacity onPress={toggleComment}>
              <Text
                style={{
                  fontFamily: "LexSemiBold",
                  color: colorScheme === "dark" ? "#0FC348" : "#159778",
                }}
              >
                {isExpanded ? "Tampilkan Lebih Sedikit" : "Baca Selengkapnya"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View className="flex-row items-center justify-end gap-3">
          <Text style={{ fontFamily: "LexSemiBold", color: "white" }}>
            01-05-2025
          </Text>
          <Text style={{ fontFamily: "LexSemiBold", color: "white" }}>
            16.30
          </Text>
        </View>
      </View>
    </View>
  );
}

export default ImageReviewScreen;
