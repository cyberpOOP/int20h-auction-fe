export interface IProductFilter {
    Title?: string | null;
    State?: string | null;
    OrderBy?: string | null;
    OnlyWithMyBids?: boolean | null;
    Skip: number | null;
    Take: number | null;
}

export interface ICreateProductDto {
    title: string;
    description: string;
    minimalBid?: number;
    imageLinks?: string;
    endDate?: Date;
}
