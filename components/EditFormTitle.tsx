import { View, Text } from "react-native";
import { EditFormTitleProps } from "@/interfaces/EditFormTitleProps";

const SectionTitle = ({ title }: EditFormTitleProps) => {
  return (
    <View className="py-6 w-96">
      <Text className="text-gray-400 text-lg font-semibold mb-4">{title}</Text>
    </View>
  );
};
export default SectionTitle;
