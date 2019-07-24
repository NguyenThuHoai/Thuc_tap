import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { staff} from '../Model/staff';
import { dept } from '../Model/dept';

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

  addStaff(staff):Observable<any>{
    return this.http.post<any>(this.staffURL,staff).pipe(
      tap(),
      catchError(error=>of([]))
    );
  }

  addDept(dept):Observable<any>{
    return this.http.post<any>(this.deptURL,dept).pipe(
      tap(),
      catchError(error => of([]))
    )
  }
  delDept(id){
    return this.http.delete(this.staffURL,id).pipe(
      tap(),
      catchError(error => of([]))
    )

  }

  getAdmin(){

  }
}
