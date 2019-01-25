import { Injectable } from '@angular/core';
import {
    CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot,
    CanActivateChild, NavigationExtras, CanLoad, Route
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        let url: string = state.url;
        return this.checkLogin(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return this.canActivate(route, state);
    }

    canLoad(route: Route): Promise<boolean> {
        let url = `/${route.path}`;
        return this.checkLogin(url);
    }

    checkLogin(url: string): Promise<boolean> {
        return Promise.resolve(this.authService.isUserLoggedIn());
    }
}
