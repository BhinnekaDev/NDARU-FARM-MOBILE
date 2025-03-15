import { ReactNode } from "react";
export interface SuntingProfileProps {
  value?: string;
  label?: string;
  text?: string;
  containerStyle?: string;
  labelStyle?: string;
  iconStyle?: string;
  dividerStyle?: string;
  onPress?: () => void;
  iconComponent?: ReactNode;
}
