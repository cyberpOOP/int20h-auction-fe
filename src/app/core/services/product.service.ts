import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    controllerUrl: string;

    constructor(private httpService: HttpService) {
        this.controllerUrl = 'api/product';
    }

    getOne(id: string) {
        return this.httpService.get(`${this.controllerUrl}/${id}`);
    }
}
