import "@/global.css";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center">
      {/* Mengarahkan Ke Halaman Register */}
      <TouchableOpacity onPress={() => router.push("/screens/register")}>
        <Text>Menuju Halaman Register</Text>
      </TouchableOpacity>
    </View>
  );
}
