import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  submitted=false;
  constructor(
    private FormBuilder:FormBuilder
  ) { }

  ngOnInit() {
      this.loginForm=this.FormBuilder.group({
        userName:['',Validators.required],
        password:['',Validators.required]
      });
  }
  get f(){
    return this.loginForm.controls;
  }
  onSubmit(){
    this.submitted=true;
    if(this.loginForm.invalid){
      return;
    }
    this.loginForm.reset();
    this.submitted=false;
  }

}
