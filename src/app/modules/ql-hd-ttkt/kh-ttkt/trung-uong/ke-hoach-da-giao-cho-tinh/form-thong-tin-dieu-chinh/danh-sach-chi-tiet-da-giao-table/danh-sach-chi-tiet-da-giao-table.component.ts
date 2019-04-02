import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ttkt-danh-sach-chi-tiet-da-giao-table',
  templateUrl: './danh-sach-chi-tiet-da-giao-table.component.html',
  styleUrls: ['./danh-sach-chi-tiet-da-giao-table.component.scss']
})
export class DanhSachChiTietDaGiaoTableComponent implements OnInit {

  private _chiTietKH: any;
  // tslint:disable-next-line:member-ordering
  @Input('chiTietKH')
  public get chiTietKH(): any {
    return this._chiTietKH;
  }
  public set chiTietKH(value: any) {
    this._chiTietKH = value;
  }
  constructor() { }

  ngOnInit() {
  }


}
