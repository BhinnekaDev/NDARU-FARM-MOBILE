import * as Icons from "@expo/vector-icons";

export interface inputProps {
  myClassName?: string;
  type?: "text" | "email" | "password" | "number";
  placeholder?: string;
  placeholderFont?: string;
  icon?: string;
  iconLibrary?: keyof typeof Icons;
  iconColor?: string;
  iconSize?: number;
  inputFontSize?: number;
  rightIcon?: string;
  rightIconLibrary?: keyof typeof Icons;
  rightIconColor?: string;
  rightIconSize?: number;
  withBorder?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
  onRightIconPress?: () => void;
}
