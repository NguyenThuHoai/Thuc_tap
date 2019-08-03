import { Component, OnInit,Input } from '@angular/core';
import { first} from 'rxjs/operators';

import {ClientService} from '../client.service';
import {Router} from '@angular/router';
import {staff} from '../../Model/staff';
import {LoginService} from '../../Dang_nhap/login.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  @Input() value;
  user ;
  old_pass = '';
  new_pass ='';
  currentUser;
  correct :boolean;
  constructor(private service: ClientService,
    private logout: LoginService,
    private router: Router
    ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

   }
  ngOnInit() {
   
  }
  onSubmit(){
    console.log(this.new_pass);
        this.service.accuracy(this.currentUser.email,this.old_pass).pipe(first()).subscribe(
            data => {
              console.log(data);
              
              this.service.resetPass(data.id,this.new_pass).subscribe(
                data =>{
                    alert("Đổi mật khẩu thành công!");
                    this.logout.logoutSt();
                    this.router.navigate(['/login']);
                    this.old_pass= '';
                    this.new_pass = '';
                },
                error =>{
                    alert("Error");
                }
              )
            },
            error =>{
                alert ("Tài khoản chưa đúng!");
            }
        );
          
  }


}
