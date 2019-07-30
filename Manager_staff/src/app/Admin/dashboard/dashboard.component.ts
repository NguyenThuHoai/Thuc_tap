import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import {staff} from '../../Model/staff';
import { dept } from '../../Model/dept';
import { admin} from '../../Model/Admin';
import {AdminService } from '../../Admin/Admin.service';

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
  admin: admin[];

  constructor(
    private router:Router,
    private service:AdminService,
  ) {
      //this.admin = JSON.parse(localStorage.getItem('admin'));
   }

  ngOnInit() {
      this.getStaff();
      this.getDept();
  }

  logout(){
      this.router.navigate(['/login']);
  }

  list_staff(){
    this.chooseDepartment=false;
    this.chooseStaff=true;
  }

  list_department(){
    this.chooseDepartment=true;
    this.chooseStaff=false;  
  }
  
  delDept(id){
    console.log(id);
    this.conFirm= confirm("Are you delete department?");
    if(this.conFirm){
      this.service.delDept(id).subscribe();
    };
    location.reload();
  }

  delStaff(id){
    this.conFirm= confirm("Are you delete staff?");
    if(this.conFirm){
      this.service.delStaff(id).subscribe();
    };
    location.reload();
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

 editStaff(staffInfo){
  this.router.navigate(['/addStaff']);
  console.log(staffInfo);
 }
}
