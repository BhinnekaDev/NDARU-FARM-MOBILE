export interface MyCardProps {
  image: any;
  bgImageStyle?: string;
  imageStyle?: string;
  name: string;
  description: string;
  price?: number;
  quantity?: string | number;
  date?: string;
  onPress?: () => void;
  id?: string;
  detailType?: "vegetable" | "service" | "news" | "facility";
  buttonType?: string;
  buttonTitle?: string;
  isDisabled?: boolean;
  rating?: number;
  onDelete?: () => void;
  onIncrease?: () => void;
  onDecrease?: () => void;
  showQuantityControl?: boolean;
}
