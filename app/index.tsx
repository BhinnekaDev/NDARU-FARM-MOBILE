import "@/global.css";
import { Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center">
      {/* Mengarahkan ke Layar Home */}
      <TouchableOpacity
        activeOpacity={0.8}
        className="bg-green-900/70 px-4 py-2 rounded-md"
        onPress={() => router.push("/screens/home")}
      >
        <Text className="text-white font-bold">Masuk Beranda</Text>
      </TouchableOpacity>
    </View>
  );
}
