import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable,of} from 'rxjs';
import { catchError, map,tap } from 'rxjs/operators';

const HttpOptions ={
  headers:new HttpHeaders({'Content-Type':'application/json'})
};

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
  public findURL = "http://localhost:3000/staffs/find";
  public staffURL = "http://localhost:3000/staffs/accuracy";
  public resetURL ="http://localhost:3000/staffs/resetAcc";

  getStaff(email:string): Observable<any> {
      return this.http.post(this.findURL,{email:email}).pipe(
        tap(),
        catchError(error =>of(null))
      );
  }
  accuracy(email:string, password:string){
    return this.http.post<any>(this.staffURL,{email:email,password:password}).pipe(map(user=>{
    return user;
    }));
  }

  resetPass(password:string){
      return this.http.put<any>(this.resetURL,{password:password}).pipe(
        tap(),
        catchError(error =>of(null))
      )

  }
}

