import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {staff} from '../../Model/staff';
import {AdminService} from '../Admin.service';
import { dept } from '../../Model/dept';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.css']
})
export class AddStaffComponent implements OnInit {
  //@Input() staff:staff;
  staffs=[];
  depts:dept[];

  AddForm:FormGroup;
  submitted=false;
  constructor(
    private formBuilder:FormBuilder,
    private service:AdminService,
    private router:Router
  ) {}
  ngOnInit() {
    this.getDept();
//full_name, password,email, address,gender,birthday,grade,id_department
    this.AddForm=this.formBuilder.group({
      full_name:['',Validators.required],
      password:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      address:['',Validators.required],
      gender:['Male'],
      birthday:['',Validators.required],
      grade:['Nhân viên',Validators.required],
      id_department:['',Validators.required],
    }
    );
  }
  get f(){
      return this.AddForm.controls;
  }

  goBack(){
    this.router.navigate(['/admin']);  

  }

  getDept(){
    return this.service.listDept().subscribe(data => this.depts=data,
          error=>console.log(error),
          );
  }

  onSubmit(){
    this.submitted=true;
    if(this.AddForm.invalid){
      return;
    }
    this.service.addStaff(this.AddForm.value).subscribe(data => this.staffs.push(data));
      console.log(this.AddForm.value);
      this.submitted=false;
      this.AddForm.reset();
  }
}
