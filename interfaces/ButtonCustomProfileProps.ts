export interface ButtonProps {
  children: React.ReactNode;
  classNameContainer?: string;
  textClassName?: string;
  onPress?: () => void;
  icon?: React.ReactNode;
}
