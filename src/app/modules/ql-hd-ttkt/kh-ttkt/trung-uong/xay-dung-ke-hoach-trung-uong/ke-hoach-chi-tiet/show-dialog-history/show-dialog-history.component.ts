import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ttkt-show-dialog-history',
  templateUrl: './show-dialog-history.component.html',
  styleUrls: ['./show-dialog-history.component.scss']
})
export class ShowDialogHistoryComponent implements OnInit {
  @Input() taiKhoanTinh: boolean = false;
  @Input() isKeHoachBHXHVN: boolean = false;
  private _chiTietKH: any;
  @Input('chiTietKH')
  public get chiTietKH(): any {
    return this._chiTietKH;
  }
  public set chiTietKH(value: any) {
    this._chiTietKH = value;
  }
  // tslint:disable-next-line:member-ordering
  @Input() twGiao: boolean = false;
  // tslint:disable-next-line:member-ordering
  // tslint:disable-next-line:no-input-rename
  private _listLichSu: any[];
  @Input('listLichSu')
  public get listLichSu(): any[] {
    return this._listLichSu;
  }
  public set listLichSu(value: any[]) {
    this._listLichSu = value;
  }
  constructor() { }

  ngOnInit() {
  }

}
