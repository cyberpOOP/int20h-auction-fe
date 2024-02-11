import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { Observable } from 'rxjs';
import { IResponse, ResponseStatus } from 'src/app/models/IResponse';
import { IAccessToken } from 'src/app/models/IUser';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(
        private authService: AuthService,
        private router: Router,
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.authService.isAuthenticated()) {
            this.authService.refresh().subscribe((res) => {
                if ((res as IResponse<IAccessToken>).status == ResponseStatus.Error) {
                    this.router.navigate(['/auth']);
                    this.authService.logout();
                }
                localStorage.setItem('accessToken', (res as IResponse<IAccessToken>).value?.accessToken || '');
            });
            return false;
        }

        return true;
    }

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.canActivate(childRoute, state);
    }
}
