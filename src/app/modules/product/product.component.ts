import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
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
export class ProductPageComponent implements OnInit, OnDestroy {
    private routeSub: Subscription;
    public product: IProduct;
    private bid: ICreateBid;
    public isSeller: boolean;
    public isAuth: boolean;

    bidForm = new FormGroup({
        bid: new FormControl(''),
    });

    constructor(
        private authService: AuthService,
        private productService: ProductService,
        private dialog: MatDialog,
        private route: ActivatedRoute,
        private router: Router,
        private bidService: BidService,
    ) {}

    ngOnInit(): void {
        this.routeSub = this.route.params.subscribe((params) => {
            this.productService.getOne(params['id']).subscribe(
                (result) => {
                    if ((result as IResponse<IProduct>).value !== undefined) {
                        this.product = (result as IResponse<IProduct>).value!;
                        this.product.endDate =
                            this.product.endDate != null ? this.dateToDottedFormat(this.product.endDate || '') : null;
                        this.isSeller = this.authService.getUserEmail() === this.product.seller?.email;
                        this.authService.isAuthenticated().subscribe((res) => {
                            this.isAuth = res;
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

    dateToSeparateFormat = (date: string | Date): string[] => {
        const targetDate = new Date(date);

        const year = targetDate.getFullYear().toString();
        const month = String(targetDate.getMonth() + 1).padStart(2, '0');
        const day = String(targetDate.getDate()).padStart(2, '0');

        return [day, month, year];
    };

    dateToDottedFormat = (date: string | Date): string => {
        const [day, month, year] = this.dateToSeparateFormat(date);

        return `${day}.${month}.${year}`;
    };

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
                if ((result as IResponse<IProduct>).value !== undefined) {
                    this.product = (result as IResponse<IProduct>).value!;
                    this.bidForm = new FormGroup({
                        bid: new FormControl(''),
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
    }

    deleteProduct() {
        this.productService.deleteProduct(this.product.id || '').subscribe(() => this.router.navigate(['/']));
    }

    ngOnDestroy(): void {
        this.routeSub.unsubscribe();
    }
}
