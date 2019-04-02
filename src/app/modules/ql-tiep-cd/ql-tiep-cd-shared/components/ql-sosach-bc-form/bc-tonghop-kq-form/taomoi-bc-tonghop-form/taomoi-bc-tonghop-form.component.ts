import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IMyDpOptions } from 'mydatepicker';
import { Location } from '@angular/common';
import { ModalDirective } from 'ngx-bootstrap';
import { MYDATEPICKER_VI_OPTIONS } from '../../../../../../../constants';
import { AlertService } from '../../../../../../../services/api/alert.service';
import { TIME_OPTIONS } from '../../../../../../../constants/tiep-cong-dan.constants';

@Component({
  selector: 'ttkt-taomoi-bc-tonghop-form',
  templateUrl: './taomoi-bc-tonghop-form.component.html',
  styleUrls: ['./taomoi-bc-tonghop-form.component.scss']
})
export class TaomoiBcTonghopFormComponent implements OnInit {
  @Input() typeAccount: string;
  @ViewChild('guiModal') public guiModal: ModalDirective;
  @ViewChild('duyetModal') public duyetModal: ModalDirective;

  public dt: Date = new Date();
  public minDate: Date = void 0;
  public dateDisabled: { date: Date, mode: string }[];
  public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;

  creatSoTongHopKQForm: FormGroup;
  displayKQ: Boolean = false;
  options: any;
  quy_option: any;
  thang_option: any;
  tongHopKQ: Boolean = false;

  luu: boolean = false;
  duyet: boolean = false;
  dieuChinh: boolean = false;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private alertService: AlertService
  ) { }

  // fake data
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

  dataGiaiQuyetDT = [
    {
      id: 1,
      donNhieuNguoiKy: '12',
      donMotNguoiKy: '10',
      tongDonTiepNhan: '100',
      donChuyenDenBHXH: '15',
      donTraLai: '14',
      donHuongDanDenCQThamQuyen: '11',
      donChuyenDenCQThamQuyen: '11',
      donLuu: '16',
      donDaGiaiQuyet: '90',
      donChuaGiaiQuyet: '10'
    },
    {
      id: 2,
      donNhieuNguoiKy: '6',
      donMotNguoiKy: '5',
      tongDonTiepNhan: '50',
      donChuyenDenBHXH: '8',
      donTraLai: '7',
      donHuongDanDenCQThamQuyen: '6',
      donChuyenDenCQThamQuyen: '6',
      donLuu: '8',
      donDaGiaiQuyet: '40',
      donChuaGiaiQuyet: '10'
    },
    {
      id: 3,
      donNhieuNguoiKy: '24',
      donMotNguoiKy: '20',
      tongDonTiepNhan: '200',
      donChuyenDenBHXH: '30',
      donTraLai: '28',
      donHuongDanDenCQThamQuyen: '22',
      donChuyenDenCQThamQuyen: '22',
      donLuu: '32',
      donDaGiaiQuyet: '180',
      donChuaGiaiQuyet: '20'
    }
  ];

  dataKhieuNai = [
    {
      id: 1,
      tongLuotTiep: '99',
      vuViecCu: '44',
      vuViecMoi: '44',
      coDonKemTheo: '11'
    }
  ];
  dataToCao = [
    {
      id: 1,
      tongLuotTiep: '88',
      vuViecCu: '33',
      vuViecMoi: '33',
      coDonKemTheo: '22'
    }
  ];
  dataKhieuNaiPA = [
    {
      id: 1,
      tongLuotTiep: '66',
      vuViecCu: '22',
      vuViecMoi: '22',
      coDonKemTheo: '22'
    }
  ];

  ngOnInit() {
    this.creatSoTongHopKQForm = this.fb.group({
      tenSo: [''],
      soNumber: [''],
      quy: [''],
      ngay: [''],
      thang: [''],
      options: ['']
    });
    this.quy_option = TIME_OPTIONS.quy;
    this.thang_option = TIME_OPTIONS.thang;
  }

  changeOption() {
    this.options = this.creatSoTongHopKQForm.value.options;
    if (this.options === '1') {
      this.creatSoTongHopKQForm.patchValue({
        quy: 0,
        thang: 0,
      });
    } else if (this.options === '2') {
      this.creatSoTongHopKQForm.patchValue({
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
    this.duyet = true;
    this.duyetModal.hide();
    this.alertService.success('Đã duyệt báo cáo');
  }

  onGui() {
    this.guiModal.show();
  }

  onSubmitGui() {
    this.guiModal.hide();
    this.alertService.success('Đã gửi báo cáo');
  }

}
