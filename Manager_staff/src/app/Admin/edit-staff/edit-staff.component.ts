import { Component, OnInit } from '@angular/core';
import {FormControl,Validators,FormBuilder, FormGroup} from '@angular/forms';
import {AdminService} from '../Admin.service';
import {Input} from '@angular/core';

@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.component.html',
  styleUrls: ['./edit-staff.component.css']
})
export class EditStaffComponent implements OnInit {
    EditForm:FormGroup;
    submitted=false;
    conFirm: boolean;
    user;
    depts =[];
    @Input() idstaff;
  constructor(
      private service: AdminService,
      private FormBuilder:FormBuilder
  ) { }

  ngOnInit() {
    // this.EditForm=this.FormBuilder.group({
    //   full_name:['',Validators.required],          
    //   gender:['',Validators.required],
    //   address:['',Validators.required],
    //   email:['',Validators.required],
    //   birthday:['',Validators.required],
    //   grade:['',Validators.required],
    //   id_department:['',Validators.required],
    // })
    this.service.listDept().subscribe(
      data =>{
          this.depts =data;
      }
    )
    this.service.getStaff(this.idstaff).subscribe(
      data => {
        this.user = data;
        //username
        this.EditForm=this.FormBuilder.group({
          full_name:[this.user[0].full_name,Validators.required],          
          gender:[this.user[0].gender,Validators.required],
          address:[this.user[0].address,Validators.required],
          email:[this.user[0].email,Validators.required],
          birthday:[this.user[0].birthday,Validators.required],
          grade:[this.user[0].grade,Validators.required],
          id_department:[this.user[0].id_department,Validators.required],
        })
    }
    )}
  get f(){
    return this.EditForm.controls;
  }
  onSubmit(){
      this.submitted = true;
      if(this.EditForm.invalid){
        return;
      }
      if(this.EditForm.value.grade=="Manager"){
        console.log("manager");
          this.service.findManager(this.EditForm.value.id_department).subscribe(
            data =>{
              if(data){
              console.log(data);
              this.service.updateManager(data.id).subscribe(
                data => {
                  if(data&&data.msg=='successfully'){
                    this.conFirm =confirm("Bộ phận này đã có quản lí. Bạn có muốn tiếp tục? ");
                    if(this.conFirm){
                    this.service.editStaff(this.idstaff,this.EditForm.value).subscribe(data => {
                      console.log("OK");
                      location.reload();
                      
                    });
                    
                    console.log(this.EditForm.value);
                    this.submitted=false;
                    location.reload();
                  }
                }
                }
              )
            }
          else{
            this.service.editStaff(this.idstaff,this.EditForm.value).subscribe(data => {
              console.log("ok");
              
            });
              this.submitted=false;
              
              location.reload();
  
          }},
          )
          this.submitted = false;
      }else{
      this.service.editStaff(this.idstaff,this.EditForm.value).subscribe(data => {
        console.log("OK");
        
      });
        console.log(this.EditForm.value);
        this.submitted=false;
        
        location.reload();
  
      }
    }
  }

