import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { Service } from '../../Model/ServiceModel/service.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  serviceList: AngularFireList<any>;
  selectedService: Service = new Service();
  constructor(private firebase: AngularFireDatabase) { }

  getData() {
    this.serviceList = this.firebase.list('HCS_Service');
    return this.serviceList;
  }

  insertService(service: Service) {
    this.serviceList.push({
      ServiceName: service.ServiceName,
      descr: service.descr,
      TimeUnit: service.TimeUnit,
      Price: service.Price
    });
  }

  updateService(service: Service) {
    this.serviceList.update(service.$key,
      {
        ServiceName: service.ServiceName,
        descr: service.descr,
        TimeUnit: service.TimeUnit,
        Price: service.Price
       
      });
  }

  deleteService($key: string) {
    this.serviceList.remove($key);
  }
}
