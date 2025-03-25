export interface MyCardProps {
  image: any;
  bgImageStyle?: string;
  imageStyle?: string;
  name: string;
  description: string;
  price?: string;
  quantity?: string;
  date?: string;
  onPress?: () => void;
  id?: string;
  detailType?: "vegetable" | "news" | "service" | "facility";
}
