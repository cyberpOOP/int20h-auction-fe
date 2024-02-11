import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BidService } from '@core/services/bid.service';
import { ProductService } from '@core/services/product.service';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { Subscription } from 'rxjs';
import { ICreateBid } from 'src/app/models/IBid';
import { IProduct } from 'src/app/models/IProduct';
import { IResponse } from 'src/app/models/IResponse';

@Component({
    selector: 'app-product-page',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
})
export class ProductPageComponent implements OnInit {
    private routeSub: Subscription;
    public product: IProduct;
    private bid: ICreateBid;

    bidForm = new FormGroup({
        bid: new FormControl(''),
    });

    constructor(
        private productService: ProductService,
        private dialog: MatDialog,
        private route: ActivatedRoute,
        private bidService: BidService,
    ) {}

    ngOnInit(): void {
        this.routeSub = this.route.params.subscribe((params) => {
            this.productService.getOne(params['id']).subscribe(
                (result) => {
                    if ((result as IResponse<IProduct>).value !== undefined) {
                        this.product = (result as IResponse<IProduct>).value!;
                        console.log(this.product);
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

    submitForm(event: SubmitEvent) {
        event.preventDefault();
        this.placeABid();
    }

    placeABid() {
        this.bid = {
            productId: this.product.id || '',
            price: Number(this.bidForm.value.bid) || 0,
        };

        this.bidService.placeABid(this.bid).subscribe(
            (result) => {
                // this.product.price
                console.log(result);
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
    }
}
