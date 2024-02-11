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
import { Observable, tap } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(
        private authService: AuthService,
        private router: Router,
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authService.isAuthenticated().pipe(
            tap((isAuthenticated) => {
                if (!isAuthenticated) {
                    this.router.navigate(['/auth']);
                }
            }),
        );
    }

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.canActivate(childRoute, state);
    }
}
