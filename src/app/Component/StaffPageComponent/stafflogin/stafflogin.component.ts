import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../../Model/LoginModel/login';
import { AuthService } from '../../../Service/AuthService/auth.service';
import { Staff } from '../../../Model/StaffModel/Staff.model';
import { StaffService } from '../../../Service/StaffService/staff.service';
import { ToastrService } from 'ngx-toastr';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-stafflogin',
  templateUrl: './stafflogin.component.html',
  styleUrls: ['./stafflogin.component.css']
})
export class StaffloginComponent implements OnInit {
  staffList: Staff[];
  staffLoginForm: FormGroup;
  message: string;
  returnUrl: string;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private router: Router, public authService: AuthService, private staffService: StaffService, private tostr: ToastrService) { }

  ngOnInit() {
    this.staffLoginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
    this.returnUrl = '/staffhome/staffconfirm';
    this.authService.logoutCustomer();

    const x = this.staffService.getData();
    x.snapshotChanges().subscribe(item => {
      this.staffList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.staffList.push(y as Staff);
      });
    });
  }

  get f() { return this.staffLoginForm.controls; }


  loginStaff() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.staffLoginForm.invalid) {
      return;
    }

    if (this.staffLoginForm.valid) {
      let i = 0;
      for (i; i < this.staffList.length; i++) {
        if (this.f.username.value === this.staffList[i].Username) {
          if (this.encryptMD5(this.f.password.value) === this.staffList[i].Password) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('token', this.f.username.value);
            this.router.navigate([this.returnUrl]);
            break;
          } else {
            this.message = 'Tên tài khoản hoặc mật khẩu không đúng';
            break;
          }
        } else {
          this.message = 'Tên tài khoản hoặc mật khẩu không đúng';
        }
      }
    }
  }

  encryptMD5(providePassword: string) {
    return Md5.hashStr(providePassword).toString();
  }
}
