import { Pipe, PipeTransform } from '@angular/core';
import { DONTHU_STATUS } from '../../constants/tiep-cong-dan.constants';

@Pipe({
  name: 'dtstatus'
})
export class DonThuStatusPipe implements PipeTransform {
  STATUS = DONTHU_STATUS;

  transform(value: any, args?: any): any {
    for (const noti of this.STATUS) {
      if (value == noti.id) { 
        return noti.name;
      }
    }
    return null;
  }

}
