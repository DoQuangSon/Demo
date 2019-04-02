import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';
import { IMyDpOptions } from 'mydatepicker';
import { Location } from '@angular/common';
import { MYDATEPICKER_VI_OPTIONS } from '../../../../../../constants';
import { TIME_OPTIONS } from '../../../../../../constants/ql-baocao-ttkt-tinh.constants';
import { AlertService } from '../../../../../../services/api/alert.service';

@Component({
  selector: 'ttkt-taomoi-bc-tonghop-toannganh',
  templateUrl: './taomoi-bc-tonghop-toannganh.component.html',
  styleUrls: ['./taomoi-bc-tonghop-toannganh.component.scss']
})
export class TaomoiBcTonghopToannganhComponent implements OnInit {
  @ViewChild('duyetModal') public duyetModal: ModalDirective;

  public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;
  creatBCToanNganhForm: FormGroup;
  displayKQ: Boolean = false;
  baoCao_Option: any;
  options: any;
  quy_option: any;
  thang_option: any;
  luyKe_option: any;

  luuDieuChinh: boolean;
  luuSua: boolean;
  luuTao: boolean;
  sua: boolean;
  duyet: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private location: Location
  ) { }

  namOptions = [
    { id: 1, nam: '2017', },
    { id: 2, nam: '2016' },
    { id: 3, nam: '2015' },
    { id: 4, nam: '2014' }
  ];
  quyOptions = [
    { id: 1, quy: 'I', },
    { id: 2, quy: 'II' },
    { id: 3, quy: 'III' },
    { id: 4, quy: 'IV' }
  ];
  thangOptions = [
    { id: 1, thang: '1', },
    { id: 2, thang: '2' },
    { id: 3, thang: '3', },
    { id: 4, thang: '4' },
    { id: 5, thang: '5', },
    { id: 6, thang: '6' },
    { id: 7, thang: '7', },
    { id: 8, thang: '8' },
    { id: 9, thang: '9', },
    { id: 10, thang: '10' },
    { id: 11, thang: '11', },
    { id: 12, thang: '12' },
  ];
  dsTinhTP: any = [
    { id: 1, name: 'Hà Nội' },
    { id: 2, name: 'Đà Nẵng' },
    { id: 3, name: 'Hồ Chí Minh' },
    { id: 4, name: '.......' },
    { id: 5, name: 'Vụ TTKT' },
    { id: 6, name: 'Toàn ngành' },
  ];
  dsLoaiBaoCao: any = [
    { id: 1, name: 'Kết quả TTKT đóng BHXH, BHTN, BHYT (Mẫu 06)' },
    { id: 2, name: 'Bảng tổng hợp tình hình thực hiện kế hoạch thanh tra, kiểm tra (Mẫu 07)' },
    { id: 3, name: 'Kết quả thanh tra, kiểm tra công tác thu (Mẫu 08)' },
    { id: 4, name: 'Kết quả thanh tra, kiểm tra công tác cấp sổ, thẻ (Mẫu 09)' },
    { id: 5, name: 'Kết quả TTKT công tác giải quyết thanh quyết toán chế độ BHXH, BHYT (Mẫu 10)' },
    { id: 6, name: 'Kết quả thực hiện kết luận thanh tra, kiểm tra (Mẫu 11)' },
    { id: 7, name: 'Kết quả công tác thanh tra, kiểm tra đóng BHXH, BHTN, BHYT (Mẫu 12)' },
    { id: 8, name: 'Kết quả xử lý VPHC đã áp dụng trong thanh tra đóng BHXH, BHTN, BHYT (Mẫu 13)' },
    { id: 9, name: 'Lũy kế kết quả công tác TTKT đóng BHXH, BHTN, BHYT (Mẫu 14)' },
    { id: 10, name: 'Lũy kế kết quả xư lý VPHC đã áp dung trong thanh tra đóng BHXH, BHTN, BHYT (Mẫu 15)' },
    { id: 11, name: 'Bảng tổng hợp xây dựng kế hoạch thanh tra - kiểm tra (Mẫu 16)' },
  ];

  ngOnInit() {
    this.setButton('tao');
    this.creatBCToanNganhForm = this.fb.group({
      tenBaoCao: [''],
      soNumber: [''],
      quy: [''],
      ngayLap: [''],
      thang: [''],
      luyKe_tuthang: [''],
      luyKe_denthang: [''],
      nam: [''],
      dsBaoCao: [''],
      tinhTP: [''],
      options: ['']
    });
    this.quy_option = TIME_OPTIONS.quy;
    this.thang_option = TIME_OPTIONS.thang;
    this.luyKe_option = TIME_OPTIONS.luyKe;
  }

  changeOption() {
    this.options = this.creatBCToanNganhForm.value.options;
    if (this.options === '1') {
      this.creatBCToanNganhForm.patchValue({
        quy: 0,
        thang: 0,
        luyKe_tuthang: 0,
        luyKe_denthang: 0
      });
    } else if (this.options === '2') {
      this.creatBCToanNganhForm.patchValue({
        quy: 0,
        thang: 0,
        luyKe_tuthang: 0,
        luyKe_denthang: 0
      });
    } else {
      this.creatBCToanNganhForm.patchValue({
        quy: 0,
        thang: 0,
        luyKe_tuthang: 0,
        luyKe_denthang: 0
      });
    }
  }

  offAllButton() {
    this.luuDieuChinh = false;
    this.luuSua = false;
    this.luuTao = false;
    this.sua = false;
    this.duyet = false;
    // this.saved = false;
  }

  setButton(key) {
    if (key === 'tao') {
      this.offAllButton();
      this.luuTao = true;
    } else if (key === 'sua') {
      this.offAllButton();
      this.luuSua = true;
    } else if (key === 'dieuchinh') {
      this.offAllButton();
      this.luuDieuChinh = true;
    }
  }

  onLuuTaoSua(key) {
    if (key === 'tao') {
      this.offAllButton();
      this.sua = true;
      this.duyet = true;
      // this.saved = true;
      this.alertService.success('Lưu báo cáo thành công');
    } else {
      this.offAllButton();
      this.sua = true;
      this.duyet = true;
      // this.saved = true;
      this.alertService.success('Sửa báo cáo thành công');
    }
  }

  onSua() {
    this.setButton('sua');
  }

  onLuuDieuChinh() {
    this.offAllButton();
    this.luuTao = true;
    // this.duyet = true;
  }

  onDuyet() {
    this.duyetModal.show();
  }

  onSubmitDuyet() {
    this.offAllButton();
    this.luuDieuChinh = true;
    this.duyetModal.hide();
    this.alertService.success('Đã duyệt báo cáo toàn ngành');
  }

  showTongHopKQ() {
    const formValue = this.creatBCToanNganhForm.value;
    if (formValue.dsBaoCao !== '') {
      this.baoCao_Option = formValue.dsBaoCao;
      this.displayKQ = true;
    } else {
      this.displayKQ = false;
    }
  }

  onBack() {
    this.location.back();
  }

}
