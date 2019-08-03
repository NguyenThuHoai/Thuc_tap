import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { staff} from '../Model/staff';
import { dept } from '../Model/dept';
import {LoginService} from '../Dang_nhap/login.service';

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  private staffURL = "http://localhost:3000/staffs";
  private deptURL="http://localhost:3000/depts";
  private editdeptURL="http://localhost:3000/depts";
  private editstaffURL="http://localhost:3000/staffs/edit";
  private listStaffURL = "http://localhost:3000/staffs/persons/depts";
  private accuracyURL = "http://localhost:3000/staffs/accuracy";
  private resetURL ="http://localhost:3000/staffs/resetAcc/";
  private findManagerURL ="http://localhost:3000/staffs/manager";
  private updateURL = "http://localhost:3000/staffs/updateManager/";
  private resetPassURL= "http://localhost:3000/admins/reset";
  private resetAdURL = "http://localhost:3000/admins/resetpass";
  constructor(
    private http:HttpClient,
    private auth:LoginService,
  ) {
   
   }
  listStaff(): Observable<staff[]> {
    let token = JSON.parse(this.auth.currentUser).token;
    let HttpOptions ={
      headers:new HttpHeaders({'Authorization':'Bearer ' + token})
    };
    console.log();
    
    return this.http.get<staff[]>(this.staffURL, HttpOptions).pipe(
        tap(),
        catchError(error =>of([]))
    );
}

  listDept():Observable<dept[]>{
      return this.http.get<dept[]>(this.deptURL).pipe(
        tap(),
        catchError(error =>of([])
        )
      );
  }
  getDept(id){
    const url = `${this.deptURL}/${id}`; 
    return  this.http.get(url).pipe(
      tap(),
      catchError(error => of(null))
    )
  }
  getStaff(id){
    let token = JSON.parse(this.auth.currentUser).token;
    let HttpOptions ={
      headers:new HttpHeaders({'Authorization':'Bearer ' + token})
    };
    const url = `${this.staffURL}/${id}`; 
    return  this.http.get(url,HttpOptions).pipe(
      tap(),
      catchError(error => of(null))
    )
  }
  addStaff(staff):Observable<staff[]>{
    return this.http.post<staff[]>(this.staffURL,staff).pipe(
      catchError(error => of(new staff()))
    );
  }

  addDept(dept):Observable<any>{
    return this.http.post<any>(this.deptURL,dept).pipe(
      tap(),
      catchError(error => of([]))
    )
  }

  editDept(id,data){
    const url = `${this.editdeptURL}/${id}`; 
    return this.http.put(url,data).pipe(
      tap(),
      catchError(error => of([]))
    )
  }

  editStaff(id,data){
    const url = `${this.editstaffURL}/${id}`; 
    return this.http.put(url,data).pipe(
      tap(),
      catchError(error => of(null))
    )
  }
  delDept(id):Observable<any>{
    const url = `${this.deptURL}/${id}`; 
  return this.http.delete(url)
    .pipe(
      tap(),
      catchError(error => of(null))
    );
  }

  delStaff(id):Observable<any>{
      const url = `${this.staffURL}/${id}`;
      return this.http.delete(url).pipe(
        tap(),
        catchError(error =>of(null))
      );
  }
  listStaffInDept(id:number){
    const url = `${this.listStaffURL}/${id}`;
    return this.http.get(url).pipe(
      tap(),
      catchError(error => of(null))
    );
  }
  accuracyAcc(email:string, password:string){
    return this.http.post<any>(this.accuracyURL,{email:email,password:password}).pipe(map(user=>{
    return user;
    }));
  }
  resetPass(id:number,password:string){
    return this.http.put(this.resetURL,{id:id,password:password}).pipe(
      tap(),
      catchError(error =>of(null))
    )
}
  findManager(id:number){
    const url = `${this.findManagerURL}/${id}`;
    return this.http.get(url).pipe(
      tap(),
      catchError(error => of(null))
    )
  }
  updateManager(id:number){
    return this.http.put(this.updateURL,{id:id}).pipe(
      tap(),
      catchError(error => of(null))
    )
  }
  
  resetAcc(data){
    let token = JSON.parse(this.auth.currentUser).token;
    let HttpOptions ={
      headers:new HttpHeaders({'Authorization':'Bearer ' + token})
    };
    
    return this.http.post(this.resetPassURL,data,HttpOptions).pipe(
      tap(),
      catchError(error =>of(null))
    )
   }
   resetAccAd(username,password){
    let token = JSON.parse(this.auth.currentUser).token;
    let HttpOptions ={
      headers:new HttpHeaders({'Authorization':'Bearer ' + token})
    };
    return this.http.put(this.resetAdURL,{username:username,password:password},HttpOptions).pipe(
      tap(),
      catchError(error =>of(null))
    )
   }
}
