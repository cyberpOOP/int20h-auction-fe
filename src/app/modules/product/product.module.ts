import { NgModule } from '@angular/core';
import { ProductPageComponent } from './product.component';
import { SharedModule } from '@shared/shared.module';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [ProductPageComponent],
    imports: [SharedModule, CommonModule, ProductRoutingModule, FormsModule, ReactiveFormsModule],
})
export class ProductModule {}
