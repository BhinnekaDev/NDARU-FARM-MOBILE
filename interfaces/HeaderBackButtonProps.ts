import { ReactNode } from "react";
export interface HeaderBackButtonProps {
  title: string;
  onPress?: () => void;
  icon?: ReactNode;
}
