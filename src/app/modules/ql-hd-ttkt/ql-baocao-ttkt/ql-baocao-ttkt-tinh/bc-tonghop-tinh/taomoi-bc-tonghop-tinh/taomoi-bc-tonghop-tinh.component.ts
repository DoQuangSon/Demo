import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap';
import { IMyDpOptions } from 'mydatepicker';
import { Location } from '@angular/common';
import { MYDATEPICKER_VI_OPTIONS } from '../../../../../../constants';
import { TIME_OPTIONS } from '../../../../../../constants/ql-baocao-ttkt-tinh.constants';
import { AlertService } from '../../../../../../services/api/alert.service';
import { MESS_QL_BAOCAO_TTKT } from '../../../../../../constants/message.constants';

@Component({
  selector: 'ttkt-taomoi-bc-tonghop-tinh',
  templateUrl: './taomoi-bc-tonghop-tinh.component.html',
  styleUrls: ['./taomoi-bc-tonghop-tinh.component.scss']
})
export class TaomoiBcTonghopTinhComponent implements OnInit {
  @ViewChild('duyetModal') public duyetModal: ModalDirective;
  @ViewChild('guiModal') public guiModal: ModalDirective;

  public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;
  creatBCTongHopTinhForm: FormGroup;
  displayKQ: Boolean = false;
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

  guiModalForm: FormGroup;
  guiModalFormSubmited: boolean = false;

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
  thucHienTTKT = [
    {
      id: 1,
      noiDung: 'Số cuộc thanh tra',
      maTieuThuc: 'I.1',
      soThucHien: '',
      ghiChu: ''
    },
    {
      id: 2,
      noiDung: 'Số đơn vị được thanh tra',
      maTieuThuc: 'I.2',
      soThucHien: '',
      ghiChu: ''
    },
    {
      id: 3,
      noiDung: 'Số cuộc kiểm tra',
      maTieuThuc: 'I.3',
      soThucHien: '',
      ghiChu: ''
    },
    {
      id: 4,
      noiDung: 'Số cơ quan BHXH được kiểm tra',
      maTieuThuc: 'I.4',
      soThucHien: '',
      ghiChu: ''
    },
    {
      id: 5,
      noiDung: 'Số đơn vị SDLĐ được kiểm tra',
      maTieuThuc: 'I.5',
      soThucHien: '',
      ghiChu: ''
    },
  ];
  ketQuaTTKT = [
    {
      id: 1,
      noiDung: 'Số lao động chưa đóng, đóng thiếu thời gian',
      maTieuThuc: 'II.1',
      soThucHien: '',
      ghiChu: ''
    },
    {
      id: 2,
      noiDung: 'Số lao động đóng sai đối tượng, đóng sai thời gian',
      maTieuThuc: 'II.2',
      soThucHien: '',
      ghiChu: ''
    },
    {
      id: 3,
      noiDung: 'Số tiền truy đóng do chưa đóng, đóng thiếu thời gian',
      maTieuThuc: 'II.3',
      soThucHien: '',
      ghiChu: ''
    },
    {
      id: 4,
      noiDung: 'Số tiền lãi truy đóng do chưa đóng, đóng thiếu thời gian',
      maTieuThuc: 'II.4',
      soThucHien: '',
      ghiChu: ''
    },
    {
      id: 5,
      noiDung: 'Số lao động đóng sai mức quy định',
      maTieuThuc: 'II.5',
      soThucHien: '',
      ghiChu: ''
    },
    {
      id: 6,
      noiDung: 'Số tiền truy đóng do đóng thiếu mức quy định',
      maTieuThuc: 'II.6',
      soThucHien: '',
      ghiChu: ''
    },
    {
      id: 7,
      noiDung: 'Số tiền lãi truy đóng do đóng thiếu mức quy định',
      maTieuThuc: 'II.7',
      soThucHien: '',
      ghiChu: ''
    },
  ];
  ketLuanTTKT = [
    {
      id: 1,
      noiDung: 'Số tiền truy đóng đã thu',
      maTieuThuc: 'III.1',
      soThucHien: '',
      ghiChu: ''
    },
    {
      id: 2,
      noiDung: 'Số tiền lãi truy đóng đã thu',
      maTieuThuc: 'III.2',
      soThucHien: '',
      ghiChu: ''
    },
    {
      id: 3,
      noiDung: 'Số tiền đã hoàn trả hoặc điều chỉnh giảm cho đơn vị',
      maTieuThuc: 'III.3',
      soThucHien: '',
      ghiChu: ''
    },
    {
      id: 3,
      noiDung: 'Số tiền đã thu hồi về quỹ BHXH',
      maTieuThuc: 'III.4',
      soThucHien: '',
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
      options: ['']
    });
    this.quy_option = TIME_OPTIONS.quy;
    this.thang_option = TIME_OPTIONS.thang;
    this.luyKe_option = TIME_OPTIONS.luyKe;
    this.guiModalForm = this.fb.group({
      noiDungLn: [''],
      inputSend: [''],
      loiNhanCuaTinh: ['', Validators.required]
    });
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

  onSend() {
    this.guiModalFormSubmited = false;
    this.guiModalForm.reset();
    this.guiModalForm.patchValue({
      inputSend: 'BHXH VN'
    });
    this.guiModal.show();
  }

  onSubmitSend() {
    this.guiModalForm.updateValueAndValidity();
    if (!this.guiModalForm.valid) {
      this.guiModalFormSubmited = true;
      return;
    }
    this.guiModal.hide();
    this.offAllButton();
    this.alertService.success(MESS_QL_BAOCAO_TTKT.SUCCESS_GUI_BC_TONGHOP);
  }

  showTongHopKQ() {
    this.displayKQ = true;
  }

  onBack() {
    this.location.back();
  }

}
