import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './service/AuthService/auth.guard';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';



// Font-awesome
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppRoutingModule } from './app-routing.module';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Datatable
import { DataTablesModule } from 'angular-datatables';
// import { DataTableModule } from 'angular-6-datatable';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartComponent } from './Component/chart/chart.component';
import { LoginComponent } from './Component/login/login.component';
import { StaffManagementComponent } from '../app/Component/StaffComponent/staff-management/staff-management.component';
import { StaffComponent } from '../app/Component/StaffComponent/staff-management/staff/staff.component';
import { StaffListComponent } from '../app/Component/StaffComponent/staff-management/staff-list/staff-list.component';
import { ServiceManagementComponent } from './Component/ServiceComponent/service-management/service-management.component';
import { ServiceComponent } from './Component/ServiceComponent/service-management/service/service.component';
import { ServiceListComponent } from './Component/ServiceComponent/service-management/service-list/service-list.component';
import { CustomerManagementComponent } from './Component/CustomerComponent/customer-management/customer-management.component';
import { CustomerComponent } from './Component/CustomerComponent/customer-management/customer/customer.component';
import { CustomerListComponent } from './Component/CustomerComponent/customer-management/customer-list/customer-list.component';
import { BookingformComponent } from './Component/bookingform/bookingform.component';
import { DashboardComponent } from './Component/DashboardComponent/dashboard/dashboard.component';
import { CustomerpageComponent } from './Component/customerpage/customerpage.component';
import { CustomerregistrationComponent } from './Component/customerpage/customerregistration/customerregistration.component';
import { CustomerloginComponent } from './Component/customerpage/customerlogin/customerlogin.component';
import { CustomerbookingComponent } from './Component/customerpage/customerbooking/customerbooking.component';
import { CompareValidatorDirective } from './shared/compare-validator.directive';
import { CustomerhomeComponent } from './Component/customerhome/customerhome.component';
import { MemberbookingComponent } from './Component/customerhome/memberbooking/memberbooking.component';
import { BookingManagementComponent } from './Component/BookingComponent/booking-management/booking-management.component';
import { BookingComponent } from './Component/BookingComponent/booking-management/booking/booking.component';
import { BookingListComponent } from './Component/BookingComponent/booking-management/booking-list/booking-list.component';
import { TimelineComponent } from './Component/StaffComponent/timeline/timeline.component';
import { BookinghistoryComponent } from './Component/customerhome/bookinghistory/bookinghistory.component';
import { StaffloginComponent } from './Component/StaffPageComponent/stafflogin/stafflogin.component';
import { StaffhomeComponent } from './Component/StaffPageComponent/staffhome/staffhome.component';
import { StaffconfirmComponent } from './Component/StaffPageComponent/staffhome/staffconfirm/staffconfirm.component';
import { StaffbookingComponent } from './Component/StaffPageComponent/staffhome/staffbooking/staffbooking.component';
import { StafftimeComponent } from './Component/StaffPageComponent/staffhome/stafftime/stafftime.component';
import { HomeComponent } from './Component/customerpage/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    StaffManagementComponent,
    StaffComponent,
    StaffListComponent,
    ChartComponent,
    LoginComponent,
    ServiceManagementComponent,
    ServiceComponent,
    ServiceListComponent,
    CustomerManagementComponent,
    CustomerComponent,
    CustomerListComponent,
    BookingformComponent,
    DashboardComponent,
    CustomerpageComponent,
    CustomerregistrationComponent,
    CustomerloginComponent,
    CustomerbookingComponent,
    CompareValidatorDirective,
    CustomerhomeComponent,
    MemberbookingComponent,
    BookingManagementComponent,
    BookingComponent,
    BookingListComponent,
    TimelineComponent,
    BookinghistoryComponent,
    StaffloginComponent,
    StaffhomeComponent,
    StaffconfirmComponent,
    StaffbookingComponent,
    StafftimeComponent,
    HomeComponent,
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ToastrModule.forRoot(),
    NgbModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    DlDateTimePickerDateModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
    DataTablesModule,
    // DataTableModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule { }
