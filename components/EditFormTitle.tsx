import { View, Text } from "react-native";

const SectionTitle = ({ title, visible }: any) => {
  if (!visible) return null;
  return (
    <View className="py-6 w-96">
      <Text className="text-gray-400 text-lg font-semibold mb-4">{title}</Text>
    </View>
  );
};
export default SectionTitle;
