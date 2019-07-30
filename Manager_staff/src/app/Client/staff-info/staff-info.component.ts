import { Component, OnInit } from '@angular/core';
import { Input} from '@angular/core';
import {ClientService} from '../client.service';
import {staff} from '../../Model/staff';

@Component({
  selector: 'app-staff-info',
  templateUrl: './staff-info.component.html',
  styleUrls: ['./staff-info.component.css']
})
export class StaffInfoComponent implements OnInit {
  @Input() value;
  user:staff;
  constructor(private service: ClientService) { }

  ngOnInit() {
    return this.service.getStaff(this.value).subscribe(data =>{
      this.user = data;
    })
  }
  }
