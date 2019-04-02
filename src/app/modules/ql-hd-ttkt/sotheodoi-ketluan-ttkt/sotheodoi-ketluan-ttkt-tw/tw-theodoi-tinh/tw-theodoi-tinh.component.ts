import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ttkt-tw-theodoi-tinh',
  templateUrl: './tw-theodoi-tinh.component.html',
  styleUrls: ['./tw-theodoi-tinh.component.scss']
})
export class TwTheoDoiTinhComponent implements OnInit {
  isCollapseDirective: boolean = false;
  searchForm: FormGroup;

  constructor(
    private builder: FormBuilder,
    private router: Router
  ) { }

  DANH_SACH_NAM = [
    { 'nam': 2016 },
    { 'nam': 2017 },
    { 'nam': 2018 }];
  DANH_SACH_TINH = [
    { 'tinh': 'Hà Nội' },
    { 'tinh': 'Đà Nẵng' },
    { 'tinh': 'Hồ Chí Minh' }];
  DANH_SACH_QD = [
    {
      'tenQD': 'Quyết định thành lập đoàn TTKT TP Hà Nội đợt 1/2017',
      'tungay': '1/4/2017',
      'denngay': '30/4/2017'
    }, {
      'tenQD': 'Quyết định thành lập đoàn TTKT Quận Cầu Giấy đợt 1/2017',
      'tungay': '1/4/2017',
      'denngay': '30/4/2017'
    }, {
      'tenQD': 'Quyết định thành lập đoàn TTKT Quận Hai Bà Trưng đợt 1/2017',
      'tungay': '1/4/2017',
      'denngay': '30/4/2017'
    }, {
      'tenQD': 'Quyết định thành lập đoàn TTKT Quận Hoàn Kiếm đợt 1/2017',
      'tungay': '1/4/2017',
      'denngay': '30/4/2017'
    }
  ];

  ngOnInit() {
    this.searchForm = this.builder.group({
      nam_InForm: [''],
      tinh_InForm: ['']
    });
  }

  xemChiTietQD(index) {
    this.router.navigate(['/ql-hd-ttkt/ql-sotheodoi-ketluan-ttkt/tw/chitiet', index]);
  }
}
