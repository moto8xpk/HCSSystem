import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Customer } from '../../Model/CustomerModel/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customerList: AngularFireList<any>;
  selectedCustomer: Customer = new Customer();
  constructor(private firebase: AngularFireDatabase) { }

  getData() {
    this.customerList = this.firebase.list('HCS_Customer');
    return this.customerList;
  }

  insertCustomer(customer: Customer) {
    this.customerList.push({
      FullName: customer.FullName,
      Gender: customer.Gender,
      PhoneNumber: customer.PhoneNumber,
      Level: customer.Level,
      Username: customer.Username,
      Password: customer.Password,
      Address: customer.Address,
    });
  }

  updateCustomer(customer: Customer) {
    this.customerList.update(customer.$key,
      {
        FullName: customer.FullName,
        Gender: customer.Gender,
        PhoneNumber: customer.PhoneNumber,
        Level: customer.Level,
        Username: customer.Username,
        Password: customer.Password,
        Address: customer.Address,
      });
  }

  deleteCustomer($key: string) {
    this.customerList.remove($key);
  }
}
