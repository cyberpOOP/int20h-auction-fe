import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductPageComponent } from './product.component';
import { NewProductComponent } from './new-product/new-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AuthGuard } from '@core/guards/auth.guard';

const routes: Routes = [
    {
        path: 'new-product',
        component: NewProductComponent,
        canActivate: [AuthGuard],
    },
    {
        path: ':id',
        component: ProductPageComponent,
    },
    {
        path: ':id/edit',
        component: EditProductComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductRoutingModule {}
