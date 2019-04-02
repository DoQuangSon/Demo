import { Pipe, PipeTransform } from '@angular/core';
import { TRANG_THAI_BCTHKQTN } from '../../constants/config.constant';

@Pipe({
  name: 'trangThaiBcthkqtn'
})
export class TrangThaiBcthkqtn implements PipeTransform {
  transform(value: any, args?: any): any {
    for (const data of TRANG_THAI_BCTHKQTN) {
      if (value == data.value) {
        return data.name;
      }
    }
    return null;
  }

}
