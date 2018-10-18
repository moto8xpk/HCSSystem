import { Injectable } from '@angular/core';
import { Login } from './../../Model/LoginModel/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  logout(): void {
    localStorage.setItem('isLoggedIn', "false");
    localStorage.removeItem('token');
  }

  logoutCustomer(): void {
    localStorage.setItem('isCustomerLoggedIn', "false");
    localStorage.removeItem('tokencustomer');
  }
}
