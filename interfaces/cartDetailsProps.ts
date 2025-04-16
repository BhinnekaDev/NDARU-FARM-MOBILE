export interface CartItem {
  id?: string;
  name: string;
  description: string;
  image: any; // Tetap pakai `any` khusus untuk image (bisa file lokal atau remote)
  price?: string;
  quantity?: string;
  date?: string;
  detailType?: "vegetable" | "service" | "news" | "facility";
  rating?: number;
}
