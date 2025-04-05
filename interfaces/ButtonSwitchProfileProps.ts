import { ReactNode } from "react";

export interface ButtonSwitchProfileProps {
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
