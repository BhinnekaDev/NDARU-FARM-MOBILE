import "@/global.css";
import { Text, View } from "react-native";
import Button from "@/components/Elements/Button"; // Sesuaikan path jika berbeda

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button className="bg-red-500">Go To Profile Dawg</Button>
    </View>
  );
}
