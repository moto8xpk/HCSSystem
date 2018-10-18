import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../Service/AuthService/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staffhome',
  templateUrl: './staffhome.component.html',
  styleUrls: ['./staffhome.component.css']
})
export class StaffhomeComponent implements OnInit {
  id: string;
  constructor(private router: Router, public authService: AuthService) { }

  ngOnInit() {
    this.id = localStorage.getItem('token');
  }

  logout(): void {
    console.log("user Logout");
    this.authService.logoutCustomer();
    this.router.navigate(['/stafflogin']);
  }
}