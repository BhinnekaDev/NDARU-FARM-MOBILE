import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import Button from "@/components/Elements/Button"; // Sesuaikan path jika berbeda

export default function Index() {
  const router = useRouter();

  const handleNavigation = () => {
    router.push("/Profile"); // Sesuaikan dengan nama folder
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-2xl">Welcome Everyone 👋</Text>
      <Button className="bg-red-500" onPress={handleNavigation}>
        Go To Profile Dawg
      </Button>
    </View>
  );
}
