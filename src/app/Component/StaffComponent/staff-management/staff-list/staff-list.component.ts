import { Component, OnInit } from '@angular/core';
import { StaffService } from '../../../../Service/StaffService/staff.service'
import { Staff } from '../../../../Model/StaffModel/staff.model';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgForm, FormGroup } from '@angular/forms';
import { Md5 } from 'ts-md5';


@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit {
  closeResult: string;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  staffList: Staff[];
  requiredMsg: string;
  ErrorMessage: string;
  staffForm: FormGroup;

  constructor(private staffService: StaffService, private tostr: ToastrService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.requiredMsg = 'Trường bắt buộc';
    // this.resetForm();
    this.dtOptions = {
      retrieve: true,
      // processing: true,
      // paging: true,
      // language: {
      //   searchPlaceholder: "Search"
      // },
      // scrollX: true,
    }

    var x = this.staffService.getData();
    x.snapshotChanges().subscribe(item => {
      this.staffList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.staffList.push(y as Staff);
        this.dtTrigger.next();
      });
    });
  }

  open(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  private modalRef: NgbModalRef;
  openChangePassword(contentChangePassword) {
    this.ErrorMessage = "";
    this.modalRef = this.modalService.open(contentChangePassword, { size: 'lg' });
    this.staffService.selectedStaff.Password = "";
  }

  openDetail(detailContent) {
    this.modalService.open(detailContent, { size: 'lg' });
  }

  onSubmit(staffForm: NgForm) {
    this.staffService.updateStaff(staffForm.value);
    this.resetForm(staffForm);
    this.tostr.success('Cập nhật thành công', 'Cập nhật thông tin nhân viên');
  }

  onChangePasswordSubmit(changePasswordForm: NgForm) {
    //Check match password
    let isPasswordMatch: boolean = false;
    this.staffList.forEach(item => {
      if (this.staffService.selectedStaff.Username === item.Username) {
        if (this.encryptMD5(this.staffService.selectedStaff.OldPassword) === item.Password) {
          isPasswordMatch = true
        }
        else {
          this.ErrorMessage = "Mật khẩu cũ không trùng";
          return isPasswordMatch;
        }
      }
    })
    if (isPasswordMatch) {
      changePasswordForm.value.Password = this.encryptMD5(this.staffService.selectedStaff.Password);
      this.staffService.updateStaff(changePasswordForm.value);
      this.modalRef.close();
      this.resetForm(changePasswordForm);
      this.tostr.success('Đổi mật khẩu thành công', 'Đổi mật khẩu');
    }
    // });
  }

  resetForm(staffForm?: NgForm) {
    if (staffForm != null)
      staffForm.reset();
    this.staffService.selectedStaff = {
      $key: null,
      Username: '',
      OldPassword: '',
      Password: '',
      ConfirmPassword: '',
      FullName: '',
      Sex: '',
      DayOfBirth: null,
      PhoneNumber: null,
      Address: '',
      Salary: null,
    }
  }

  onEdit(sta: Staff) {
    this.staffService.selectedStaff = Object.assign({}, sta);
  }

  onDelete(key: string) {
    if (confirm('Bạn có chắc muốn xoá nhân viên này?') == true) {
      this.staffService.deleteStaff(key);
      this.tostr.warning("Xoá thành công");
    }
  }

  encryptMD5(oldPassword: string) {
    return Md5.hashStr(oldPassword).toString();
  }
}
