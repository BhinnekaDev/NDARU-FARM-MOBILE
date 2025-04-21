export interface EditFormProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  withAnimated?: boolean;
  withBorder?: boolean;
}
