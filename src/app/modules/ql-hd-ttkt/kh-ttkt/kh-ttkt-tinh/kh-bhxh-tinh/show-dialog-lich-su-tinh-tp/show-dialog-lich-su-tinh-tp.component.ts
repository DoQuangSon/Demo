import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ttkt-show-dialog-lich-su-tinh-tp',
  templateUrl: './show-dialog-lich-su-tinh-tp.component.html',
  styleUrls: ['./show-dialog-lich-su-tinh-tp.component.scss']
})
export class ShowDialogLichSuTinhTpComponent implements OnInit {
  private _chiTietKH: any;
  @Input('chiTietKH')
  public get chiTietKH(): any {
    return this._chiTietKH;
  }
  public set chiTietKH(value: any) {
    this._chiTietKH = value;
  }
  // tslint:disable-next-line:member-ordering
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
