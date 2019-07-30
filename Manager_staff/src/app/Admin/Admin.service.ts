import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { staff} from '../Model/staff';
import { dept } from '../Model/dept';

const HttpOptions ={
  headers:new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  public staffURL = "http://localhost:3000/staffs";
  public deptURL="http://localhost:3000/depts";
  constructor(
    private http:HttpClient
  ) { }
  listStaff(): Observable<staff[]> {
    return this.http.get<staff[]>(this.staffURL).pipe(
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

  addStaff(staff):Observable<staff[]>{
    return this.http.post<staff[]>(this.staffURL,staff,HttpOptions).pipe(
      catchError(error => of(new staff()))
    );
  }

  addDept(dept):Observable<any>{
    return this.http.post<any>(this.deptURL,dept).pipe(
      tap(),
      catchError(error => of([]))
    )
  }

  delDept(id):Observable<any>{
    const url = `${this.deptURL}/${id}`; 
  return this.http.delete(url, HttpOptions)
    .pipe(
      tap(),
      catchError(error => of(null))
    );
  }

  delStaff(id):Observable<any>{
      const url = `${this.staffURL}/${id}`;
      return this.http.delete(url,HttpOptions).pipe(
        tap(),
        catchError(error =>of(null))
      );
  }

  getAdmin(){

  }
}
