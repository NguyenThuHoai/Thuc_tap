import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute} from '@angular/router';
import { first} from 'rxjs/operators';

import {LoginService} from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormAd:FormGroup;
  loginFormSt:FormGroup;
  submitted=false;
  loading = false;
  returnAdURL:string;
  returnURL:string;
  title = "Nhân viên";
  chooseStffLog = true;
  chooseAdLog = false;

  constructor(
    private FormBuilder:FormBuilder,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router:Router

  ) { }

  ngOnInit() {
      this.loginFormAd=this.FormBuilder.group({
        userName:['',Validators.required],
        password:['',Validators.required]
      });
      this.loginFormSt=this.FormBuilder.group({
        email:['',[Validators.required,Validators.email]],
        password:['',Validators.required]
      });

      this.loginService.logoutAd();
      this.loginService.logoutSt();
      //this.returnAdURL = this.route.snapshot.queryParams['returnUrl'] || 'admin';
      this.returnURL = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f(){
    return this.loginFormAd.controls;
  }
  get func(){
      return this.loginFormSt.controls;
  }

  adminLog(){
    this.chooseAdLog = true;
    this.chooseStffLog = false;
  }
  staffLog(){
    this.chooseAdLog = false;
    this.chooseStffLog = true;
  }

  onSubmitAd(){
    this.submitted=true;
    if(this.loginFormAd.invalid){
      return;
    }
    this.loading=true;
    this.loginService.adminLogin(this.f.userName.value,this.f.password.value).pipe(first()).subscribe(
        data =>{
          console.log(this.loginService.currentUser);
          
          this.router.navigate(['/admin']);    
        },
        error =>{
          this.loading=false;
        },
    );
    
  }
  onSubmitSt(){
    this.submitted=true;
    
    if(this.loginFormSt.invalid){
      return;
    }
    this.loading=true;
    this.loginService.staffLogin(this.func.email.value,this.func.password.value).pipe(first()).subscribe(
      data =>{
         this.router.navigate([this.returnURL]);
      },
      error =>{
        this.loading=false;
      });

  }
}
