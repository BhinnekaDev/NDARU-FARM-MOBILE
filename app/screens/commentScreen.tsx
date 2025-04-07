import { useRouter } from "expo-router";
import { View, Text, useColorScheme, ScrollView } from "react-native";
// COMPONENTS
import MyButtonBack from "@/components/buttonBack";
import MyTextComment from "@/components/textComment";

function commentScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const textColor = colorScheme === "dark" ? "#FFFFFF" : "#000000";

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colorScheme === "dark" ? "#131514" : "white",
      }}
    >
      {/* Fixed Header */}
      <View
        style={{
          backgroundColor: colorScheme === "dark" ? "#333836" : "white",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 15,
          paddingVertical: 5,
          marginTop: 40,
          gap: 10,
        }}
      >
        {/* Fixed Tombol Kembali */}
        <MyButtonBack
          mySize={24}
          myActiveOpacity={0.5}
          onPress={() => router.back()}
          myColor="white"
          myClassName="p-2 rounded-full"
          iconStyle={{
            color: useColorScheme() === "dark" ? "white" : "black",
          }}
        />

        {/* Fixed Teks */}
        <Text
          style={{
            fontFamily: "LexBold",
            fontSize: 20,
            color: textColor,
          }}
        >
          Ulasan Pembeli
        </Text>
      </View>

      {/* Body Konten */}
      <ScrollView
        contentContainerStyle={{
          paddingTop: 0,
          paddingHorizontal: 20,
        }}
      >
        {/* Komentar */}
        <MyTextComment className="pt-3 pb-12" showHeaderType={false} />
      </ScrollView>
    </View>
  );
}

export default commentScreen;
