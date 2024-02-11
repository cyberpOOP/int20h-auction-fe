import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {IProduct, ProductStatus} from "../../../models/IProduct";
import {ProductService} from "@core/services/product.service";
import {IProductFilter} from "../../../models/IProductFilter";
import {IFilterResponse} from "../../../models/IFilterResponse";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-main-content',
    templateUrl: './main-content.component.html',
    styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent implements OnInit{
  states: string[] = ["", "Pending", "Active", "Closed", "Cancelled", "Sold"]
  orderBy: string[] = ["", "Title", "Price", "MinimalBid", "EndDate"]
  productFilterForm: FormGroup;
  productFilter: IProductFilter = {
    Title: null,
    State: null,
    OrderBy: null,
    OnlyWithMyBids: false,
    Skip: 0,
    Take: 12
  };
  productsData: IFilterResponse = {
    count: 0,
    page: 1,
    skip: 0,
    value: []
  }

  getCurrentPageProducts() {
    if (this.productsData.value != null)
      return this.productsData.value;
    return [];
  }

  prevPage() {
    if (this.productsData.page > 1) {
      this.productFilter.Skip! -= this.productFilter.Take!;
      this.fetchProducts();
    }
  }

  nextPage() {
    if (this.productsData.page < this.getTotalPages()) {
      this.productFilter.Skip! += this.productFilter.Take!;
      this.fetchProducts();
    }
  }

  getTotalPages() {
    console.log(this.productFilter)
    if (this.productsData.count > 0)
      return Math.ceil(this.productsData.count / this.productFilter.Take!);
    return 1;
  }
  constructor(private productService: ProductService, private fb: FormBuilder) {
    this.productFilterForm = this.fb.group({
      'Title': [this.productFilter.Title],
      'State': [this.productFilter.State],
      'OrderBy': [this.productFilter.OrderBy],
      'OnlyWithMyBids': [this.productFilter.OnlyWithMyBids]
    });
  }

  fetchProducts() {
    this.productService.get(this.productFilter).subscribe(
      (res) => {
        this.productsData = res;
      }
    );
  }

  ngOnInit(): void {
    this.fetchProducts();
  }
  submitForm() {
    this.productFilter.OnlyWithMyBids = this.productFilterForm.value.OnlyWithMyBids
    this.productFilter.OrderBy = this.productFilterForm.value.OrderBy
    this.productFilter.Title = this.productFilterForm.value.Title
    this.productFilter.State = this.productFilterForm.value.State
    this.fetchProducts();
  }


  protected readonly ProductStatus = ProductStatus;
}
