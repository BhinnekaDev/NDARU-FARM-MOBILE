import { ReactNode } from "react";
export interface AnimationProps {
  children?: ReactNode;
  isActive: boolean;
  direction?: "up" | "down";
}
