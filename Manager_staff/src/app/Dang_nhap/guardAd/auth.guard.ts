import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthAdGuard implements CanActivate {

	constructor(private router: Router) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		console.log(localStorage.getItem('admin'));

		if (localStorage.getItem('admin')) {
			if (JSON.parse(localStorage.getItem('admin')).flag) {
				return true;
			}
			else {
				this.router.navigate(['/reset-acc'], { queryParams: { returnUrl: state.url } });
				return false;
			}
		}
		// not logged in so redirect to login page with the return url
		this.router.navigate(['/login'], { queryParams: { returnAdUrl: state.url } });
		return false;
	}
}
