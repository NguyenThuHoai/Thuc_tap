import { Component, OnInit } from '@angular/core';
import {Input} from '@angular/core';

import {AdminService} from '../Admin.service';
import {staff} from '../../Model/staff';
import { ExportService} from '../Export_file/export.service';

@Component({
  selector: 'app-list-staff',
  templateUrl: './list-staff.component.html',
  styleUrls: ['./list-staff.component.css']
})
export class ListStaffComponent implements OnInit {
 @Input() value;
 Staffs:staff[] =[];
 conFirm;
 reset;
  constructor(
    private service: AdminService,
    private exportService: ExportService
  ) {     
  }

  ngOnInit() {
    console.log(this.value);
    this.service.listStaffInDept(this.value).subscribe(
      data =>{
          this.Staffs = data;
          console.log(this.Staffs);
      }
    )
  }
  delStaff(id){
    this.conFirm = confirm("Xóa nhân viên");
    
    if(this.conFirm){
      return this.service.delStaff(id).subscribe(
        data =>{
          alert("Xóa thành công");
          this.reset = function(){
            this.service.listStaffInDept(this.value).subscribe(
              data =>{
                this.Staffs = data;
              },)
              this.service.listStaff().subscribe(data => this.staffs=data,
                error=>console.log(error),
                );
      
                this.service.listDept().subscribe(data => this.depts=data,
                  error=>console.log(error),
                  );
            ;
            
          }
          this.reset();
        }
      )
    }
  }
  export(){
    this.exportService.exportExcel(this.Staffs,'Staffs');
  }
}
