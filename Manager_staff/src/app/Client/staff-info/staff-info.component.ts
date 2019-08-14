import { Component, OnInit } from '@angular/core';
import { Input} from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';

import { ClientService } from '../client.service';
import {staff} from '../../Model/staff';

@Component({
  selector: 'app-staff-info',
  templateUrl: './staff-info.component.html',
  styleUrls: ['./staff-info.component.css']
})
export class StaffInfoComponent implements OnInit {
  @Input() value;
  editForm:FormGroup;
  user;
  users :staff[]=[];
  id: number;
  resetForm;
  userInfo={
    fullName:'', 
    email:'',
    address:'',
    gender:'',
    birthday:Date,
    grade:'',
    id_department:0,
  }
  show = true;
  submitted=false;
  constructor(private service: ClientService,
    private formBuilder:FormBuilder) { 
    }

  ngOnInit() {
    this.service.getStaff(this.value).subscribe(data =>{
      this.user=data;
      console.log(this.user);
      
      if(this.user.grade == "Manager"){
         this.service.listStaffonDepts(this.user.id_department).subscribe(
          data =>{
            this.users=data;
            console.log(this.users);
          }
        )
        }  
      this.editForm = this.formBuilder.group({
        full_name: [this.user.full_name,Validators.required],
        gender: [this.user.gender,Validators.required],
        address:[this.user.address,Validators.required],
        birthday: [this.user.birthday,Validators.required],
      });
    });
  }
  get f(){
    return this.editForm.controls;
}
  editInfo(){
      this.show = false;
  }
  
  onSubmit(){
    console.log(this.user);

    this.submitted = true;
    if(this.editForm.invalid){
      return;
    }
    this.userInfo.fullName = this.editForm.value.full_name;
    this.userInfo.email = this.user.email;
    this.userInfo.address = this.editForm.value.address;
    this.userInfo.gender = this.editForm.value.gender;
    this.userInfo.birthday = this.editForm.value.birthday;
    this.userInfo.grade = this.user.grade;
    this.userInfo.id_department = this.user.id_department;
    this.service.resetInfo(this.user.id,this.userInfo).subscribe(
      data => {
        console.log(data);
        if(data&&data.msg=='successfully'){
          this.resetForm = function resetForm() {
            this.service.getStaff(this.value).subscribe(data =>{
              this.user=data;
              this.editForm = this.formBuilder.group({
                full_name: [this.user.full_name,Validators.required],
                gender: [this.user.gender,Validators.required],
                address:[this.user.address,Validators.required],
                birthday: [this.user.birthday,Validators.required],
              });
            });
          }
          this.resetForm() ;
        alert("Sửa thông tin thành công");
        this.show=true;

      }
      else{
        alert ("Error");
      }
    },
      error => {
        alert ("Error");
      },
    )
    this.submitted = false;
  }
  }
