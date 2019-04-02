import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notification'
})
export class NotificationPipe implements PipeTransform {
  NOTI_CONST = [
    {
      value: 1,
      name: 'Thông báo'
    },
    {
      value: 2,
      name: 'Nhắc nhở'
    },
    {
      value: 3,
      name: 'Cảnh báo'
    },
  ];

  transform(value: any, args?: any): any {
    for (const noti of this.NOTI_CONST) {
      if (value == noti.value) {
        return noti.name;
      }
    }
    return null;
  }

}
