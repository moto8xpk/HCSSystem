import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NgbModal, NgbDateStruct, NgbCalendar, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bookingform',
  templateUrl: './bookingform.component.html',
  styleUrls: ['./bookingform.component.css']
})
export class BookingformComponent implements OnInit {

  model: NgbDateStruct;
  date: {year: number, month: number};

  // time = {hour: 13, minute: 30};
  meridian = true;

  toggleMeridian() {
    this.meridian = !this.meridian;
}

  constructor(private modalService: NgbModal, private calendar: NgbCalendar ) { }

  ngOnInit() {
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

}
