export interface IProductFilter{
  Title?: string | null;
  State?: string | null;
  OrderBy?: string | null;
  OnlyWithMyBids?: boolean | null;
  Skip?: number | null;
  Take?: number | null;
}
