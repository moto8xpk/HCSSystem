import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';

import { StaffService } from '../../../../Service/StaffService/staff.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Md5 } from 'ts-md5';
import { Staff } from '../../../../Model/StaffModel/staff.model';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  requiredMsg: string;
  staffForm: FormGroup;
  staffList: Staff[];
  ErrorMessage: string;
  constructor(private staffService: StaffService, private tostr: ToastrService, private modalService: NgbModal) { }

  ngOnInit() {
    this.requiredMsg = "Trường bắt buộc";
    var x = this.staffService.getData();
    x.snapshotChanges().subscribe(item => {
      this.staffList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.staffList.push(y as Staff);
      })
    })
  }

  private modalRef: NgbModalRef;
  open(content) {
    this.resetForm();
    this.ErrorMessage = "";
    this.modalRef = this.modalService.open(content, { size: 'lg' });
  }

  onSubmit(staffForm: NgForm) {
    //Check exists username
    let isExitsUsername: boolean = false;
    this.staffList.forEach(item => {
      if (this.staffService.selectedStaff.Username === item.Username) {
        isExitsUsername = true;
      } else {
        return isExitsUsername;
      }
    })
    if (!isExitsUsername) {
      staffForm.value.Password = this.encryptMD5(staffForm.value.Password);
      this.staffService.insertStaff(staffForm.value);
      this.modalRef.close();
      this.tostr.success('Thêm nhân viên thành công', 'Thêm nhân viên');
    } else {
      this.ErrorMessage = "Tên tài khoản đã tồn tại";
    }
    // ngay khúc này reload lại datatable nè
  }

  encryptMD5(oldPassword: string) {
    return Md5.hashStr(oldPassword).toString();
  }

  resetForm(staffForm?: NgForm) {
    if (staffForm != null) {
      staffForm.reset();
    }
    this.staffService.selectedStaff = {
      $key: null,
      Username: '',
      Password: '',
      OldPassword: '',
      ConfirmPassword: '',
      FullName: '',
      Sex: '',
      DayOfBirth: null,
      PhoneNumber: null,
      Address: '',
      Salary: null,
    };
  }
}
