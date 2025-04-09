import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  useColorScheme,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MyButtonBack from "@/components/buttonBack";

function SearchScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const [searchInput, setSearchInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleSearchSubmit = () => {
    const trimmed = searchInput.trim();
    if (trimmed === "") return;

    setHistory((prev) => [trimmed, ...prev.filter((item) => item !== trimmed)]);
    setSearchInput("");
    Keyboard.dismiss();
  };

  const handleLongPress = (item: string) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const confirmDelete = () => {
    if (selectedItem) {
      setHistory((prev) => prev.filter((i) => i !== selectedItem));
      setSelectedItem(null);
      setModalVisible(false);
    }
  };

  return (
    <View
      className="flex-1 py-14"
      style={{ backgroundColor: colorScheme === "dark" ? "#131514" : "white" }}
    >
      {/* Search Bar */}
      <View className="w-full flex-row justify-center items-center gap-3 px-9">
        <MyButtonBack mySize={32} onPress={() => router.back()} />
        <View
          className="flex-row items-center px-4 rounded-2xl h-10 w-full"
          style={{
            backgroundColor: colorScheme === "dark" ? "#333836" : "#093731",
          }}
        >
          <Ionicons name="search-outline" size={20} color={"white"} />
          <TextInput
            className="flex-1 ml-3 text-base"
            placeholder="Cari..."
            value={searchInput}
            onChangeText={setSearchInput}
            onSubmitEditing={handleSearchSubmit}
            returnKeyType="search"
            placeholderTextColor={colorScheme === "dark" ? "#CCC" : "white"}
            style={{
              fontFamily: "LexMedium",
              color: "white",
            }}
          />

          {searchInput.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchInput("")}
              activeOpacity={0.7}
            >
              <Ionicons
                name="close"
                size={18}
                color="white"
                style={{ marginLeft: 6 }}
                className="bg-white/25 rounded-full"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Riwayat Pencarian */}
      <ScrollView className="px-6 mt-4">
        {history.length === 0 ? (
          <Text
            style={{
              color: colorScheme === "dark" ? "#888" : "#666",
              fontFamily: "LexMedium",
              marginTop: 10,
            }}
          >
            Belum ada riwayat pencarian.
          </Text>
        ) : (
          history.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="flex-row items-center justify-between py-3"
              onPress={() => setSearchInput(item)}
              onLongPress={() => handleLongPress(item)}
              delayLongPress={230}
              activeOpacity={0.5}
            >
              <View className="flex-row items-center gap-5">
                <MaterialIcons
                  name="history"
                  size={24}
                  color={colorScheme === "dark" ? "white" : "black"}
                />
                <Text
                  style={{
                    color: colorScheme === "dark" ? "white" : "black",
                    fontFamily: "LexMedium",
                    fontSize: 16,
                  }}
                >
                  {item}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setSearchInput(item)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="arrow-forward"
                  size={24}
                  color={colorScheme === "dark" ? "white" : "black"}
                  style={{
                    transform: [{ rotate: "220deg" }],
                  }}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Modal Delete Riwayat Pencarian */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50 px-8">
          <View className="w-full bg-white dark:bg-neutral-900 rounded-xl p-6">
            <Text
              style={{
                fontFamily: "LexMedium",
                fontSize: 18,
                color: colorScheme === "dark" ? "white" : "black",
                marginBottom: 10,
              }}
            >
              Hapus Riwayat?
            </Text>
            <Text
              style={{
                fontFamily: "LexMedium",
                fontSize: 16,
                color: colorScheme === "dark" ? "#aaa" : "#444",
                marginBottom: 20,
              }}
            >
              Apakah kamu yakin ingin menghapus "{selectedItem}" dari riwayat?
            </Text>

            <View className="flex-row justify-end gap-4">
              <Pressable onPress={() => setModalVisible(false)}>
                <Text
                  style={{
                    fontFamily: "LexMedium",
                    fontSize: 16,
                    color: "#888",
                  }}
                >
                  Batal
                </Text>
              </Pressable>
              <Pressable onPress={confirmDelete}>
                <Text
                  style={{
                    fontFamily: "LexMedium",
                    fontSize: 16,
                    color: "red",
                  }}
                >
                  Hapus
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default SearchScreen;
