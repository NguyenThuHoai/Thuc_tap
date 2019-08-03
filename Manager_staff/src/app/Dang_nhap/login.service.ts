import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/Operators';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    public AdminUrl = "http://localhost:3000/admins/login";
    public StaffURL = "http://localhost:3000/staffs/login";
    constructor(
        private http: HttpClient,
        private router: Router
    ) { }
    adminLogin(username: string, password: string) {
        return this.http.post<any>(this.AdminUrl, { user_name: username, password: password
         }).pipe(map(user => {
            if (user && user.token) {                
                localStorage.setItem('admin', JSON.stringify(user));
            }
            return user;
        }))
    }

    public get currentUser(){
        if(localStorage.getItem('admin') !=''){
            return localStorage.getItem('admin');
        }
        return localStorage.getItem('currentUser');
    }

    logoutAd() {
        localStorage.removeItem('admin');
    }
    
    staffLogin(email:string, password:string){
        return this.http.post<any>(this.StaffURL, {email:email, password:password}).pipe(map(user =>{
            if(user && user.token ){
                localStorage.setItem('currentUser',JSON.stringify(user));
            }
            return user;
        }));
    }
    logoutSt(){
        localStorage.removeItem('currentUser');
    }
}
