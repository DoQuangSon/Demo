import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { KeHoachToanNganhService } from '../../../../../services/api/ke-hoach-toan-nganh/ke-hoach-toan-nganh.service';

@Component({
  selector: 'ttkt-ke-hoach-xin-dieu-chinh-duoc-chap-nhan',
  templateUrl: './ke-hoach-xin-dieu-chinh-duoc-chap-nhan.component.html',
  styleUrls: ['./ke-hoach-xin-dieu-chinh-duoc-chap-nhan.component.scss']
})
export class KeHoachXinDieuChinhDuocChapNhanComponent implements OnInit {
  // tslint:disable-next-line:no-inferrable-types
  editGhichu: boolean = false;
  currentYear = (new Date()).getFullYear().valueOf();
  listYear: any[] = [];
  public listKeHoach: any[] = [];
  selectYear: FormControl;
  listGhiChu: any[] = [];

  constructor(
    private location: Location,
    private router: ActivatedRoute,
    private keHoachService: KeHoachToanNganhService,
  ) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      if (params['year']) {
        this.selectYear = new FormControl(params['year']);
      } else {
        this.selectYear = new FormControl(this.currentYear);
      }
    });
    this.getListYear();
    this.getListKeHoach(this.selectYear.value);
  }

  getListKeHoach(year) {
    this.keHoachService.getListTwXemDanhSachKeHoachTinhXinDieuChinhDaDuocChapNhan(year)
      .subscribe(res => {
        this.listKeHoach = res;
      }, err => { });
  }

  changeYear(e: any) {
    this.getListKeHoach(Number(e.target.value));
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

}
