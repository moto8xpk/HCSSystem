import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Service } from '../../../../Model/ServiceModel/service.model';
import { ServiceService } from '../../../../Service/SerService/service.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  serviceList: Service[];
  requiredMsg:string;

  constructor(private serviceService: ServiceService, private tostr: ToastrService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.requiredMsg = 'Trường bắt buộc';
    this.resetForm();
    this.dtOptions = {
      retrieve: true,
      // processing: true,
      // scrollX: true,
      // language: {
      //   searchPlaceholder: "Search"
      // },
    }

    this.resetForm();
    var x = this.serviceService.getData();
    x.snapshotChanges().subscribe(item => {
      this.serviceList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.serviceList.push(y as Service);
        this.dtTrigger.next();
      });
    });
  }

  open(content) {
    this.modalService.open(content,{ size: 'lg' });
  }

  openDetail(contentDetail) {
    this.modalService.open(contentDetail, { size: 'lg' });
  }

  onSubmit(serviceForm: NgForm) {
    this.serviceService.updateService(serviceForm.value);
    this.resetForm(serviceForm);
    this.tostr.success('Cập nhận thông tin dịch vụ thành công', 'Cập nhật thông tin dịch vụ');
  }

  resetForm(serviceForm?: NgForm) {
    if (serviceForm != null)
      serviceForm.reset();
    this.serviceService.selectedService = {
      $key: null,
      ServiceName: '',
      descr: '',
      TimeUnit: null,
      Price: null
    }
  }

  onEdit(service: Service) {
    this.serviceService.selectedService = Object.assign({}, service);
  }

  onDelete(key: string) {
    if (confirm('Bạn có chắc muốn xoá dữ liệu này ?') == true) {
      this.serviceService.deleteService(key);
      this.tostr.warning("Xoá thành công", "Xoá thông tin dịch vụ");
    }
  }
}


