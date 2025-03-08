import "@/global.css";
import { Text, View } from "react-native";
import Button from "@/components/Elements/Button"; // Sesuaikan path jika berbeda

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-2xl">Welcome Everyone 👋</Text>
      <Button className="bg-red-500">Go To Profile Dawg</Button>
    </View>
  );
}
