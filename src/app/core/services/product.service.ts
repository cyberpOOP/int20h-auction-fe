import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ICreateProductDto, IProductFilter } from '../../models/IProductFilter';
import { IFilterResponse } from '../../models/IFilterResponse';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    controllerUrl: string;
    constructor(
        private httpService: HttpService,
        private jwtHelper: JwtHelperService,
    ) {
        this.controllerUrl = 'api/product';
    }

    get(filterProduct: IProductFilter): Observable<IFilterResponse> {
        return this.httpService.post<IFilterResponse>(`${this.controllerUrl}/get`, filterProduct);
    }

    getOne(id: string) {
        return this.httpService.get(`${this.controllerUrl}/${id}`);
    }

    createProduct(productDto: ICreateProductDto) {
        return this.httpService.post(`${this.controllerUrl}`, productDto);
    }

    editProduct(productDto: ICreateProductDto, id: string) {
        return this.httpService.put(`${this.controllerUrl}/${id}`, productDto);
    }

    deleteProduct(id: string) {
        return this.httpService.delete(`${this.controllerUrl}`, id);
    }
}
