import { Injectable } from '@angular/core';
import {HttpService} from "@core/services/http.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {IProductFilter} from "../../models/IProductFilter";
import {IFilterResponse} from "../../models/IFilterResponse";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  controllerUrl: string;
  constructor(
    private httpService: HttpService,
    private jwtHelper: JwtHelperService,
  ) {
    this.controllerUrl = 'api/product';
  }

  get(filterProduct: IProductFilter): Observable<IFilterResponse>{
    return this.httpService.post<IFilterResponse>(`${this.controllerUrl}/get`, filterProduct);
  }

  getOne(id: string) {
    return this.httpService.get(`${this.controllerUrl}/${id}`);
  }
}
