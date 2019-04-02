import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ttkt-chi-tiet-kh-table',
  templateUrl: './chi-tiet-kh-table.component.html',
  styleUrls: ['./chi-tiet-kh-table.component.scss']
})
export class ChiTietKhTableComponent implements OnInit {
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
