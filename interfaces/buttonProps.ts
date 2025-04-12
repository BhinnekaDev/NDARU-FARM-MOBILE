import * as Icons from "@expo/vector-icons";

export interface buttonProps {
  title?: string;
  fontFamily?: string;
  myActiveOpacity?: number;
  myClassName?: string;
  myTouchStyle?: string;
  myTextStyle?: string;
  myButtonColor?: string;
  onPress?: () => void;
  icon?: string;
  iconLibrary?: keyof typeof Icons;
  iconSize?: number;
  iconColor?: string;
  iconPosition?: "left" | "right";
  buttonType?: string;
  borderWidth?: number;
  borderColor?: string;
  textColor?: string;
  buttonColorType?: string;
}
