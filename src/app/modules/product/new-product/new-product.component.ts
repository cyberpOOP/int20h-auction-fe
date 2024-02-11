import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductService } from '@core/services/product.service';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { ICreateProductDto } from 'src/app/models/IProductFilter';

@Component({
    selector: 'app-new-product',
    templateUrl: './new-product.component.html',
    styleUrls: ['./new-product.component.scss'],
})
export class NewProductComponent {
    createProductForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private productService: ProductService,
        private dialog: MatDialog,
        private router: Router,
    ) {
        this.createProductForm = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            minimalBid: [null],
            imageLinks: [''],
            endDate: [null],
        });
    }

    imageUrl: string = "assets/images/product/product.png";

    submitForm() {
        if (this.createProductForm.valid) {
            const createProductDto: ICreateProductDto = this.createProductForm.value;
            this.productService.createProduct(createProductDto).subscribe(
                (_) => {
                    this.router.navigate(['/']);
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
            console.log(createProductDto);
        } else {
            this.dialog.open(ModalComponent, {
                data: {
                    header: 'Error',
                    content: 'Not valid Product',
                },
            });
        }
    }

  addProductPhoto($event: Event){
    // @ts-ignore
    const file = $event.target.files[0];

    if (file) {
      const formData = new FormData();

      formData.append(file.name, file, `/${file.name}`);

      this.productService.sendImage(formData).subscribe(
        (result) => {
          const url = (result as any).value.url;
          this.createProductForm.patchValue({
            imageLinks: url
          });
          this.imageUrl = url;
        },
        (error) => {
          console.log(error);
        },
      );
    }
  }
}
