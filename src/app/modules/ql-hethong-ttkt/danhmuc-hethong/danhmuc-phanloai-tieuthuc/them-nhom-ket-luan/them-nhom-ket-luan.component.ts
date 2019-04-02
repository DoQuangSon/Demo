import { Component, OnInit, Input } from '@angular/core';
import { ResponseOptions } from '@angular/http';
import { NoiDmPhanLoaiTieuThucService } from '../../../../../services/api/danh-muc/noi-dmPhanLoaiTieuThuc/noi-dm-phan-loai-tieu-thuc.service';
import { convertToRomanNumber } from '../../../../../services/api/utils/utils.service';
import { Pagging } from '../../../../../shared/models/pagging.model';

@Component({
  selector: 'ttkt-them-nhom-ket-luan',
  templateUrl: './them-nhom-ket-luan.component.html',
  styleUrls: ['./them-nhom-ket-luan.component.scss']
})
export class ThemNhomKetLuanComponent implements OnInit {
  pagging: Pagging = new Pagging();
  dataTieuThuc: Array<any> = [];
  totalPage = 0;
  pageSize = 10;
  pager: any;
  currentPage = 0;
  @Input()
  private _id: number;
  public get id(): number {
    return this._id;
  }
  public set id(value: number) {
    this._id = value;
  }
  constructor(
    private noiDmPhanLoaiTieuThucService: NoiDmPhanLoaiTieuThucService) { }

    ngOnInit() {
      this.getAllData();
  }
  pageChanged(event) {
    this.pagging.currentPage = event.page - 1;
    this.getAllData();
  }
  
  convertToRomanNumber(num: number) {
    return convertToRomanNumber(num);
  }
  getAllData() {
    this.noiDmPhanLoaiTieuThucService.getDmPhanLoaiTT(this.currentPage, this.pageSize).subscribe (
      response => {
        this.totalPage = response.totalPages;
        this.dataTieuThuc = response.content.filter( res => res.isKetLuan !== 'ketluan');
        this.pagging.totalItems = response.totalElements;
      }
    );
  }
  clickOk(tenPhanLoai) {

  }

}
