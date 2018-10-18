import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Customer } from '../../../../Model/CustomerModel/customer.model';
import { CustomerService } from '../../../../Service/CustomerService/customer.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgForm, FormGroup } from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  customerList: Customer[];
  requiredMsg: string;
  customerForm: FormGroup;
  changePasswordForm: FormGroup;
  ErrorMessage: string;

  constructor(private customerService: CustomerService, private tostr: ToastrService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.requiredMsg = 'Trường bắt buộc';
    this.dtOptions = {
      retrieve: true,
      // processing: true,
      // scrollX: true,
      // responsive: true,
      // language: {
      //   searchPlaceholder: "Tìm"
      // },
    }

    var x = this.customerService.getData();
    x.snapshotChanges().subscribe(item => {
      this.customerList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.customerList.push(y as Customer);
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
    this.customerService.selectedCustomer.Password = "";
  }

  openDetail(contentDetail) {
    this.modalService.open(contentDetail, { size: 'lg' });
  }

  onSubmit(customerForm: NgForm) {
    this.customerService.updateCustomer(customerForm.value);
    this.resetForm(customerForm);
    this.tostr.success('Cập nhật thành công', 'Cập nhật thông tin khách hàng');
  }

  onChangePasswordSubmit(changePasswordForm: NgForm) {
    //Check match password
    let isPasswordMatch: boolean = false;
    this.customerList.forEach(item => {
      if (this.customerService.selectedCustomer.Username === item.Username) {
        if (this.encryptMD5(this.customerService.selectedCustomer.OldPassword) === item.Password) {
          isPasswordMatch = true
        }
        else {
          this.ErrorMessage = "Mật khẩu cũ không trùng";
          return isPasswordMatch;
        }
      }
    })
    if (isPasswordMatch) {
      changePasswordForm.value.Password = this.encryptMD5(this.customerService.selectedCustomer.Password);
      this.customerService.updateCustomer(changePasswordForm.value);
      this.modalRef.close();
      this.resetForm(changePasswordForm);
      this.tostr.success('Đổi mật khẩu thành công', 'Đổi mật khẩu');
    }
    // });
  }

  resetForm(customerForm?: NgForm) {
    if (customerForm != null)
      customerForm.reset();
    this.customerService.selectedCustomer = {
      $key: null,
      FullName: '',
      Gender: '',
      Level: '',
      Username: '',
      OldPassword: '',
      Password: '',
      ConfirmPassword: '',
      PhoneNumber: '',
      Address: '',
    }
  }

  onEdit(customer: Customer) {
    this.customerService.selectedCustomer = Object.assign({}, customer);
  }

  onDelete(key: string) {
    if (confirm('Bạn có chắc muốn xoá dữ liệu này?') == true) {
      this.customerService.deleteCustomer(key);
      this.tostr.warning("Xoá thành công", "Xoá thông tin khách hàng");
    }
  }

  encryptMD5(oldPassword: string) {
    return Md5.hashStr(oldPassword).toString();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}


