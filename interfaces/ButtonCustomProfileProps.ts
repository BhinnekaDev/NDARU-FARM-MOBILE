import { ReactNode } from "react";

export interface ButtonProps {
  children: ReactNode;
  classNameContainer?: string;
  textClassName?: string;
  onPress?: () => void;
  icon?: React.ReactNode;
}
