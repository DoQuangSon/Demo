import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TRANG_THAI, DIEU_CHINH, LOAIHINHTTKT } from '../../../../../constants/ke-hoach-ttkt.constants';
import { STATUS } from '../../../../../constants/status.constants';
import { MYDATEPICKER_VI_OPTIONS } from '../../../../../constants';
import { IMyDpOptions } from 'mydatepicker';
import { ITinhChuaGui } from './ITinhChuaGu.interface';
import { KeHoachToanNganhService } from '../../../../../services/api/ke-hoach-toan-nganh/ke-hoach-toan-nganh.service';
import { NoiDmTinhHuyenService } from '../../../../../services/api/danh-muc/noi-dmTinhHuyen/noi-dm-tinh-huyen.service';
import { AlertService } from '../../../../../services/api/alert.service';

@Component({
  selector: 'ttkt-xay-dung-ke-hoach-trung-uong',
  templateUrl: './xay-dung-ke-hoach-trung-uong.component.html',
  styleUrls: ['./xay-dung-ke-hoach-trung-uong.component.scss']
})

export class XayDungKeHoachTrungUongComponent implements OnInit {
  @ViewChild('keHoachTable') keHoachTable;
  @ViewChild('printDocument') printDocument: ModalDirective;
  @ViewChild('dsTinhChuaGuiModal') dsTinhChuaGuiModal: ModalDirective;

  isCollapseDirective: boolean = false;
  title: string;
  displayNoticeDelete: boolean;
  currentYear = (new Date()).getFullYear().valueOf();
  listYear: any[] = [];
  public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;
  public sumKeHoach: number = 63;
  public currentKeHoach: number = 0;
  public listKeHoach: any[] = [];
  // listKeHoachChoduyet: any[] = [];
  selectYear: FormControl;
  formSearch: FormGroup;
  trangThai: any[] = TRANG_THAI;
  tinhThanh: any[] = [];
  dieuChinh: any[] = DIEU_CHINH;
  // hinhThuc: any[] = LOAIHINHTTKT;
  tempForSearch: any;
  // stateDuyet = [
  //   { id: 1, name: 'Chưa duyệt' },
  //   { id: 2, name: 'Đã duyệt' }
  // ];
  dsTinhChuaGui = [];
  loiNhan: FormControl = new FormControl('');
  listSelectTinhChuaGuiKh: ITinhChuaGui[] = [];
  isDisabledGui: boolean;
  constructor(
    private builder: FormBuilder,
    private router: Router,
    private keHoachService: KeHoachToanNganhService,
    private noiDmTinhHuyenService: NoiDmTinhHuyenService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.getListTinhThanh();
    this.initListYear();
    this.getListKeHoachChuaGui();
    this.selectYear = new FormControl(this.currentYear);
    this.getListKeHoach(this.currentYear);
    this.formSearch = this.builder.group({
      searchTinh: ['']
    });
    this.isDisabledGui = true;
  }

  getListKeHoach(year) {
    this.keHoachService.getListKeHoachTWDaDuyet(year)
      .subscribe(res => {
        this.listKeHoach = res;
        this.tempForSearch = this.listKeHoach;
        this.currentKeHoach = this.listKeHoach.length;
      }, err => { });
  }
  getListKeHoachChuaGui() {
    this.keHoachService.getListTinhChuaGui(this.currentYear)
      .subscribe(res => this.dsTinhChuaGui = res, err => { });
  }

  changeYear(e: any) {
    this.currentYear = Number(e.target.value);
    this.getListKeHoach(this.currentYear);
    this.getListKeHoachChuaGui();
  }

  initListYear() {
    for (let i = -3; i < 20; i++) {
      const year = this.currentYear + i;
      this.listYear.push(year);
    }
  }

  goToKhChoDuyet() {
    this.router.navigate([`/ql-hd-ttkt/kh-ttkt/trung-uong/ke-hoach-toan-nganh/ke-hoach-cho-duyet`]);
    return false;
  }

  goToGiaoKeHoachChoCacTinh() {
    const year = this.selectYear.value;
    this.router.navigate(['/ql-hd-ttkt/kh-ttkt/trung-uong/ke-hoach-bhxh-vn-giao/giao-ke-hoach-cho-cac-tinh/' + year]);
  }

