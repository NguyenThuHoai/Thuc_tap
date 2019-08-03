import { Component, OnInit,Input } from '@angular/core';
import {FormControl,Validators,FormGroup, FormBuilder} from '@angular/forms';
import {AdminService} from '../Admin.service';
@Component({
  selector: 'app-edit-dept',
  templateUrl: './edit-dept.component.html',
  styleUrls: ['./edit-dept.component.css']
})
export class EditDeptComponent implements OnInit {
  @Input() id;
  EditForm:FormGroup;
  submitted= false;
  deptInfo=[];
  constructor(
    private FormBuilder: FormBuilder,
    private service:AdminService
  ) { }

  ngOnInit() {
    console.log(this.id);
    this.service.getDept(this.id).subscribe(
      data =>{
        this.deptInfo = data;
        console.log(this.deptInfo);
        this.EditForm =new FormGroup({
          department_name:new FormControl(this.deptInfo[0].department_name,Validators.required),
          address:new FormControl(this.deptInfo[0].address,Validators.required)
        })
      }
    )
  }

  get f(){
    return this.EditForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    if(this.EditForm.invalid){
      return;
    }
    this.service.editDept(this.id,this.EditForm.value).subscribe(
      data => {
        console.log(data);
      }
    )
    this.EditForm.reset();
    location.reload();
  }
}
