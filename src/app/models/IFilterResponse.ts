import {IProduct} from "./IProduct";

export interface IFilterResponse{
  Count: number,
  Page: number,
  Skip: number,
  Value: IProduct[]
}
