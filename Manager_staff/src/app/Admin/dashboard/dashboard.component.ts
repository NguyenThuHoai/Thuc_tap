import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { AdminService} from '../Admin.service';
import {staff} from '../../Model/staff';
import { dept } from '../../Model/dept';

@Component({
  selector: 'app-root-account',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  conFirm: boolean;
  chooseStaff:boolean=true;
  chooseDepartment:boolean;
  staffs:staff[];
  depts:dept[];

  constructor(
    private router:Router,
    private service:AdminService
  ) { }

  ngOnInit() {
      this.getStaff();
      this.getDept();
  }

  logout(){
      this.router.navigate(['/logout']);
  }

  list_staff(){
    this.chooseDepartment=false;
    this.chooseStaff=true;
  }

  list_department(){
    this.chooseDepartment=true;
    this.chooseStaff=false;  
  }
  
  getStaff(){
     return this.service.listStaff().subscribe(data => this.staffs=data,
      error=>console.log(error),
      );
  }

  getDept(){
    return this.service.listDept().subscribe(data => this.depts=data,
          error=>console.log(error),
          );
  }
  delDept(id){
    this.conFirm= confirm("Are you delete department?");
    if(this.conFirm){
    return this.service.delDept(id).subscribe();
    location.reload();
    }
  }

}
