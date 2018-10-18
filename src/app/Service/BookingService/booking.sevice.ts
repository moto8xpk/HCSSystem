import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Booking } from '../../Model/BookingModel/booking.model';
import { DatePipe } from '@angular/common'

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  bookList: AngularFireList<any>;
  selectedBooking: Booking = new Booking();
  constructor(private firebase: AngularFireDatabase) { }

  getData() {
    this.bookList = this.firebase.list('HCS_Booking_Form');
    return this.bookList;
  }

  insertBooking(booking: Booking) {
    console.log(booking.Date.toString());
    console.log(booking.StartTime);
    // booking.Time=this.timeFormat(Number(booking.Time));



    this.bookList.push({
      CustomerName: booking.CustomerName,
      Gender: booking.Gender,
      Phone: booking.Phone,
      Services: booking.Services,
      StaffName: booking.StaffName,
      Date: booking.Date,
      StartTime: booking.StartTime,
      EndTime: booking.EndTime,
      Status: booking.Status
    });
  }

  updateBooking(booking: Booking) {
    this.bookList.update(booking.$key,
      {
        CustomerName: booking.CustomerName,
        Gender: booking.Gender,
        Phone: booking.Phone,
        Services: booking.Services,
        StaffName: booking.StaffName,
        Date: booking.Date,
        StartTime: booking.StartTime,
        EndTime: booking.EndTime,
        Status: booking.Status
      });
  }

  deleteBooking($key: string) {
    this.bookList.remove($key);
  }
}
