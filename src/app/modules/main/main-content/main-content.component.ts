import { Component } from '@angular/core';
import {IProduct} from "../../../models/IProduct";

@Component({
    selector: 'app-main-content',
    templateUrl: './main-content.component.html',
    styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent {
  products: IProduct[]  = []

}
