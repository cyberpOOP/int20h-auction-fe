import { Component } from '@angular/core';
import { IProduct, ProductStatus } from '../../../models/IProduct';

@Component({
    selector: 'app-main-content',
    templateUrl: './main-content.component.html',
    styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent {
    products: IProduct[] = [];

    pageSize = 12;
    currentPage = 1;

    getCurrentPageProducts() {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        return this.products.slice(startIndex, startIndex + this.pageSize);
    }

    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
    }

    nextPage() {
        if (this.currentPage < this.getTotalPages()) {
            this.currentPage++;
        }
    }

    getTotalPages() {
        return Math.ceil(this.products.length / this.pageSize);
    }
    constructor() {
        this.populateTestData();
    }

    private getRandomStatus(): ProductStatus {
        const statusValues = Object.values(ProductStatus);
        const randomIndex = Math.floor(Math.random() * statusValues.length);
        return statusValues[randomIndex] as ProductStatus;
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
                status: this.getRandomStatus(),
                endDate: new Date(`2022-12-${i}`),
                sellerEmail: `seller${i}@example.com`,
                winnerEmail: i % 2 === 0 ? `winner${i}@example.com` : null,
            };

            this.products.push(product);
        }
    }

    protected readonly ProductStatus = ProductStatus;
}
