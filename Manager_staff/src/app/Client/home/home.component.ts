import { Component, OnInit } from '@angular/core';
//import { ClientService } from '../client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   currentUser;
   chooseInfo = false;
   chooseAccount = false;
   constructor(
      //private service: ClientService,
      private router: Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

  ngOnInit() {

  }
  
  logout(){
    this.router.navigate(['/login']);
}
showInfo(){
  this.chooseInfo = true;
  this.chooseAccount = false;
}
Account(){
  this.chooseAccount = true;
  this.chooseInfo = false;
}
}
