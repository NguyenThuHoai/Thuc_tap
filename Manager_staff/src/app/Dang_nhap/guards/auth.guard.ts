import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            if(JSON.parse(localStorage.getItem('currentUser')).flag){
                return true;

            }
            else{
                this.router.navigate(['/reset-pass'], { queryParams: {returnUrl:state.url}});
                return false;
            }
            // logged in so return true
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: {returnUrl:state.url}});
        return false;
    }
}
