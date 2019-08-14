import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AdminService } from '../Admin.service';
import { dept } from '../../Model/dept';

@Component({
	selector: 'app-add-staff',
	templateUrl: './add-staff.component.html',
	styleUrls: ['./add-staff.component.css']
})
export class AddStaffComponent implements OnInit {
	staffs = [];
	depts: dept[];
	reset;
	AddForm: FormGroup;
	submitted = false;
	conFirm: boolean;
	constructor(
		private formBuilder: FormBuilder,
		private addservice: AdminService,
		private addrouter: Router
	) { }
	ngOnInit() {
		this.getDept();
		this.AddForm = this.formBuilder.group({
			full_name: ['', Validators.required],
			password: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			address: ['', Validators.required],
			gender: ['Female'],
			birthday: ['', Validators.required],
			grade: ['Staff', Validators.required],
			id_department: ['', Validators.required],
		}
		);
		this.reset = function () {
			this.getDept();
			this.AddForm = this.formBuilder.group({
				full_name: ['', Validators.required],
				password: ['', Validators.required],
				email: ['', [Validators.required, Validators.email]],
				address: ['', Validators.required],
				gender: ['Female'],
				birthday: ['', Validators.required],
				grade: ['Staff', Validators.required],
				id_department: ['', Validators.required],
			}
			);

		}
	}
	get f() {
		return this.AddForm.controls;
	}

	goBack() {
		this.addrouter.navigate(['/admin']);

	}

	getDept() {
		return this.addservice.listDept().subscribe(data => this.depts = data,
			error => console.log(error),
		);
	}

	onSubmit() {
		this.submitted = true;
		if (this.AddForm.invalid) {
			return;
		}
		if (this.AddForm.value.grade == "Manager") {
			console.log("manager");
			this.addservice.findManager(this.AddForm.value.id_department).subscribe(
				data => {
					if (data) {
						console.log(data);
						this.addservice.updateManager(data.id).subscribe(
							data => {
								if (data && data.msg == 'successfully') {
									this.conFirm = confirm("Bộ phận này đã có quản lí. Bạn có muốn tiếp tục? ");
									if (this.conFirm) {
										this.addservice.addStaff(this.AddForm.value).subscribe(user => this.staffs.push(user));

										console.log(this.AddForm.value);
										this.submitted = false;
										this.reset();
									}
								}
							}
						)
					}
					else {
						this.addservice.addStaff(this.AddForm.value).subscribe(data => this.staffs.push(data));
						this.submitted = false;

						this.reset();

					}
				},
			)
			this.submitted = false;
		} else {
			this.addservice.addStaff(this.AddForm.value).subscribe(data => this.staffs.push(data));
			console.log(this.AddForm.value);
			this.submitted = false;

			this.reset();

		}
	}
}
