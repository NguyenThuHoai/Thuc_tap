import { Component, OnInit,Input } from '@angular/core';
import { first} from 'rxjs/operators';

import {ClientService} from '../client.service';
import {staff} from '../../Model/staff';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  @Input() value;
  old_pass = '';
  new_pass ='';
  constructor(private service: ClientService) { }
  ngOnInit() {
    
    this.value;
    return this.service.getStaff(this.value).subscribe(data =>{
      this.user = data;
    })
  }

  onSubmit(){
        this.service.accuracy(this.value,this.old_pass).pipe(first()).subscribe(
            data => {
                this.service.resetPass(this.new_pass).subscribe(
                    data =>{
                        alert("Đổi mật khẩu thành công!");
                    },
                    error =>{
                        alert("Error");
                    }
                )
            },
            error =>{
                alert ("Tài khoản chưa đúng!");
            }
            
        )
        this.old_pass ='';
        this.new_pass='';
      
  }


}
