import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  LayoutChangeEvent,
  Share,
} from "react-native";
import { useColorScheme } from "react-native";
import { useRouter } from "expo-router";
// COMPONENTS
import MyButtonCategory from "@/components/buttonCategory";
// HOOKS
import useFavoriteProduct from "@/hooks/Frontend/favoriteScreen/useFavoriteProduct";
// ICONS
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

type DropdownState = {
  [productId: string]: {
    open: boolean;
    selectedItem: string | null;
    value: string | null;
    layout: { width: number; height: number };
  };
};

export default function FavoriteCard() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const {
    filteredProducts,
    getQuantitiesByType,
    selectedCategory,
    setSelectedCategory,
  } = useFavoriteProduct();

  const [dropdownState, setDropdownState] = useState<DropdownState>({});

  const toggleDropdown = (id: string) => {
    setDropdownState((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        open: !prev[id]?.open,
      },
    }));
  };

  const selectItem = (id: string, item: { label: string; value: string }) => {
    setDropdownState((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        selectedItem: item.label,
        value: item.value,
        open: false,
      },
    }));
  };

  const onContainerLayout = (id: string, e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setDropdownState((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        layout: { width, height },
      },
    }));
  };

  const handleShare = async (item: any) => {
    try {
      const message = `
  📦 *${item.name}*
  📝 ${item.description}
  💰 Rp${item.price.toLocaleString()}/${item.unit}
  🔗 Cek selengkapnya di: https://example.com/product/${item.id}
  `;

      await Share.share({
        message,
        title: item.name,
        url: `https://example.com/product/${item.id}`,
      });
    } catch (error) {
      console.error("Gagal membagikan:", error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colorScheme === "dark" ? "#131514" : "white",
      }}
    >
      {/* Teks Header */}
      <View className="pt-24 pb-9 self-center">
        <Text
          style={{
            fontFamily: "LexBold",
            fontSize: 32,
            color: useColorScheme() === "dark" ? "white" : "black",
          }}
        >
          Favorit
        </Text>
      </View>

      {/* Tombol Memilihh Kategori */}
      <View className="py-4">
        <MyButtonCategory
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          hideCategories={["Berita"]}
          ScrollStyle="self-center"
        />
      </View>

      {/* Konten Card Favorit */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 30, gap: 10 }}
        renderItem={({ item }) => {
          const state = dropdownState[item.id] || {
            open: false,
            selectedItem: null,
            value: null,
            layout: { width: 200, height: 40 },
          };
          const quantityItems = getQuantitiesByType(item.type);

          return (
            <View key={item.id} className="flex-col items-center px-3 mb-8">
              <View className="flex-row items-center gap-4">
                {/* Klik ke Detail Produk */}
                <TouchableOpacity
                  onPress={() => {
                    if (item.type === "vegetable") {
                      router.push("/screens/vegetableDetailScreen");
                    } else if (item.type === "service") {
                      router.push("/screens/servicesDetailScreen");
                    } else if (item.type === "facility") {
                      router.push("/screens/facilityDetailScreen");
                    }
                  }}
                  activeOpacity={0.5}
                >
                  {/* Gambar Produk */}
                  <Image
                    source={item.image}
                    className="w-44 h-44 rounded-xl"
                    resizeMode="cover"
                  />
                </TouchableOpacity>

                {/* Teks Produk */}
                <View>
                  {/* Klik Ke Detail Produk */}
                  <TouchableOpacity
                    onPress={() => {
                      if (item.type === "vegetable") {
                        router.push("/screens/vegetableDetailScreen");
                      } else if (item.type === "service") {
                        router.push("/screens/servicesDetailScreen");
                      } else if (item.type === "facility") {
                        router.push("/screens/facilityDetailScreen");
                      }
                    }}
                    activeOpacity={0.4}
                  >
                    {/* Teks Nama */}
                    <Text
                      style={{
                        fontFamily: "LexBold",
                        fontSize: 18,
                        color: isDark ? "white" : "black",
                      }}
                    >
                      {item.name.length > 16
                        ? item.name.slice(0, 16) + "..."
                        : item.name}
                    </Text>

                    {/* Teks Deskripsi */}
                    <Text
                      style={{
                        fontFamily: "LexBold",
                        fontSize: 16,
                        color: isDark ? "#FFFFFF70" : "#00000070",
                      }}
                    >
                      {item.description.length > 20
                        ? item.description.slice(0, 20) + "..."
                        : item.description}
                    </Text>
                  </TouchableOpacity>

                  {/* Teks Harga */}
                  <Text
                    style={{
                      fontFamily: "LexBold",
                      fontSize: 18,
                      color: isDark ? "white" : "black",
                    }}
                  >
                    Rp{item.price.toLocaleString()}/{item.unit}
                  </Text>

                  {/* Dropdown Kuantitas */}
                  <View
                    onLayout={(e) => onContainerLayout(item.id, e)}
                    style={{
                      width: 200,
                      height: 40,
                      marginTop: 10,
                      position: "relative",
                    }}
                  >
                    {/* Klik untuk membuka Dropdown */}
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderWidth: 1,
                        borderRadius: 8,
                        justifyContent: "space-between",
                        borderColor: isDark ? "white" : "black",
                      }}
                      onPress={() => toggleDropdown(item.id)}
                    >
                      {/* Teks Placeholder Dropdown */}
                      <Text
                        style={{
                          fontFamily: "LexMedium",
                          fontSize: 14,
                          color: isDark ? "#FFFFFF70" : "#00000070",
                        }}
                      >
                        {item.type === "service"
                          ? state.selectedItem || "Durasi (Bulan)"
                          : state.selectedItem || "Pilih Kuantitas"}
                      </Text>
                      <AntDesign
                        name={state.open ? "up" : "down"}
                        size={13}
                        style={{
                          marginLeft: 10,
                          color: isDark ? "white" : "black",
                        }}
                      />
                    </TouchableOpacity>

                    {/* Isi Dropdown */}
                    {state.open && (
                      <View
                        style={{
                          position: "absolute",
                          top: state.layout.height,
                          left: 0,
                          width: state.layout.width,
                          backgroundColor: isDark ? "#333836" : "#FFFFFF",
                          borderWidth: 1,
                          borderColor: "gray",
                          zIndex: 10,
                          borderRadius: 8,
                          maxHeight: 100,
                        }}
                      >
                        <ScrollView nestedScrollEnabled={true}>
                          {quantityItems.map((q) => (
                            <TouchableOpacity
                              key={q.value}
                              style={{
                                paddingVertical: 10,
                                paddingHorizontal: 15,
                              }}
                              onPress={() => selectItem(item.id, q)}
                            >
                              {/* Teks Isi Dropdown */}
                              <Text
                                style={{
                                  fontFamily: "LexMedium",
                                  fontSize: 14,
                                  color: isDark ? "white" : "black",
                                }}
                              >
                                {q.label}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </ScrollView>
                      </View>
                    )}
                  </View>

                  {/* Tombol Masukan ke Keranjang */}
                  <TouchableOpacity
                    className="items-center rounded-lg px-4 py-1 mt-2"
                    style={{
                      backgroundColor: isDark ? "white" : "black",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "LexBold",
                        color: isDark ? "black" : "white",
                        fontSize: 14,
                      }}
                    >
                      + Keranjang
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Tombol Bagikan */}
              <TouchableOpacity
                activeOpacity={0.3}
                className="items-center self-start flex-row gap-1 px-3 mt-3"
                onPress={() => handleShare(item)}
              >
                <Entypo
                  name="share"
                  size={24}
                  color={isDark ? "white" : "black"}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "LexMedium",
                    color: isDark ? "white" : "black",
                  }}
                >
                  Bagikan
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
}
