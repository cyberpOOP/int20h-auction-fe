import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductPageComponent } from './product.component';
import { NewProductComponent } from './new-product/new-product.component';

const routes: Routes = [
    {
        path: 'new-product',
        component: NewProductComponent,
    },
    {
        path: ':id',
        component: ProductPageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductRoutingModule {}
