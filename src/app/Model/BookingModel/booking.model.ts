import { Service } from '../ServiceModel/service.model';
export class Booking {
    $key: string;
    CustomerName: string;
    Gender: string;
    Phone: string;
    Services: Service[];
    StaffName: string;
    Date: Date;
    StartTime: number;
    EndTime: number;
    Status: number;
}
