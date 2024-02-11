import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { ICreateBid } from 'src/app/models/IBid';

@Injectable({
    providedIn: 'root',
})
export class BidService {
    controllerUrl: string;

    constructor(private httpService: HttpService) {
        this.controllerUrl = 'api/bid';
    }

    placeABid(bid: ICreateBid) {
        return this.httpService.post(`${this.controllerUrl}`, bid);
    }
}
