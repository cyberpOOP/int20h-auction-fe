import { NgModule } from '@angular/core';
import { ProductPageComponent } from './product.component';
import { SharedModule } from '@shared/shared.module';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewProductComponent } from './new-product/new-product.component';

@NgModule({
    declarations: [ProductPageComponent, NewProductComponent],
    imports: [SharedModule, CommonModule, ProductRoutingModule, FormsModule, ReactiveFormsModule],
})
export class ProductModule {}
