import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable,of} from 'rxjs';
import { catchError, map,tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  currentUser ;
  constructor(
    private http: HttpClient
  ) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  private findURL = "http://localhost:3000/staffs/find";
  private accuracyURL = "http://localhost:3000/staffs/accuracy";
  private resetURL ="http://localhost:3000/staffs/resetAcc/";
  private editURL ="http://localhost:3000/staffs/edit";
  private getStaffURL ="http://localhost:3000/staffs/depts";
  
  getStaff(email:string): Observable<any> {
      return this.http.post<any>(this.findURL,{email:email}).pipe(
        tap(),
        catchError(error =>of(null))
      );
  }
  accuracy(email:string, password:string){
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
  resetInfo(id,user){
    const url = `${this.editURL}/${id}`;
      return this.http.put(url,user).pipe(
        tap(),
        catchError(error => of(null))
      )
  }
  listStaffonDepts(id:number){
    const url = `${this.getStaffURL}/${id}`;
    return this.http.get(url).pipe(
      tap(),
      catchError(error => of(null))
    )
  }
}

