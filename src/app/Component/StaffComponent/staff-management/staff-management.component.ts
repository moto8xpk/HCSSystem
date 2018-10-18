import { Component, OnInit } from '@angular/core';
import { StaffService } from '../../../Service/StaffService/staff.service'

@Component({
  selector: 'app-staff-management',
  templateUrl: './staff-management.component.html',
  styleUrls: ['./staff-management.component.css'],
  providers: [StaffService]
})
export class StaffManagementComponent implements OnInit {

  constructor(private staffService: StaffService) { }

  ngOnInit() {
  }

}
