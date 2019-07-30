import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoginService} from './Dang_nhap/login.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './Client/home/home.component';
import {DashboardComponent} from './Admin/dashboard/dashboard.component';
import { AddStaffComponent } from './Admin/add-staff/add-staff.component';
import { AddDepartmentComponent } from './Admin/add-department/add-department.component';
import { LoginComponent } from '../app/Dang_nhap/login/login.component';
import {AuthGuard} from './Dang_nhap/guards/auth.guard';
import { StaffInfoComponent } from './client/staff-info/staff-info.component';
import { AccountComponent } from './client/account/account.component';
import {AuthAdGuard} from './Dang_nhap/guardAd/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    AddStaffComponent,
    AddDepartmentComponent,
    LoginComponent,
    StaffInfoComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path:'', component:HomeComponent ,canActivate:[AuthGuard]},
      { path: 'addStaff', component:AddStaffComponent},
      { path: 'addDept', component:AddDepartmentComponent},
      { path:'login', component:LoginComponent},
      { path: 'admin', component: DashboardComponent,canActivate:[AuthAdGuard]},
      { path: 'staffInfo', component:StaffInfoComponent },
      { path: '**', redirectTo: '' },

    ])
  ],
  providers: [
    AuthGuard,
    AuthAdGuard,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
