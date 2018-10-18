import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';


import { CustomerService } from '../../../../Service/CustomerService/customer.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from '../../../../Model/CustomerModel/customer.model';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  requiredMsg: string;
  customerForm: FormGroup;
  customerList: Customer[];
  ErrorMessage: string;

  constructor(private customerService: CustomerService, private tostr: ToastrService, private modalService: NgbModal) { }

  ngOnInit() {
    this.requiredMsg = 'Trường bắt buộc';
    var x = this.customerService.getData();
    x.snapshotChanges().subscribe(item => {
      this.customerList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.customerList.push(y as Customer);
      })
    })
  }

  private modalRef: NgbModalRef;
  open(content) {
    this.resetForm();
    this.ErrorMessage = "";
    this.modalRef = this.modalService.open(content, { size: 'lg' });
    if (this.customerForm == null) {
      this.customerService.selectedCustomer.Level = "member";
    }
  }

  onSubmit(customerForm: NgForm) {
    //Check exists username
    let isExitsUsername: boolean = false;
    this.customerList.forEach(item => {
      if (this.customerService.selectedCustomer.Username === item.Username) {
        isExitsUsername = true;
      } else {
        return isExitsUsername;
      }
    })
    if (!isExitsUsername) {
      customerForm.value.Password = this.encryptMD5(this.customerService.selectedCustomer.Password);
      this.customerService.insertCustomer(customerForm.value);
      this.modalRef.close();
      // this.resetForm(customerForm);
      this.tostr.success('Thêm thành công', 'Thêm khách hàng');
    } else {
      this.ErrorMessage = "Tên tài khoản đã tồn tại";
    }
  }

  encryptMD5(oldPassword: string) {
    return Md5.hashStr(oldPassword).toString();
  }

  resetForm(customerForm?: NgForm) {
    if (customerForm != null)
      customerForm.reset();
    this.customerService.selectedCustomer = {
      $key: null,
      FullName: '',
      Gender: '',
      PhoneNumber: '',
      Level: '',
      Username: '',
      OldPassword: '',
      Password: '',
      ConfirmPassword: '',
      Address: ''
    }
  }
}
