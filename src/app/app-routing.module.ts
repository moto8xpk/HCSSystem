import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './service/AuthService/auth.guard';

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
//Staff page
import { StaffloginComponent } from './Component/StaffPageComponent/stafflogin/stafflogin.component';
import { StaffhomeComponent } from './Component/StaffPageComponent/staffhome/staffhome.component';
import { StaffconfirmComponent } from './Component/StaffPageComponent/staffhome/staffconfirm/staffconfirm.component';
import { StaffbookingComponent } from './Component/StaffPageComponent/staffhome/staffbooking/staffbooking.component';
import { StafftimeComponent } from './Component/StaffPageComponent/staffhome/stafftime/stafftime.component';
import { HomeComponent } from './Component/customerpage/home/home.component';

const routes: Routes = [

  //admin
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
      { path: 'staff', component: StaffManagementComponent },
      { path: 'booking', component: BookingManagementComponent },
      { path: 'service', component: ServiceManagementComponent },
      { path: 'customer', component: CustomerManagementComponent },
      { path: 'timeline', component: TimelineComponent },
    ]
  },

  //staff
  { path: 'stafflogin', component: StaffloginComponent },
  {
    path: 'staffhome', component: StaffhomeComponent, canActivate: [AuthGuard], children: [
      { path: 'staffconfirm', component: StaffconfirmComponent },
      { path: 'staffbooking', component: StaffbookingComponent },
      { path: 'stafftime', component: StafftimeComponent },
    ]
  },

  //customer

  {
    path: 'homepage', component: CustomerpageComponent, children: [
      { path: 'customerregistration', component: CustomerregistrationComponent },
      { path: 'customerlogin', component: CustomerloginComponent },
      { path: 'customerbooking', component: CustomerbookingComponent },
      { path: 'home', component: HomeComponent },
    ]
  },

  //member
  {
    path: 'customerhome', component: CustomerhomeComponent, canActivate: [AuthGuard], data: {
      expectedRole: 'user'
    },
    children: [
      { path: 'memberbooking', component: MemberbookingComponent },
      { path: 'bookinghistory', component: BookinghistoryComponent },
    ]
  },

  { path: 'admin', component: LoginComponent },
  { path: '**', redirectTo: '/homepage/home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
