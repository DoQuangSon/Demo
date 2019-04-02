import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IMyDpOptions } from 'mydatepicker';
import { MYDATEPICKER_VI_OPTIONS } from '../../../../../../constants';
import { TIME_OPTIONS } from '../../../../../../constants/ql-baocao-ttkt-tinh.constants';

@Component({
  selector: 'ttkt-taomoi-so-tonghop-kq-tw',
  templateUrl: './taomoi-so-tonghop-kq-tw.component.html',
  styleUrls: ['./taomoi-so-tonghop-kq-tw.component.scss']
})
export class TaomoiSoTonghopKqTwComponent implements OnInit {

  public myDatePickerOptions: IMyDpOptions = MYDATEPICKER_VI_OPTIONS;
  creatSoTongHopKQForm: FormGroup;
  displayKQ: Boolean = false;
  options: any;
  quy_option: any;
  thang_option: any;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

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
  thucHienKHMau03 = [
    {
      id: 1,
      noiDungKH: 'Đơn vị nội bộ',
      thucHienKH: '',
      lienNganhKH: '',
      trongKyCoQuan: '',
      luyKeCoQuan: '',
      trongKyLienNganh: '',
      luyKeLienNganh: '',
    },
    {
      id: 2,
      noiDungKH: 'Đơn vị SDLĐ',
      thucHienKH: '',
      lienNganhKH: '',
      trongKyCoQuan: '',
      luyKeCoQuan: '',
      trongKyLienNganh: '',
      luyKeLienNganh: '',
    },
    {
      id: 3,
      noiDungKH: 'Cơ sở KCB BHYT',
      thucHienKH: '',
      lienNganhKH: '',
      trongKyCoQuan: '',
      luyKeCoQuan: '',
      trongKyLienNganh: '',
      luyKeLienNganh: '',
    },
    {
      id: 4,
      noiDung: 'Đại lý thu, đại diện chi trả',
      thucHienKH: '',
      lienNganhKH: '',
      trongKyCoQuan: '',
      luyKeCoQuan: '',
      trongKyLienNganh: '',
      luyKeLienNganh: '',
    }
  ];
  ndSoKyTruoc = [
    {
      id: 1,
      noiDung: 'Số tiền truy đóng phải tiếp tục thu',
      trongKy: '',
      luyKe: '',
    },
    {
      id: 2,
      noiDung: 'Số tiền lãi truy đóng phải tiếp tục thu',
      trongKy: '',
      luyKe: '',
    },
    {
      id: 3,
      noiDung: 'Số tiền phải hoàn trả hoặc điều chỉnh giảm',
      trongKy: '',
      luyKe: '',
    },
    {
      id: 4,
      noiDung: 'Số tiền phải thu hồi về quỹ BHXH',
      trongKy: '',
      luyKe: '',
    },
  ];
  ndThuBHXH = [
    {
      id: 1,
      noiDung: 'Số lao động chưa đóng, đóng thiếu thời gian',
      trongKy: '',
      luyKe: '',
    },
    {
      id: 2,
      noiDung: 'Số lao động đóng sai đối tượng, đóng sai thời gian',
      trongKy: '',
      luyKe: '',
    },
    {
      id: 3,
      noiDung: 'Số tiền truy đóng do chưa đóng, đóng thiếu thời gian',
      trongKy: '',
      luyKe: '',
    },
    {
      id: 4,
      noiDung: 'Số tiền lãi truy đóng do chưa đóng, đóng thiếu thời gian',
      trongKy: '',
      luyKe: '',
    },
    {
      id: 5,
      noiDung: 'Số lao động đóng sai mức quy định',
      trongKy: '',
      luyKe: '',
    },
  ];
  ndSoBHXH = [
    {
      id: 1,
      noiDung: 'Số lao động chưa được cấp sổ BHXH',
      trongKy: '',
      luyKe: '',
    },
    {
      id: 2,
      noiDung: 'Số sổ BHXH chưa trả cho người lao động',
      trongKy: '',
      luyKe: '',
    },
    {
      id: 3,
      noiDung: 'Số sổ BHXH ghi sai nội dung trên sổ',
      trongKy: '',
      luyKe: '',
    },
  ];
  ndTheBHYT = [
    {
      id: 1,
      noiDung: 'Số LĐ chưa được cấp thẻ BHYT',
      trongKy: '',
      luyKe: '',
    },
    {
      id: 2,
      noiDung: 'Số thẻ sai mã quyền lợi',
      trongKy: '',
      luyKe: '',
    },
    {
      id: 3,
      noiDung: 'Số thẻ BHYT có dấu hiệu cấp trùng',
      trongKy: '',
      luyKe: '',
    },
    {
      id: 4,
      noiDung: 'Số thẻ BHYT cấp sai đối tượng',
      trongKy: '',
      luyKe: '',
    },
  ];
  ndChinhSachBHXH = [
    {
      id: 1,
      noiDung: 'Số lượt lao động hưởng BHXH ngắn hạn sai quy định',
      trongKy: '',
      luyKe: '',
    },
    {
      id: 2,
      noiDung: 'Số lao động hưởng BHXH dài hạn sai quy định',
      trongKy: '',
      luyKe: '',
    },
    {
      id: 3,
      noiDung: 'Số lao động hưởng thiếu tiền BHXH',
      trongKy: '',
      luyKe: '',
    },
    {
      id: 4,
      noiDung: 'Số đối tượng hưởng thiếu tiền BHXH',
      trongKy: '',
      luyKe: '',
    },
    {
      id: 5,
      noiDung: 'Số tiền phải hoàn trả đối tượng hưởng BHXH',
      trongKy: '',
      luyKe: '',
    },
  ];
  ndChinhSachBHYT = [
    {
      id: 1,
      noiDung: 'Số tiền phải thu hồi về quỹ BHYT do cơ sở KCB BHYT chi sai quy định',
      trongKy: '',
      luyKe: '',
    },
  ];
  ndThucHienKL = [
    {
      id: 1,
      noiDung: 'Số tiền truy đóng đã thu',
      trongKy: '',
      luyKe: '',
    },
    {
      id: 2,
      noiDung: 'Số tiền lãi truy đóng đã thu',
      trongKy: '',
      luyKe: '',
    },
    {
      id: 3,
      noiDung: 'Số tiền đã hoàn trả hoặc điều chỉnh giảm',
      trongKy: '',
      luyKe: '',
    },
    {
      id: 4,
      noiDung: 'Số tiền đã hoàn trả hoặc điều chỉnh giảm',
      trongKy: '',
      luyKe: '',
    },
    {
      id: 5,
      noiDung: 'Số tiền đã thu hồi về quỹ BHYT',
      trongKy: '',
      luyKe: '',
    },
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

  showTongHopKQ() {
    this.displayKQ = true;
  }

  closeTaoMoiSoTongHopKQ() {
    this.router.navigate(['/ql-hd-ttkt/ql-baocao-ttkt/tw/so-tong-hop-kq']);
  }

}
