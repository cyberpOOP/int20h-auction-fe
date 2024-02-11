import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@core/services/product.service';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { Subscription } from 'rxjs';
import { IProduct, ProductStatus } from 'src/app/models/IProduct';
import { IEditProductDto } from 'src/app/models/IProductFilter';
import { IResponse } from 'src/app/models/IResponse';

@Component({
    selector: 'app-edit-product',
    templateUrl: './edit-product.component.html',
    styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit, OnDestroy {
    private routeSub: Subscription;
    editProductForm: FormGroup;
    public product: IProduct;
    private productId: string;
    productStatusOptions = Object.keys(ProductStatus).filter((value) => !isNaN(Number(value)));

    constructor(
        private fb: FormBuilder,
        private productService: ProductService,
        private dialog: MatDialog,
        private route: ActivatedRoute,
        private location: Location,
    ) {
        this.editProductForm = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            minimalBid: [null],
            imageLinks: [''],
            endDate: [null],
            status: [null, Validators.required],
        });
    }

    ngOnInit(): void {
        this.routeSub = this.route.params.subscribe((params) => {
            this.productId = params['id'];
            this.productService.getOne(params['id']).subscribe(
                (result) => {
                    if ((result as IResponse<IProduct>).value !== undefined) {
                        this.product = (result as IResponse<IProduct>).value!;
                        console.log(this.product);
                        this.editProductForm.setValue({
                            title: this.product.title,
                            description: this.product.description,
                            minimalBid: this.product.minimalBid || 0,
                            imageLinks: this.product.imageLinks || '',
                            endDate: this.product.endDate,
                            status: this.product.status,
                        });
                    }
                },
                (error) => {
                    this.dialog.open(ModalComponent, {
                        data: {
                            header: 'Error',
                            content: (error.error as any).message,
                        },
                    });
                },
            );
        });
    }

    submitForm() {
        if (this.editProductForm.valid) {
            const editProductDto: IEditProductDto = this.editProductForm.value;
            editProductDto.status = Number(editProductDto.status);
            this.productService.editProduct(editProductDto, this.productId).subscribe(
                (_) => {
                    this.location.back();
                },
                (error) => {
                    this.dialog.open(ModalComponent, {
                        data: {
                            header: 'Error',
                            content: (error.error as any).message,
                        },
                    });
                },
            );
            console.log(editProductDto);
        } else {
            this.dialog.open(ModalComponent, {
                data: {
                    header: 'Error',
                    content: 'Not valid Product',
                },
            });
        }
    }

    getStatus(status: string) {
        return ProductStatus[status as keyof typeof ProductStatus];
    }

    ngOnDestroy(): void {
        this.routeSub.unsubscribe();
    }
}
