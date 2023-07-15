export interface IProductItem {
  id: string;
  name: string;
  featuredImage: string;
  description: string;
  price: number;
  discount: number;
  ratingAvg: number;
  totalRatings: number;
}

export interface IDetailProduct {
  id: string;
  name: string;
  featuredImage: string;
  description: string;
  price: number;
  discount: number;
  ratingAvg: number;
  totalRatings: number;
  ingredient: string;
  mass: string;
  uses: string;
  preservation: string;
  expiryDate: string;
  origin: string;
  ratingStat: number[];
  categoryId: string;
}

export interface IProduct {
  id: string;
  name: string;
  categoryId: string;
  featuredImage: string;
  description: string;
  maxQuantity: number;
  ratingAvg: number;
  ratingStat: number[];
  totalRatings: number;
  totalViews: number;
  totalPurchases: number;
  price: number;
  discount: number;
  ingredient: string;
  mass: string;
  uses: string;
  preservation: string;
  expiryDate: string;
  origin: string;
  ownerId: string;
}