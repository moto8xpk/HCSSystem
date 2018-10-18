import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from './../../Model/LoginModel/login';
import { AuthService } from './../../Service/AuthService/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: Login = { userid: "admin", password: "admin123" };
  loginForm: FormGroup;
  message: string;
  returnUrl: string;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, public authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'userid': ['', Validators.required],
      'password': ['', Validators.required]
    });
    this.returnUrl = '/dashboard/staff';
    this.authService.logout();
  }

  get f() { return this.loginForm.controls; }


  login() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    else {
      if (this.f.userid.value == this.model.userid && this.f.password.value == this.model.password) {
        console.log("Login successful");
        //this.authService.authLogin(this.model);
        localStorage.setItem('isLoggedIn', "true");
        localStorage.setItem('token', this.f.userid.value);
        this.router.navigate([this.returnUrl]);
      }
      else {
        this.message = "Tên tài khoản hoặc mật khẩu không đúng";
      }
    }
  }
}