  goToKeHoachDaGiaoChoTinh() {
    const year = this.selectYear.value;
    this.router.navigate(['/ql-hd-ttkt/kh-ttkt/trung-uong/ke-hoach-bhxh-vn-giao/ke-hoach-da-giao-cho-tinh/' + year]);
  }

  goToKeHoachTinhXinDieuChinhDaDuocChapNhan() {
    const year = this.selectYear.value;
    this.router.navigate(['/ql-hd-ttkt/kh-ttkt/trung-uong/ke-hoach-toan-nganh/ke-hoach-xin-dieu-chinh-duoc-chap-nhan/' + year]);
  }

  goToTimKiem() {
    this.router.navigate(['/ql-hd-ttkt/kh-ttkt/trung-uong/ke-hoach-toan-nganh/tim-kiem']);
  }

  inBaoCaoTongHop() {
    // const jframe = document.getElementById('iframePrint');
    // jframe.setAttribute('src', './../../../../../assets/print-document/BaoCao02.html');
    // this.printDocument.show();

    this.keHoachService.printListKeHoachTWDaDuyet(this.currentYear).subscribe(res => {
      const file = this.keHoachService.loadPdf(res);
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    }, err => { console.log('in bị lỗi'); });
  }

  popUpDsTinhChuaGui() {
    this.title = 'Danh sách các tỉnh chưa gửi';
    this.displayNoticeDelete = true;
    this.isDisabledGui = true;
    this.dsTinhChuaGuiModal.show();
    this.getListKeHoachChuaGui();
  }
  getListTinhThanh() {
    this.noiDmTinhHuyenService.getAllDmTinhHuyen(0, 1000)
      .subscribe(res => this.tinhThanh = res['content'], err => { });
  }

  close() {
    this.listSelectTinhChuaGuiKh = [];
    this.dsTinhChuaGuiModal.hide();
  }

  getTinhThanh(id) {
    return this.tinhThanh.find(el => el.id == id);
  }

  onTimKiem() {
    this.listKeHoach = this.tempForSearch;
    if (this.formSearch.value.searchTinh === '0') {
      this.listKeHoach = this.tempForSearch;
    } else {
      const result = this.listKeHoach.find(el => el.dmTinhHuyenId === Number(this.formSearch.value.searchTinh));
      if (!result) { this.listKeHoach = []; }
      return result;
    }
  }

  onSubmitPrintDocument() {

  }
  changeCheckboxThemMoi(item) {
    item.active = !item.active;
    this.addListDanhSachNhacNho(item);
    this.checkDisabledGui();
  }
  addListDanhSachNhacNho(item) {
    if (item.active) {
      this.listSelectTinhChuaGuiKh.push({ dmTinhHuyenId: item.id, loiNhan: 'TW nhắc nhở tỉnh chưa gửi kế hoạch!' });
    } else {
      const index = this.listSelectTinhChuaGuiKh.findIndex(el => el.dmTinhHuyenId === item.id);
      this.listSelectTinhChuaGuiKh.splice(index, 1);
    }
    this.listSelectTinhChuaGuiKh = [...this.listSelectTinhChuaGuiKh];
  }
  checkDisabledGui () {
    this.isDisabledGui = this.listSelectTinhChuaGuiKh.length <= 0;
  }
  gui() {
    if (this.listSelectTinhChuaGuiKh.length > 0) {
      this.keHoachService.guiDSNhacNhoTinhChuaGuiKH(this.listSelectTinhChuaGuiKh).subscribe(() => {
        this.dsTinhChuaGuiModal.hide();
        this.alertService.success('Gửi thông báo thành công!');
      }, err => {
        this.dsTinhChuaGuiModal.hide();
        this.alertService.error('Gửi thất bại!');
      });
    }else{
      this.alertService.error('Bạn phải chọn ít nhất 1 tỉnh');
    }
  }
  chonTatCa() {
    this.dsTinhChuaGui.map(data => {
      data.active = true;
      this.addListDanhSachNhacNho(data);
      this.checkDisabledGui();
    });
  }
  boTatCa() {
    this.dsTinhChuaGui.map(data => {
      data.active = false;
      this.addListDanhSachNhacNho(data);
      this.checkDisabledGui();
    });
  }
}
