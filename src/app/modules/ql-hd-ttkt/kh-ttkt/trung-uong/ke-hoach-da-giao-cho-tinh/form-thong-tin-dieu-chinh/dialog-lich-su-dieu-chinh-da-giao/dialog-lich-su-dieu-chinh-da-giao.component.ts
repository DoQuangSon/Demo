import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ttkt-dialog-lich-su-dieu-chinh-da-giao',
  templateUrl: './dialog-lich-su-dieu-chinh-da-giao.component.html',
  styleUrls: ['./dialog-lich-su-dieu-chinh-da-giao.component.scss']
})
export class DialogLichSuDieuChinhDaGiaoComponent implements OnInit {

  private _chiTietKH: any;
  @Input('chiTietKH')
  public get chiTietKH(): any {
    return this._chiTietKH;
  }
  public set chiTietKH(value: any) {
    this._chiTietKH = value;
  }
  // tslint:disable-next-line:member-ordering

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
