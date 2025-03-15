import { MaterialIcons } from "@expo/vector-icons";

export interface SettingOptionProps {
  iconName?: keyof typeof MaterialIcons.glyphMap;
  label: string;
  value?: boolean;
  onToggle?: (newValue: boolean) => void;
  containerClassName?: string;
  iconClassName?: string;
  labelClassName?: string;
  dividerClassName?: string;
}
