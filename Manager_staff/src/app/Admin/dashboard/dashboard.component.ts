import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { staff } from '../../Model/staff';
import { dept } from '../../Model/dept';
import { AdminService } from '../../Admin/Admin.service';

@Component({
	selector: 'app-root-account',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
	conFirm: boolean;
	chooseStaff: boolean = true;
	chooseDepartment: boolean;
	chooseAcc: boolean;
	listStaff: boolean;
	staffs: staff[];
	depts: dept[];
	accounts: staff[];
	admin;
	id_department: number;
	reset;
	accoountReset = [];
	item = [];
	constructor(
		private dashboardrouter: Router,
		private dashbordservice: AdminService,
	) {
		this.admin = JSON.parse(localStorage.getItem('admin'));
	}

	ngOnInit() {
		this.getStaff();
		this.getDept();
		this.reset = function () {
			this.dashbordservice.listStaff().subscribe(data => this.staffs = data,
				error => console.log(error),
			);
			this.dashbordservice.listDept().subscribe(data => this.depts = data,
				error => console.log(error),
			);

		}
	}

	logout() {
		this.dashboardrouter.navigate(['/login']);
	}

	list_staff() {
		this.chooseDepartment = false;
		this.chooseStaff = true;
		this.listStaff = false;
		this.chooseAcc = false;
	}

	list_department() {
		this.chooseDepartment = true;
		this.chooseStaff = false;
		this.listStaff = false;
		this.chooseAcc = false
	}
	getStaff() {
		return this.dashbordservice.listStaff().subscribe(data => this.staffs = data,
			error => console.log(error),
		);
	}

	getDept() {
		return this.dashbordservice.listDept().subscribe(data => this.depts = data,
			error => console.log(error),
		);
	}

	delDept(id) {
		console.log(id);
		this.conFirm = confirm("Are you delete department?");
		if (this.conFirm) {
			this.dashbordservice.delDept(id).subscribe(
				data => {
					this.reset();
				}
			);
		};

	}

	delStaff(id) {
		this.conFirm = confirm("Are you delete staff?");
		if (this.conFirm) {
			this.dashbordservice.delStaff(id).subscribe(data => {
				this.reset();
			});
		};
	}
	chooseEdit = false;
	flag = false;
	id_dept: number;
	id_staff: number;

	editStaff(id) {
		this.chooseEdit = true;
		this.id_staff = id;
		console.log(id);
	}

	editDept(id) {
		this.flag = true;
		this.id_dept = id;
	}
	showDept(id) {
		this.listStaff = true;
		this.chooseDepartment = false;
		this.chooseAcc = false;
		this.id_department = id;
	}
	list_acc() {
		this.chooseDepartment = false;
		this.chooseStaff = false;
		this.listStaff = false;
		this.chooseAcc = true;
		return this.dashbordservice.listStaff().subscribe(data => this.accounts = data,
			error => console.log(error),
		);
	}

	exit: boolean;
	choose(email, choose) {
		console.log(email);
		console.log(choose);
		if (choose == true) {
			this.accoountReset.push(email);
		}
		else {
			let index = this.accoountReset.indexOf(email);
			if (index >= 0) {
				this.accoountReset.splice(index, 1);
			}
		}
	}
	resetPass() {
		console.log(this.accoountReset);
		let data = (Object.assign({}, this.accoountReset));
		console.log(data);

		this.dashbordservice.resetAcc(this.accoountReset).subscribe(
			data => {
				alert("successfully");
			}
		)
	}
	p:Number = 1;
	count:Number = 1;
	id: Number = 1;
}
