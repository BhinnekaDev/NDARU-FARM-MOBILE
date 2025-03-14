import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import Button from "@/components/ButtonProfile";

export default function Index() {
  const router = useRouter();

  const handleNavigation = () => {
    router.push("/(tabs)/profile");
  };

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-2xl text-black font-semibold">Welcome Everyone 👋</Text>
      <Button
        textClassName="text-white text-base font-semibold" //
        className="bg-red-500 font-semibold h-10 px-6 rounded-md justify-center items-center"
        onPress={handleNavigation}
      >
        Go To Profile Dawgs
      </Button>
    </View>
  );
}
