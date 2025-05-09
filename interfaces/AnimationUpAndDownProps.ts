import { ReactNode } from "react";
export interface AnimationUpAndDownProps {
  children?: ReactNode;
  isActive: boolean;
  direction?: "up" | "down";
}
