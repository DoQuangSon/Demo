import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';
import { IMyDpOptions } from 'mydatepicker';
import { Location } from '@angular/common';
import { MYDATEPICKER_VI_OPTIONS } from '../../../../../../constants';
import { TIME_OPTIONS } from '../../../../../../constants/ql-baocao-ttkt-tinh.constants';
import { AlertService } from '../../../../../../services/api/alert.service';
import { MESS_QL_BAOCAO_TTKT } from '../../../../../../constants/message.constants';

@Component({
  selector: 'ttkt-taomoi-bc-linhvuc-tinh',
  templateUrl: './taomoi-bc-linhvuc-tinh.component.html',
  styleUrls: ['./taomoi-bc-linhvuc-tinh.component.scss']
})
export class TaomoiBcLinhvucTinhComponent implements OnInit {
  @ViewChild('duyetModal') public duyetModal: ModalDirective;

  public dt: Date = new Date();
  public minDate: Date = void 0;
  public dateDisabled: { date: Date, mode: string }[];
  public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;

  creatBCTongHopTinhForm: FormGroup;
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
  gui: boolean;
  duyet: boolean;
  // saved: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private location: Location
  ) { }

  namOptions = [
    {
      id: 1,
      nam: '2017',
    },
    {
      id: 2,
      nam: '2016'
    },
    {
      id: 3,
      nam: '2015'
    },
    {
      id: 4,
      nam: '2014'
    }
  ];
  quyOptions = [
    {
      id: 1,
      quy: 'I',
    },
    {
      id: 2,
      quy: 'II'
    },
    {
      id: 3,
      quy: 'III'
    },
    {
      id: 4,
      quy: 'IV'
    }
  ];
  thangOptions = [
    {
      id: 1,
      thang: '1',
    },
    {
      id: 2,
      thang: '2'
    },
    {
      id: 3,
      thang: '3'
    },
    {
      id: 4,
      thang: '4'
    },
    {
      id: 5,
      thang: '5',
    },
    {
      id: 6,
      thang: '6'
    },
    {
      id: 7,
      thang: '7'
    },
    {
      id: 8,
      thang: '8'
    },
    {
      id: 9,
      thang: '9',
    },
    {
      id: 10,
      thang: '10'
    },
    {
      id: 12,
      thang: '11'
    },
    {
      id: 4,
      thang: '12'
    }
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
  thucHienTTKT = [
    {
      id: 1,
      noiDung: 'Số đơn vị được TTCN',
      trongKy: '',
      luyKe: '',
      ghiChu: ''
    },
    {
      id: 2,
      noiDung: 'Số đơn vị được kiểm tra',
      trongKy: '',
      luyKe: '',
      ghiChu: ''
    },
    {
      id: 3,
      noiDung: 'Số đơn vị được TTKT liên ngành',
      trongKy: '',
      luyKe: '',
      ghiChu: ''
    },
  ];
  doiTuongDong = [
    {
      id: 1,
      noiDung: 'Số LĐ chưa đóng, đóng thiếu thời gian',
      trongKy: '',
      luyKe: '',
      ghiChu: ''
    },
    {
      id: 2,
      noiDung: 'Số tiền truy đóng do chưa đóng, đóng thiếu thời gian',
      trongKy: '',
      luyKe: '',
      ghiChu: ''
    },
    {
      id: 3,
      noiDung: 'Số tiền lãi truy đóng do chưa đóng, đóng thiếu thời gian',
      trongKy: '',
      luyKe: '',
      ghiChu: ''
    },
    {
      id: 4,
      noiDung: 'Số lao động đóng sai đối tượng, đóng thừa thời gian phải truy giảm',
      trongKy: '',
      luyKe: '',
      ghiChu: ''
    },
    {
      id: 5,
      noiDung: 'Số tiền hoàn trả do đóng sai đối tượng, đóng sai thời gian',
      trongKy: '',
      luyKe: '',
      ghiChu: ''
    },
  ];
  mucDong = [
    {
      id: 1,
      noiDung: 'Số LĐ đóng không đúng mức quy định',
      trongKy: '',
      luyKe: '',
      ghiChu: ''
    },
    {
      id: 2,
      noiDung: 'Số tiền truy đóng do đóng không đúng mức quy định',
      trongKy: '',
      luyKe: '',
      ghiChu: ''
    },
    {
      id: 3,
      noiDung: 'Số tiền lãi truy đóng do đóng thiếu mức quy định',
      trongKy: '',
      luyKe: '',
      ghiChu: ''
    },
  ];
  phuongThucDong = [
    {
      id: 1,
      noiDung: 'Số tiền các đơn vị sử dụng lao động nợ khi có QĐ thanh tra, kiểm tra',
      trongKy: '',
      luyKe: '',
      ghiChu: ''
    },
    {
      id: 2,
      noiDung: 'Số tiền nợ đóng đơn vị đã nộp trong thời gian thanh tra, kiểm tra',
      trongKy: '',
      luyKe: '',
      ghiChu: ''
    },
    {
      id: 3,
      noiDung: 'Số tiền nợ đóng được đơn vị nộp  khi thực hiện kết luận thanh tra, kiểm tra',
      trongKy: '',
      luyKe: '',
      ghiChu: ''
    },
  ];
  bienPhapXuLy = [
    {
      id: 1,
      noiDung: 'Số đơn vị đã lập Biên bản VPHC',
      trongKy: '',
      luyKe: '',
      ghiChu: ''
    },
    {
      id: 2,
      noiDung: 'Số Q.định xử phạt VPHC đã ban hành',
      trongKy: '',
      luyKe: '',
      ghiChu: ''
    },
    {
      id: 3,
      noiDung: 'Số tiền xử phạt VPHC phải thu',
      trongKy: '',
      luyKe: '',
      ghiChu: ''
    },
    {
      id: 4,
      noiDung: 'Số tiền xử phạt VPHC đã thu',
      trongKy: '',
      luyKe: '',
      ghiChu: ''
    },
    {
      id: 5,
      noiDung: 'Các biện pháp xử lý khác ... ',
      trongKy: '',
      luyKe: '',
      ghiChu: ''
    },
  ];

  ngOnInit() {
    this.setButton('tao');
    this.creatBCTongHopTinhForm = this.fb.group({
      tenBaoCao: [''],
      soNumber: [''],
      quy: [''],
      ngayLap: [''],
      thang: [''],
      luyKe_tuthang: [''],
      luyKe_denthang: [''],
      nam: [''],
      dsBaoCao: [''],
      options: ['']
    });
    this.quy_option = TIME_OPTIONS.quy;
    this.thang_option = TIME_OPTIONS.thang;
    this.luyKe_option = TIME_OPTIONS.luyKe;
  }

  changeOption() {
    this.options = this.creatBCTongHopTinhForm.value.options;
    if (this.options === '1') {
      this.creatBCTongHopTinhForm.patchValue({
        quy: 0,
        thang: 0,
        luyKe_tuthang: 0,
        luyKe_denthang: 0
      });
    } else if (this.options === '2') {
      this.creatBCTongHopTinhForm.patchValue({
        quy: 0,
        thang: 0,
        luyKe_tuthang: 0,
        luyKe_denthang: 0
      });
    } else {
      this.creatBCTongHopTinhForm.patchValue({
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
    this.gui = false;
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
      this.gui = true;
    }
  }

  onLuuTaoSua(key) {
    if (key === 'tao') {
      this.offAllButton();
      this.sua = true;
      this.duyet = true;
      // this.saved = true;
      this.alertService.success(MESS_QL_BAOCAO_TTKT.SUCCESS_SAVE_BC_TONGHOP);
    } else {
      this.offAllButton();
      this.sua = true;
      this.duyet = true;
      // this.saved = true;
      this.alertService.success(MESS_QL_BAOCAO_TTKT.SUCCESS_SAVE_EDIT_BC_TONGHOP);
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
    this.gui = true;
    this.luuDieuChinh = true;
    this.duyetModal.hide();
    this.alertService.success(MESS_QL_BAOCAO_TTKT.SUCCESS_DUYET_BC_TONGHOP);
  }

  showTongHopKQ() {
    const formValue = this.creatBCTongHopTinhForm.value;
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
