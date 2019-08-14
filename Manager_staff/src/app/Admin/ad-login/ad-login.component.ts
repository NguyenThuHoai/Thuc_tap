import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { LoginService } from '../../Dang_nhap/login.service';
import { AdminService } from '../Admin.service';

@Component({
	selector: 'app-ad-login',
	templateUrl: './ad-login.component.html',
	styleUrls: ['./ad-login.component.css']
})
export class AdLoginComponent implements OnInit {
	admin;
	ResetForm: FormGroup;
	submitted = false;
	constructor(private AdService: AdminService,
		private adminRouter: Router,
		private loginService: LoginService,
		private formBuilder: FormBuilder,
	) {
		this.admin = JSON.parse(localStorage.getItem('admin'));

	}

	ngOnInit() {
		this.ResetForm = this.formBuilder.group({
			username: ['', Validators.required],
			password: ['', Validators.required],
		})
	}

	get f() {
		return this.ResetForm.controls;
	}
	onSubmit() {
		this.submitted = true;
		if (this.ResetForm.invalid) {
			return;
		}
		this.AdService.resetAccAd(this.ResetForm.value.username, this.ResetForm.value.password).subscribe(
			data => {
				if (data && data.msg == 'successfully') {
					alert("Đổi mật khẩu thành công!");
					this.loginService.logoutAd();
					this.submitted = false;
					this.adminRouter.navigate(['/login']);
				}
			}
		)
	}


}
