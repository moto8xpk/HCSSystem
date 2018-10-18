import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Booking } from '../../../Model/BookingModel/booking.model';
import { BookingService } from '../../../Service/BookingService/booking.sevice';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { BookingHistory } from '../../../Model/BookingModel/bookingHistory.model';
import { Service } from '../../../Model/ServiceModel/service.model';

@Component({
  selector: 'app-bookinghistory',
  templateUrl: './bookinghistory.component.html',
  styleUrls: ['./bookinghistory.component.css']
})
export class BookinghistoryComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  bookingList: Booking[];
  bookingMemberList: BookingHistory[];


  // objectValue = Object.values;

  constructor(private BookingService: BookingService, private tostr: ToastrService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.dtOptions = {
      retrieve: true,
      // processing: true,
      // scrollX: true,
      language: {
        searchPlaceholder: "Tìm"
      },
    }

    this.resetForm();
    var x = this.BookingService.getData();
    x.snapshotChanges().subscribe(item => {
      this.bookingList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.bookingList.push(y as Booking);
      });

      this.bookingMemberList = [];
      this.bookingList.forEach(record => {
        if (record.CustomerName === localStorage.getItem('token')) {
          // bookingIns.Date=this.changeDateTypeToString(record.Date);
          // bookingIns.CustomerName=record.CustomerName;
          // bookingIns.$key=record.$key;
          // bookingIns.EndTime=record.EndTime;
          // bookingIns.StartTime=record.StartTime;
          // bookingIns.Gender=record.Gender;
          // bookingIns.Phone=record.Phone;
          // bookingIns.Services=record.Services;
          // bookingIns.StaffName=record.StaffName;
          // bookingIns.Status=record.Status;
          this.bookingMemberList.push({
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
          this.dtTrigger.next();
        }
      })
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
      Status: null
    }
  }

  onEdit(booking: Booking) {
    this.BookingService.selectedBooking = Object.assign({}, booking);
  }

  // onDelete(key: string) {
  //   if (confirm('Are you sure to delete this record ?') == true) {

  //     this.BookingService.deleteBooking(key);
  //     this.tostr.warning("Deleted Successfully", "Added Customer");
  //   }
  // }

  onCancelBooking(keys: string) {
    if (confirm('Are you sure to delete this record ?') == true) {
      var x = this.BookingService.getData();
      x.snapshotChanges().subscribe(item => {
        this.bookingList = [];
        item.forEach(element => {
          var y = element.payload.toJSON();
          y["$key"] = element.key;
          this.bookingList.push(y as Booking);
        });

        this.bookingList.forEach(element => {
          if (element.$key === keys) {
            if (element.Status === 1) {
              console.log(element)
              element.Status = 3;
              this.BookingService.updateBooking(element);
            }
          }
        });
      });
      this.tostr.info("Huỷ thành công", "Huỷ lịch đặt", {
        timeOut: 1200,
        positionClass: 'toast-bottom-right'
      });
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
