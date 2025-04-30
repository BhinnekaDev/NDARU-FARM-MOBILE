export interface Option {
  label: string;
  value: string;
}

export interface AnimationDropdownFormProps {
  selected: Option | null;
  onSelect: (option: Option) => void;
  options: Option[];
  label?: string; // label custom yang simpel
  customIcon?: React.ReactNode; // masih bisa tetap custom icon kalau mau
}
