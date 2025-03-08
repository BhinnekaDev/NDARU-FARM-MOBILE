import { TouchableOpacity, Text } from "react-native";
import { buttonProps } from "@/interfaces/buttonProps";
import { useLoadFont } from "@/hooks/ClientSide/useLoadFonts";

export default function MyButton({
  title,
  fontFamily,
  myActiveOpacity,
  myClassName,
  ...props
}: buttonProps) {
  const fontLoaded = useLoadFont();

  return (
    <TouchableOpacity
      className={myClassName}
      activeOpacity={myActiveOpacity}
      {...props}
    >
      <Text
        style={fontLoaded && fontFamily ? { fontFamily } : {}}
        className="text-white text-center text-lg"
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
