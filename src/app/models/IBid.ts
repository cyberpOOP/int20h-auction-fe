import { IUser } from './IUser';

export interface IBid {
    bidder: IUser;
    price: number;
}

export interface ICreateBid {
    productId: string;
    price: number;
}
