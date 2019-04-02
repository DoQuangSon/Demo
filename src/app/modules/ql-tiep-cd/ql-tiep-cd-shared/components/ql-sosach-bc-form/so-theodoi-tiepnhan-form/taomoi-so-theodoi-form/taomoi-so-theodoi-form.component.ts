import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { IMyDpOptions } from 'mydatepicker';
import { ModalDirective } from 'ngx-bootstrap';
import { MYDATEPICKER_VI_OPTIONS } from '../../../../../../../constants';
import { AlertService } from '../../../../../../../services/api/alert.service';
import { NoiSoTheodoiTiepnhanService } from '../../../../../../../services/api/noi-ql-sosach-tiepcd/noi-so-theodoi-tiepnhan/noi-so-theodoi-tiepnhan.service';
import { TimeBuilderService } from '../../../../../../../services/helper/time-builder.service';
import { TIME_OPTIONS } from '../../../../../../../constants/tiep-cong-dan.constants';
import { AuthService } from '../../../../../../../auth/auth.service';

@Component({
  selector: 'ttkt-taomoi-so-theodoi-form',
  templateUrl: './taomoi-so-theodoi-form.component.html',
  styleUrls: ['./taomoi-so-theodoi-form.component.scss']
})
export class TaomoiSoTheodoiFormComponent implements OnInit {
  @Input() typeAccount: string;
  @ViewChild('duyetModal') public duyetModal: ModalDirective;

  public dt: Date = new Date();
  public minDate: Date = void 0;
  public dateDisabled: { date: Date, mode: string }[];
  public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;

  creatsoTheoDoiForm: FormGroup;
  displayKQ: Boolean = false;
  options: any;
  quy_option: any;
  thang_option: any;
  tongHopKQ: Boolean = false;

  luu: boolean = false;
  duyet: boolean = false;
  dieuChinh: boolean = false;

  dmbhxhid: any;
  DON_THU_STATUS_DANG_XU_LY = 1;
  DON_THU_STATUS_DA_XU_LY = 2;
  status: any = ['', 'Đang xử lý', 'Đã xử lý'];

  quyOptions = [
    { id: 1, quy: '1', },
    { id: 2, quy: '2' },
    { id: 3, quy: '3' },
    { id: 4, quy: '4' }
  ];
  thangOptions = [
    { id: 1, thang: '1', },
    { id: 2, thang: '2' },
    { id: 3, thang: '3' },
    { id: 4, thang: '4' },
    { id: 5, thang: '5', },
    { id: 6, thang: '6' },
    { id: 7, thang: '7' },
    { id: 8, thang: '8' },
    { id: 9, thang: '9', },
    { id: 10, thang: '10' },
    { id: 11, thang: '11' },
    { id: 12, thang: '12' }
  ];

  chiTietKQ = [];

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private alertService: AlertService,
    private noiSoTheodoiTiepnhanService: NoiSoTheodoiTiepnhanService,
    private timeBuilder: TimeBuilderService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.creatsoTheoDoiForm = this.fb.group({
      tenSo: [''],
      soNumber: [''],
      quy: [''],
      ngay: [''],
      thang: [''],
      options: ['']
    });
    this.quy_option = TIME_OPTIONS.quy;
    this.thang_option = TIME_OPTIONS.thang;
    this.dmbhxhid = this.auth.currentUser.donViId;
  }

  changeOption() {
    this.options = this.creatsoTheoDoiForm.value.options;
    if (this.options === '1') {
      this.creatsoTheoDoiForm.patchValue({
        quy: 0,
        thang: 0,
      });
    } else if (this.options === '2') {
      this.creatsoTheoDoiForm.patchValue({
        quy: 0,
        thang: 0,
      });
    }
  }

  onBack() {
    this.location.back();
  }

  showTongHopKQ() {
    this.tongHopKQ = true;
  }

  onLuu() {
    this.luu = true;
  }

  onDieuChinh() {
    this.luu = false;
    this.dieuChinh = false;
  }

  onDuyet() {
    this.duyetModal.show();
  }

  onSubmitDuyet() {
    this.duyetModal.hide();
    this.alertService.success('Đã duyệt sổ theo dõi tiếp nhận');
  }

  onGetTongHopKQ() {
    this.tongHopKQ = true;
    const formBody: any = {};
    const formValue: any = this.creatsoTheoDoiForm.value || {};
    formBody.ngay = formValue.ngay || null;
    const year = this.timeBuilder.current().get(this.timeBuilder.YEAR);
    formBody.year = year;
    const quy = formValue.quy || '';
    formBody.quy = (this.quyOptions.find(el => {
      return Number(el.id) === Number(quy);
    }) || { quy: null }).quy;
    const thang = formValue.thang || '';
    formBody.month = (this.thangOptions.find(el => {
      return Number(el.id) === Number(thang);
    }) || { thang: null }).thang;
    // formBody.quy = formValue.quy || null;
    // formBody.month = formValue.thang || null;
    formBody.ngay = formValue.ngay || null;
    formBody.dmbhxhId = this.auth.currentUser.donViId;
    this.noiSoTheodoiTiepnhanService.getTongHopSoTheoDoi(formBody)
      .subscribe(res => {
        if (res) {
          this.chiTietKQ = [];
          this.chiTietKQ = res.map((el) => {
            const chiTietKQ_Obj: any = {};
            chiTietKQ_Obj.soCVDen = el.soCongVanDen || '';
            chiTietKQ_Obj.ngayTiepNhan = this.timeBuilder.fromString(el.ngayTiepNhan).get();
            chiTietKQ_Obj.hoTenCD = el.hoTenCongDan || '';
            chiTietKQ_Obj.diaChiCD = el.diaChiCongDan || '';
            chiTietKQ_Obj.noiDung = el.noiDung || '';
            chiTietKQ_Obj.phanLoaiDon = el.tenPhanLoaiNoiDung || '';
            chiTietKQ_Obj.isDuDieuKienXuLy = el.isDuDieuKienXuLy || null;
            chiTietKQ_Obj.isThuocThamQuyen = el.isThuocThamQuyen || null;
            chiTietKQ_Obj.trangThai = this.status[el.status];
            return chiTietKQ_Obj;
          });
        }
        console.log(this.chiTietKQ);
      }, err => {
        this.alertService.error('Lỗi tổng hợp kết quả sổ theo dõi');
      });
  }

}
