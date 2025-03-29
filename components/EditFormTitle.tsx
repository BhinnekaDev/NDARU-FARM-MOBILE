import { View, Text } from "react-native";

// OUR INTERFACES

const SectionTitle = ({ title }: { title: string }) => {
  return (
    // JUDUL FORM
    <View className="py-6 w-96">
      <Text className="text-gray-400 text-lg font-semibold mb-4">{title}</Text>
    </View>
  );
};
export default SectionTitle;
