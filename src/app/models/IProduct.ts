import { IBid } from './IBid';
import { IUser } from './IUser';

export interface IProduct {
    id?: string;
    title: string;
    description: string;
    price: number;
    minimalBid?: number | null;
    phone?: string | null;
    imageLinks?: string | null;
    status: ProductStatus;
    endDate?: Date | null;
    sellerEmail: string;
    seller?: IUser;
    winnerEmail?: string | null;
    winner?: IUser | null;
    bids?: IBid[];
}

export enum ProductStatus {
    Pending,
    Active,
    Closed,
    Cancelled,
    Sold,
}
