import { MaterialIcons } from "@expo/vector-icons";

export interface SuntingProfileProps {
  iconName: keyof typeof MaterialIcons.glyphMap;
  label: string;
  value?: string; // Untuk menampilkan nilai, bukan switch
  containerStyle?: string;
  labelStyle?: string;
  iconStyle?: string;
  dividerStyle?: string;
}
