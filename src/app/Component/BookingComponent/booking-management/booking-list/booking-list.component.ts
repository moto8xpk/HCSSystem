import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Booking } from '../../../../Model/BookingModel/booking.model';
import { BookingService } from '../../../../Service/BookingService/booking.sevice';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgForm, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { BookingHistory } from '../../../../Model/BookingModel/bookingHistory.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  bookingList: Booking[];
  bookingForm: FormGroup;
  allBookingList: BookingHistory[];
  // returnUrl: string;

  constructor(private BookingService: BookingService, private tostr: ToastrService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    // this.returnUrl = '/dashboard/booking';
    this.resetForm();
    this.dtOptions = {
      // destroy:true,
      retrieve: true,
      // processing: true,
      // scrollX: true,
      // language: {
      //   searchPlaceholder: "Search"
      // },
    }

    this.resetForm();
    var x = this.BookingService.getData();
    x.snapshotChanges().subscribe(item => {
      this.bookingList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.bookingList.push(y as Booking);
        // this.dtTrigger.next();
      });
      this.allBookingList = [];
      this.bookingList.forEach(record => {
        this.allBookingList.push({
          Date: this.changeDateTypeToString(record.Date),
          CustomerName: record.CustomerName,
          $key: record.$key,
          EndTime: record.EndTime,
          StartTime: record.StartTime,
          Gender: record.Gender,
          Phone: record.Phone,
          Services: this.changeServicesToString(record.Services),
          StaffName: record.StaffName,
          Status: record.Status
        });
      })
      this.dtTrigger.next();
    });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  openDetail(contentDetail) {
    this.modalService.open(contentDetail, { size: 'lg' });
  }

  onSubmit(bookingForm: NgForm) {
    this.BookingService.insertBooking(bookingForm.value);
    this.resetForm(bookingForm);
    this.tostr.success('Submitted Succcessfully', 'Staff Register');
  }

  resetForm(bookingForm?: NgForm) {
    if (bookingForm != null)
      bookingForm.reset();
    this.BookingService.selectedBooking = {
      $key: '',
      CustomerName: '',
      Gender: '',
      Phone: '',
      Services: [],
      StaffName: '',
      Date: null,
      StartTime: null,
      EndTime: null,
      Status: null,
    }
  }

  onEdit(booking: Booking) {
    this.BookingService.selectedBooking = Object.assign({}, booking);
  }

  onCancelBooking(keys: string) {
    if (confirm('Huỷ đơn đặt?') == true) {
      this.bookingList.forEach(element => {
        if (element.$key === keys) {
          if (element.Status === 1) {
            // console.log(element)
            element.Status = 3;
            this.BookingService.updateBooking(element);
          }
        }
      });
      this.tostr.info("Huỷ thành công", "Huỷ lịch đặt", {
        timeOut: 1200,
        positionClass: 'toast-bottom-right'
      });
      // this.router.navigate([this.returnUrl]);
    }
  }

  onConfirmBooking(keyss: string) {
    if (confirm('Xác nhận đơn đặt?') == true) {
      this.bookingList.forEach(element => {
        if (element.$key === keyss) {
          if (element.Status === 1) {
            // console.log(element)
            element.Status = 2;
            this.BookingService.updateBooking(element);
          }
        }
      });
      this.tostr.info("Xác nhận đơn đặt thành công", "Xác nhận đơn đặt", {
        timeOut: 1200,
        positionClass: 'toast-bottom-right'
      });
      // this.router.navigate([this.returnUrl]);
    }
  }

  changeDateTypeToString(dateSelected: Date) {

    let dateSelectedList: string[] = JSON.stringify(dateSelected).substring(2, JSON.stringify(dateSelected).length - 1).split(',');
    let fullDateSelected = '';
    dateSelectedList.forEach(str => {
      let dateStr: string = str.substring(str.indexOf(':') + 1);
      if (fullDateSelected !== '') {
        fullDateSelected = '-' + fullDateSelected;
      }
      fullDateSelected = dateStr + fullDateSelected;
    });
    let date = moment(fullDateSelected).format('DD/MM/YYYY');
    return date;
  }
  changeServicesToString(Services: any) {
    let str: string = "";
    let valueOfServices = Object.values(Services);
    for (let index = 0; index < valueOfServices.length; index++) {
      if (index == valueOfServices.length - 1) {
        str = str + valueOfServices[index];
      }
      else {
        str = str + valueOfServices[index] + ", ";
      }

    }
    return str;
  }

  changeStatus(status: number) {
    let statusStr = "";
    switch (status) {
      case 1:
        statusStr = "Đang chờ";
        break;
      case 2:
        statusStr = "Đã xác nhận";
        break;
      case 3:
        statusStr = "Đã huỷ";
        break;
      default:
        break;
    }
    return statusStr;
  }
}
