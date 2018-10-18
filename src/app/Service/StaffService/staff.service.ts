import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { Staff } from '../../Model/StaffModel/staff.model';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  staffList: AngularFireList<any>;
  selectedStaff: Staff = new Staff();
  constructor(private firebase: AngularFireDatabase) { }

  getData() {
    this.staffList = this.firebase.list('HCS_Staff');
    return this.staffList;
  }

  insertStaff(staff: Staff) {
    this.staffList.push({
      Username: staff.Username,
      Password: staff.Password,
      FullName: staff.FullName,
      Sex: staff.Sex,
      DayOfBirth: staff.DayOfBirth,
      PhoneNumber: staff.PhoneNumber,
      Address: staff.Address,
      Salary: staff.Salary,
    });
  }

  updateStaff(staff: Staff) {
    this.staffList.update(staff.$key,
      {
        Username: staff.Username,
        Password: staff.Password,
        FullName: staff.FullName,
        Sex: staff.Sex,
        DayOfBirth: staff.DayOfBirth,
        PhoneNumber: staff.PhoneNumber,
        Address: staff.Address,
        Salary: staff.Salary,
      });
  }

  deleteStaff($key: string) {
    this.staffList.remove($key);
  }
}
