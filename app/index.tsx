import "@/global.css";
import { useRouter } from "expo-router";
import { Text, View, TouchableOpacity } from "react-native";

export default function Index() {
  const router = useRouter();
  return (
    <View className="flex-1 justify-center items-center">
      {/* Ini mengarahkan ke halaman login */}
      <TouchableOpacity onPress={() => router.push("/screens/login")}>
        <Text style={{ fontFamily: "Lexend-Black" }}>Menuju Halaman Login</Text>
      </TouchableOpacity>
    </View>
  );
}
