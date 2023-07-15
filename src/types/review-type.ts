export interface IReview {
  id: string;
  rating: number;
  content: string;
  productId: string;
  owner: {
    id: number;
    fullName: string;
    avatar: string;
  };
}
