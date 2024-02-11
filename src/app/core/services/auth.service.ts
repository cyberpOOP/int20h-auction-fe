import { Injectable } from '@angular/core';
// import {
//   ISignInUser,
//   ISignUpUser,
//   IUserResponse,
// } from '@shared/models/user/user';
import { Observable, map } from 'rxjs';
import { HttpService } from './http.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUser } from '../../models/IUser';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    controllerUrl: string;

    constructor(
        private httpService: HttpService,
        private jwtHelper: JwtHelperService,
    ) {
        this.controllerUrl = 'api/auth';
    }

    public getUserId(): string {
        const token = localStorage.getItem('accessToken');

        if (token && !this.jwtHelper.isTokenExpired(token)) {
            const decodedToken = this.jwtHelper.decodeToken(token);
            if (decodedToken && decodedToken.id) {
                return decodedToken.id;
            }
        }

        return '';
    }

    public isAuthenticated(): boolean {
        const token = localStorage.getItem('accessToken');

        return !this.jwtHelper.isTokenExpired(token);
    }

    signUp(user: IUser) {
        return this.httpService.post(`${this.controllerUrl}/sign-up`, user);
    }

    signIn(user: IUser) {
        return this.httpService.post(`${this.controllerUrl}/sign-in`, user);
    }

    refresh() {
        return this.httpService.post(`${this.controllerUrl}/refresh`, null);
    }

    logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
    }
}
