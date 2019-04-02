import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({   providedIn: 'root' })
export class StatesService {
  tiepcongdanData: BehaviorSubject<any> = new BehaviorSubject(null);
  account: BehaviorSubject<any> = new BehaviorSubject({});
  listKehoachDieuChinh: BehaviorSubject<any[]> = new BehaviorSubject([]);
  pagination: BehaviorSubject<any> = new BehaviorSubject({});
  onGiaoKeHoach: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() {}

  emitTransferDataTiepCdToComponent(responseData: any) {
    this.tiepcongdanData.next(responseData);
  }

  emitTransferDataAccountToComponent(dataAccount: any) {
    this.account.next(dataAccount);
  }

  emitTranferDataDieuChinhKeHoach(data: any[]) {
    this.listKehoachDieuChinh.next(data);
  }
  emitPagination(data: any) {
    this.pagination.next(data);
  }
  emitGiaoKeHoach(data: boolean) {
    this.onGiaoKeHoach.next(data);
  }
}
