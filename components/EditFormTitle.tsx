import { View, Text, useColorScheme } from "react-native";

const SectionTitle = ({ title }: { title: string }) => {
  const isDarkMode = useColorScheme() === "dark";
  return (
    // JUDUL FORM
    <View className="py-6 w-96">
      <Text className={` ${isDarkMode ? "text-white" : "text-black"} text-lg  mb-4 opacity-50`} style={{ fontFamily: "LexXBold" }}>
        {title}
      </Text>
    </View>
  );
};
export default SectionTitle;
