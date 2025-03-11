import * as Icons from "@expo/vector-icons";

export interface inputProps {
  myClassName?: string;
  type?: "text" | "email" | "password" | "number";
  placeholder?: string;
  placeholderFont?: string;
  icon?: string;
  iconLibrary?: keyof typeof Icons; // Bisa ambil semua dari expo-vector-icons
  iconColor?: string;
  iconSize?: number;
  inputFontSize?: number;
}
