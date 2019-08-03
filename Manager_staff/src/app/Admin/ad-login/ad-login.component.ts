import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Validators,FormBuilder,FormGroup} from '@angular/forms';

import {LoginService} from '../../Dang_nhap/login.service';
import {AdminService} from '../Admin.service';

@Component({
  selector: 'app-ad-login',
  templateUrl: './ad-login.component.html',
  styleUrls: ['./ad-login.component.css']
})
export class AdLoginComponent implements OnInit {
  admin;
  ResetForm :FormGroup;
  submitted= false;
  constructor(private service: AdminService,
    private router: Router,
    private logout: LoginService,
    private FormBuilder: FormBuilder,
    ) {
    this.admin = JSON.parse(localStorage.getItem('admin'));

   }

  ngOnInit() {
      this.ResetForm= this.FormBuilder.group({
        username:['',Validators.required],
        password:['',Validators.required],
      })
    }

  get f(){
    return this.ResetForm.controls;
  }
  onSubmit(){
    console.log(this.ResetForm.value);
    this.submitted = true;
    if(this.ResetForm.invalid){
      return;
    }
    this.service.resetAccAd(this.ResetForm.value.username,this.ResetForm.value.password).subscribe(
      data =>{
        if(data && data.msg=='successfully'){
          alert("Đổi mật khẩu thành công!");
          this.logout.logoutAd();
          this.submitted = false;
          this.router.navigate(['/login']);
        }
      }
    )
  }


}
