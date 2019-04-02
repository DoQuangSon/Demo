import { Component, OnInit, Input } from '@angular/core';
import { STATUS } from '../../../../../../../constants/ke-hoach-ttkt.constants';
import { FileResourceService } from '../../../../../../../services/helper/file-resource.service';

@Component({
  selector: 'ttkt-thong-tin-dieu-chinh',
  templateUrl: './thong-tin-dieu-chinh.component.html',
  styleUrls: ['./thong-tin-dieu-chinh.component.scss']
})
export class ThongTinDieuChinhComponent implements OnInit {

  urlFileDownload: any;
  tenFile: any;
  trangThai: string;
  // accountType: string;
  dieuChinhTu: string;
  _ThongTinDieuChinhCuaTrungUong: boolean;

  @Input() taiKhoanTinh: boolean = false;
  @Input() isKeHoachBHXHVN: boolean = false;
  @Input() coDieuChinhTu: boolean = true;
  private _chiTietKH: any;
  @Input('chiTietKH')
  public get chiTietKH(): any {
    return this._chiTietKH;
  }
  // tslint:disable-next-line:member-ordering
  public set chiTietKH(value: any) {
    // console.log('111222 ', value);
    this._chiTietKH = value;
    if (this._chiTietKH !== undefined) {
      if (this._chiTietKH.fileQuyetDinhDieuChinh !== undefined) {
        this.urlFileDownload = JSON.parse(this._chiTietKH.fileQuyetDinhDieuChinh);
        if (this.urlFileDownload !== null) {
          this.tenFile = this.urlFileDownload[0].fileName;
        }
      }
    }
    if (this.taiKhoanTinh) {
      this.checkTrangThai();
    }
  }
  // tslint:disable-next-line:member-ordering
  constructor(
    private fileResource: FileResourceService,
  ) {
  }

  ngOnInit() {
    // this._ThongTinDieuChinhCuaTrungUong = this._chiTietKH.user.maDonVi === '000';
    const maDonVi = (this._chiTietKH && this._chiTietKH.user && this._chiTietKH.user.maDonVi) ? this._chiTietKH.user.maDonVi : '';
    if (maDonVi === '000') {
      this.dieuChinhTu = 'Trung Ương';
    } else {
      this.dieuChinhTu = 'Tỉnh';
    }
      // this.accountType = localStorage.getItem('accountType');
    // if (this.accountType === 'tinh') {
    //   this.accountType = 'Tỉnh';
    // } else {
    //   this.accountType = 'Trung ương';
    // }
  }
  downLoadFile() {
    this.fileResource.downloadFile(this.urlFileDownload[0].url).subscribe(blob => {
      this.fileResource.saveFile(blob, this.urlFileDownload[0].fileName);
    }, err => { });
  }
  checkTrangThai() {
    if (this._chiTietKH.status === STATUS.STATUS_KHDUTHAO_TINH_TW_GIAO_KE_HOACH) {
      this.trangThai = 'Trung  ương giao kế hoạch cho tỉnh';
    }
    if (this._chiTietKH.status === STATUS.STATUS_KHDUTHAO_TINH_KE_HOACH_DA_DUOC_DIEU_CHINH) {
      this.trangThai = 'Trung ương điều chỉnh';
    }
    if (this._chiTietKH.status === STATUS.STATUS_KHDUTHAO_TINH_CHO_DUYET_XIN_DIEU_CHINH) {
      this.trangThai = 'Chờ duyệt';
    }
    if (this._chiTietKH.status === STATUS.STATUS_KHDUTHAO_TINH_TW_TU_CHOI_DIEU_CHINH) {
      this.trangThai = 'Từ chối';
    }
    if (this._chiTietKH.status === STATUS.STATUS_KHDUTHAO_TINH_TW_CHAP_NHAN_DIEU_CHINH) {
      this.trangThai = 'Đã duyệt';
    }
  }
}
