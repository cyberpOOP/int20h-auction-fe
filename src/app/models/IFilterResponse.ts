import {IProduct} from "./IProduct";

export interface IFilterResponse{
  count: number,
  page: number,
  skip: number,
  value: IProduct[]
}
