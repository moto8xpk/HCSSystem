import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../Service/AuthService/auth.service';
import { Router } from '@angular/router';
import { Booking } from '../../../Model/BookingModel/booking.model';
import { BookingService } from '../../../Service/BookingService/booking.sevice';
import { interval } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  id: string;
  bookList: Booking[];

  constructor(private router: Router, public authService: AuthService, private bookingService: BookingService) { }

  ngOnInit() {
    this.id = localStorage.getItem('token');
    let a = this.bookingService.getData();
    a.snapshotChanges().subscribe(item => {
      this.bookList = [];
      
      item.forEach(element => {
        let y = element.payload.toJSON();
        y['$key'] = element.key;
        this.bookList.push(y as Booking);
      });
      // console.log(this.bookList);
      if(this.bookList!=null){
        this.updateStatusForForm();
      }
    });
  }
  updateStatusForForm(){
    let current=moment().format('YYYY-MM-D').toString();
    // console.log(current);
    const subscribe = interval(30000).subscribe(val=>{
      // console.log(this.bookList);
      this.bookList.forEach(item=>{
        //get String Date for each item
      let dateSelectedList: string[] = JSON.stringify(item.Date).substring(2, JSON.stringify(item.Date).length - 1).split(',');
      let fullDateSelected = '';
      dateSelectedList.forEach(str => {
        let dateStr: string = str.substring(str.indexOf(':') + 1);
        if (fullDateSelected !== '') {
          fullDateSelected = '-' + fullDateSelected;
        }
        fullDateSelected = dateStr + fullDateSelected;

      });

      if (moment(fullDateSelected).isSame(current,'day')) {
        
        let currentTime=moment().format('HH:mm').toString();
        // let currentTime='17:20';
        let formTime=moment(item.StartTime,'HH:mm').add(5,'minutes').format('HH:mm').toString();
        // console.log(currentTime);
        // console.log(formTime);
        if (currentTime===formTime && item.Status==1) {
          item.Status=3;
          this.bookingService.updateBooking(item);
        }
        
      }})
    });
    // console.log('end');
  }

  logout(): void {
    console.log("Logout");
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
