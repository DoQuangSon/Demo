import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { DanhSachKeHoachTableComponent } from '../xay-dung-ke-hoach-trung-uong/danh-sach-ke-hoach-table/danh-sach-ke-hoach-table.component';
import { cloneDeep } from 'lodash';
import { FileResourceService } from '../../../../../services/helper/file-resource.service';
import { AlertService } from '../../../../../services/api/alert.service';
import { TimeBuilderService } from '../../../../../services/helper/time-builder.service';
import { KeHoachToanNganhService } from '../../../../../services/api/ke-hoach-toan-nganh/ke-hoach-toan-nganh.service';
@Component({
  selector: 'ttkt-ke-hoach-da-giao-cho-tinh',
  templateUrl: './ke-hoach-da-giao-cho-tinh.component.html',
  styleUrls: ['./ke-hoach-da-giao-cho-tinh.component.scss']
})
export class KeHoachDaGiaoChoTinhComponent implements OnInit {
  @ViewChild('dsChinhSua') dsChinhSua: DanhSachKeHoachTableComponent;
  currentYear = (new Date()).getFullYear();
  listYear: any[] = [];
  public listKeHoach: any[] = [];
  selectYear: FormControl;
  public isDaGiao: boolean = true;
  tenKh: string;
  nguoiKi: string;
  soQd: number;
  nguoiTao: string;
  ngay: string;
  fileQd: any;
  tenFile: any;
  urlFileDownload: any;
  number: any;
  isDisabledTaiFile: boolean;
  coDieuChinh: boolean;
  disableDaGui: boolean;
  listHistory: Array<any> = [];
  listBanDau: Array<any> = [];
  isShowBtnLichSu: boolean;
  thongTinDC: any;
  listDaChinhSua: any[] = [];

  thongTinDCForm: FormGroup = new FormGroup({});

  constructor(
    private location: Location,
    private router: ActivatedRoute,
    private keHoachService: KeHoachToanNganhService,
    private fileResource: FileResourceService,
    private alertService: AlertService,
    private timeBuilder: TimeBuilderService,

  ) { }


  ngOnInit() {
    this.isShowBtnLichSu = false;
    this.coDieuChinh = false;
    this.router.params.subscribe(params => {
      if (params['year']) {
        this.selectYear = new FormControl(params['year']);
      } else {
        this.selectYear = new FormControl(this.currentYear);
      }
    });
    this.getListYear();
    this.getListKeHoach(this.selectYear.value);
    this.getListLichSuKHDaGiao();
    this.disableDaGui = true;
  }
  setValueDefalse() {
    this.isDisabledTaiFile = true;
    this.tenKh = '';
    this.nguoiKi = '';
    this.number = null;
    this.ngay = '';
    this.fileQd = null;
    this.tenFile = null;
    this.urlFileDownload = null;
    this.soQd = null;
    this.nguoiTao = null;

  }
  getListKeHoach(year) {
    this.keHoachService.getListTwXemDanhSachKeHoachDaGiaoChoTinh(year)
      .subscribe(res => {
        if (res[0] !== null && res[0] !== undefined) {
          this.tenKh = res[0].tenKeHoach;
          this.nguoiKi = res[0].nguoiKyQDTaoKeHoach;
          this.soQd = res[0].soQuyetDinhTaoKeHoach;
          this.ngay = res[0].ngayQuyetDinhTaoKeHoach;
          this.nguoiTao = res[0].tenNguoiTao;
          this.urlFileDownload = JSON.parse(res[0].fileQuyetDinhTaoKH);
          this.tenFile = this.urlFileDownload[0].fileName;
          this.isDisabledTaiFile = false;
        } else {
          this.setValueDefalse();
        }
        this.listKeHoach = res;
        this.listBanDau = cloneDeep(res);
      }, err => { });
  }

  changeYear(e: any) {
    this.listKeHoach = [];
    this.getListKeHoach(Number(e.target.value));
    this.listHistory = [];
    this.getListLichSuKHDaGiao();
  }

  getListYear() {
    for (let i = -3; i < 20; i++) {
      const year = this.currentYear + i;
      this.listYear.push(year);
    }
  }

  onBack() {
    this.location.back();
  }
  downLoadFile() {
    this.fileResource.downloadFile(this.urlFileDownload[0].url).subscribe(blob => {
      this.fileResource.saveFile(blob, this.urlFileDownload[0].fileName);
    }, err => { });
  }
  onDieuChinh() {
    this.coDieuChinh = true;
    this.thongTinDCForm.reset();
  }

  getListLichSuKHDaGiao() {
    this.keHoachService.getListLichSuDaGiao(this.selectYear.value).subscribe(data => {
      this.listHistory = data;
      if (this.listHistory.length > 1) {
        this.isShowBtnLichSu = true;
      } else {
        this.isShowBtnLichSu = false;
      }
    });
  }
  gui() {
    console.log(this.thongTinDCForm);
    if (this.thongTinDCForm.invalid) {
      this.alertService.error('Cần điền đủ thông tin');
      return;
    } else {
      this.thongTinDC = this.thongTinDCForm.value;

      this.listDaChinhSua = this.dsChinhSua.listKeHoach;
      const listChinhSua = this.listDaChinhSua.map(res => {
        res.ngayDieuChinh = this.timeBuilder.fromTimeDatePicker(this.thongTinDC.ngayDieuChinh).setUTC().toISOString();
        res.soQuyetDinhDieuChinh = this.thongTinDC.soQDDC;
        res.lyDoDieuChinh = this.thongTinDC.lyDoDC;
        res.fileQuyetDinhDieuChinh = JSON.stringify(this.thongTinDC.fileQD);
        res.tenNguoiTao = this.thongTinDC.nguoiTao;
        res.nguoiKyQDTaoKeHoach = this.thongTinDC.nguoiKi;
        // res.tenHienThi = this.thongTinDC.tenHienThi;
        return res;
      });
      this.keHoachService.updateDieuChinhDaGiao(this.listBanDau, listChinhSua).subscribe(
        res => {
          if (res === 'not change') {
            this.alertService.error('Dữ liệu không có gì thay đổi!');
            return;
          }
          this.alertService.success('Điều chỉnh thành công!');
          this.getListKeHoach(this.selectYear.value);
          this.getListLichSuKHDaGiao();
          this.coDieuChinh = false;
        },
        // tslint:disable-next-line:no-unused-expression
        () => this.alertService.error('Điều chỉnh thất bại!'));
    }
  }
}
