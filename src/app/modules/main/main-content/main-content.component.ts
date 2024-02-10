import {Component, OnInit} from '@angular/core';
import {IProduct, ProductStatus} from "../../../models/IProduct";
import {ProductService} from "@core/services/product.service";
import {IProductFilter} from "../../../models/IProductFilter";
import {IFilterResponse} from "../../../models/IFilterResponse";

@Component({
    selector: 'app-main-content',
    templateUrl: './main-content.component.html',
    styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent implements OnInit{
  products: IProduct[]  = []
  productFilter: IProductFilter = {
    Take: 12,
    Skip: 0
  };
  productsData: IFilterResponse

  getCurrentPageProducts() {
    if (this.productsData.Value != null)
      return this.productsData.Value;
    return [];
  }

  prevPage() {
    if (this.productsData.Page > 1) {

    }
  }

  nextPage() {
    if (this.productsData.Page < this.getTotalPages()) {

    }
  }

  getTotalPages() {
    return Math.ceil(this.productsData.Count / this.productFilter.Take!);
  }
  constructor(private productService: ProductService) {

  }

  private populateTestData() {
    for (let i = 1; i <= 50; i++) {
      const product: IProduct = {
        title: `Product ${i}`,
        description: `Description for Product ${i}`,
        price: 10 * i,
        minimalBid: 50 * i,
        phone: `123-456-${i}`,
        imageLinks: `https://th.bing.com/th/id/OIP.iSu2RcCcdm78xbxNDJMJSgHaEo?rs=1&pid=ImgDetMain`,
        status: ProductStatus.Active,
        endDate: new Date(`2022-12-${i}`),
        sellerEmail: `seller${i}@example.com`,
        winnerEmail: i % 2 === 0 ? `winner${i}@example.com` : null,
      };

      this.products.push(product);
    }
  }

  protected readonly ProductStatus = ProductStatus;

  ngOnInit(): void {
    this.productService.get(this.productFilter).subscribe(
      (res) => {
        console.log(res)
        this.productsData = res;
      }
    );
  }
}
