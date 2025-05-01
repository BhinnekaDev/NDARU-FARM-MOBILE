export interface AnimateFormProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  withAnimated?: boolean;
  withBorder?: boolean;
  labelClassName?: string;
  labelStyle?: object;
}
