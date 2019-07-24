import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';

import {AdminService} from '../Admin.service';
import { dept } from '../../Model/dept';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
  AddForm:FormGroup;
  dept:dept[];
  submitted=false;
  constructor(
    private formBuilder:FormBuilder,
    private service:AdminService,
    private router:Router
  ) {}
  ngOnInit() {
    this.AddForm=this.formBuilder.group({
      department_name:['',Validators.required],
      address:['',Validators.required],
      manager:['',Validators.required]
    }
    );
    
  }
  get f(){
      return this.AddForm.controls;
  }
  onSubmit(){
    this.submitted=true;
    if(this.AddForm.invalid){
      return;
    }
    this.service.addDept(this.AddForm.value).subscribe(data => this.dept.push(data));
      console.log(this.dept);
      //console.log(this.AddForm.value);
      this.submitted=false;
      this.AddForm.reset();
      this.router.navigate(['/']);  
      //location.reload();
  }

}
