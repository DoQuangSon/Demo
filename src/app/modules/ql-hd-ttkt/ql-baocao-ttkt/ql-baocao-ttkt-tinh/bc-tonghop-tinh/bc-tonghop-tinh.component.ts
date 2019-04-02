import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'ttkt-bc-tonghop-tinh',
  templateUrl: './bc-tonghop-tinh.component.html',
  styleUrls: ['./bc-tonghop-tinh.component.scss']
})
export class BcTonghopTinhComponent implements OnInit {

  baoCaoTongHopForm: FormGroup;

  dsBaoCaoTongHop = [
    {
      id: 1,
      quy: 'I',
      nam: 2017,
      thoiGianLap: '10/01/2017',
      trangThai_id: 0,
      trangThai: 'Chưa gửi'
    },
    {
      id: 2,
      quy: 'II',
      nam: 2017,
      thoiGianLap: '10/04/2017',
      trangThai_id: 0,
      trangThai: 'Chưa gửi'
    },
    {
      id: 3,
      quy: 'III',
      nam: 2017,
      thoiGianLap: '10/07/2017',
      trangThai_id: 1,
      trangThai: 'Đã gửi'
    },
    {
      id: 4,
      quy: 'IV',
      nam: 2017,
      thoiGianLap: '10/10/2017',
      trangThai_id: 1,
      trangThai: 'Đã gửi'
    }
  ];

  dsBaoCaoLinhVuc = [
    {
      id: 1,
      name: 'Kết quả thực hiện kết luận TTKT',
      thoiGianLap: '10/01/2017',
    },
    {
      id: 2,
      name: 'Báo cáo kết quả thanh tra, kiểm tra công tác thu quý II năm 2017',
      thoiGianLap: '10/04/2017',
    },
    {
      id: 3,
      name: 'Kết quả công tác TTKT đóng BHXH, BHTN, BHYT quý III năm 2017',
      thoiGianLap: '10/07/2017',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.baoCaoTongHopForm = this.fb.group({
      search: ['']
    });
  }

  chiTietBCTongHopTinh(index) {
    this.router.navigate(['/ql-hd-ttkt/ql-baocao-ttkt/tinh/bc-tonghop-tinh/chitiet-bc-tonghop-tinh', index]);
  }

  taoMoiBCTongHopTinh() {
    this.router.navigate(['/ql-hd-ttkt/ql-baocao-ttkt/tinh/bc-tonghop-tinh/taomoi-bc-tonghop-tinh']);
  }

  taoMoiBCLinhVucTinh() {
    this.router.navigate(['/ql-hd-ttkt/ql-baocao-ttkt/tinh/bc-tonghop-tinh/taomoi-bc-linhvuc-tinh']);
  }

}
