import { ReactNode } from "react";
export interface AnimationFadeInFadeOutProps {
  children?: ReactNode;
  isActive: boolean;
  direction?: "in" | "out";
}
