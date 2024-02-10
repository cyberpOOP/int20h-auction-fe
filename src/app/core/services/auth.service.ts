import { Injectable } from '@angular/core';
// import {
//   ISignInUser,
//   ISignUpUser,
//   IUserResponse,
// } from '@shared/models/user/user';
import { Observable, map } from 'rxjs';
import { HttpService } from './http.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    public routePrefix = '/user';

    constructor(
        private httpService: HttpService,
        private jwtHelper: JwtHelperService,
    ) {}

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

    //   signUp(user: ISignUpUser): Observable<IUserResponse> {
    //     return this.httpService
    //       .post<IUserResponse>(`${this.routePrefix}/signup`, user)
    //       .pipe(
    //         map((response) => {
    //           const accessToken = response.accessToken;
    //           localStorage.setItem('accessToken', String(accessToken));
    //           return response;
    //         })
    //       );
    //   }

    //   signIn(user: ISignInUser): Observable<IUserResponse> {
    //     return this.httpService
    //       .post<IUserResponse>(`${this.routePrefix}/login`, user)
    //       .pipe(
    //         map((response) => {
    //           const accessToken = response.accessToken;
    //           localStorage.setItem('accessToken', String(accessToken));
    //           return response;
    //         })
    //       );
    //   }

    logout() {
        localStorage.removeItem('accessToken');
    }
}
