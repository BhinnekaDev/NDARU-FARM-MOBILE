import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import Button from "@/components/Elements/Button";

export default function Index() {
  const router = useRouter();

  const handleNavigation = () => {
    router.push("/(tabs)/profile");
  };

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-2xl text-black font-semibold">Welcome Everyone 👋</Text>
      <Button className="bg-red-500 font-semibold" onPress={handleNavigation}>
        Go To Profile Dawg
      </Button>
    </View>
  );
}
