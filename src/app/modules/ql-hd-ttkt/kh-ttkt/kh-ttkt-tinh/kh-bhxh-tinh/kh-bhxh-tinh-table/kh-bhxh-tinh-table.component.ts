import { Component, OnInit, Input } from '@angular/core';
import { QUY, LOAIHINHTTKT, TRANG_THAI_KH } from '../../../../../../constants/ke-hoach-ttkt.constants';

@Component({
  selector: 'ttkt-kh-bhxh-tinh-table',
  templateUrl: './kh-bhxh-tinh-table.component.html',
  styleUrls: ['./kh-bhxh-tinh-table.component.scss']
})
export class KhBhxhTinhTableComponent implements OnInit {
  quy: any[] = QUY;
  loaiHinhTTKTs: any[] = LOAIHINHTTKT;
  listKehoachB: any[] = [];
  private _listKehoach: any;
 @Input()
  public get listKehoach(): any {
    return this._listKehoach;
  }
  public set listKehoach(value: any) {
    this._listKehoach = value;
    for (const el of this._listKehoach) {
      if (el.id !== null) {
        const kh: any = {};
        kh.id = el.dmPhanLoaiDtId;
        kh.tenDanhMuc = el.tenDanhMucPhanLoaiDt;
        const listChildren: any[] = [];
        const children: any = {};
        children.doiTuongTTKT = el.doiTuongTTKTDTO;
        children.loaiHinhTTKT = el.loaiHinhTTKT;
        children.quyTrongKeHoach = el.quyTrongKeHoach;
        children.tinhDuKienLiveDTO = el.tinhDuKienLiveDTO;
        children.trongKeHoach = el.trongKeHoach;
        if (el.doiTuongTTKTDTO != null) {
          listChildren.push(children);
        }
        kh.children = listChildren;
        if (this.listKehoachB.length > 0) {
          const index = this.listKehoachB.findIndex(item => {
            return item.id === el.dmPhanLoaiDtId;
          });
          if (index !== -1) {
            (<any[]>this.listKehoachB[index].children).push(children);
          } else {
            this.listKehoachB.push(kh);
          }
        } else {
          this.listKehoachB.push(kh);
        }
      }
    }
  }
  constructor() { }
  ngOnInit() {
  }
  getQuy(id) {
    const q = this.quy.find(el => {
      return el.id === id;
    });
    return q;
  }
  getLoaiHinh(id) {
    const lh = this.loaiHinhTTKTs.find(el => {
      return el.id === id;
    });
    return lh;
  }
  setStatusLabel(status) {
    for (const trangThai of TRANG_THAI_KH) {
      if (status === trangThai.code) {
        return trangThai.name;
      }
    }
    return this.setStatusLabel(2);
  }

}
