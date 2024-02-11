import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { IUser } from '../../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  controllerUrl: string;

  constructor(private httpService: HttpService) {
    this.controllerUrl = 'api/user';
  }

  updateProfile(user: IUser) {
    return this.httpService.put(`${this.controllerUrl}`, user);
  }

  deleteProfile() {
    return this.httpService.deleteNoBody(`${this.controllerUrl}`);
  }
}