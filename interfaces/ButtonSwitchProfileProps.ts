import { MaterialIcons } from "@expo/vector-icons";
import { ReactNode } from "react";

export interface SettingOptionProps {
  iconComponent?: ReactNode;

  label: string;
  value?: boolean;
  onToggle?: (newValue: boolean) => void;
  containerClassName?: string;
  labelClassName?: string;
  dividerClassName?: string;
  backgroundButtonOff?: string;
  backgroundButtonOn?: string;
  backgroundCircleButtonOn?: string;
  backgroundCircleButtonOff?: string;
}
