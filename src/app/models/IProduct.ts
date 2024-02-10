export interface IProduct{
  title: string;
  description: string;
  price: number;
  minimalBid?: number | null;
  phone?: string | null;
  imageLinks?: string | null;
  status: ProductStatus;
  endDate?: Date | null;
  sellerEmail: string;
  winnerEmail?: string | null;
}

export enum ProductStatus{
  Pending,
  Active,
  Closed,
  Cancelled,
  Sold
}
