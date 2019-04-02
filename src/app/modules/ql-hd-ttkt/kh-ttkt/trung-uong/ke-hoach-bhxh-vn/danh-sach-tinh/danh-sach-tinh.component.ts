import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'ttkt-danh-sach-tinh',
  templateUrl: './danh-sach-tinh.component.html',
  styleUrls: ['./danh-sach-tinh.component.scss']
})
export class DanhSachTinhComponent implements OnInit {
  // tslint:disable-next-line:no-inferrable-types
  public statusActive: string = 'KH_TTKT';
  constructor(
    private location: Location,
  ) { }

  ngOnInit() {
  }

  onBack() {
    this.location.back();
  }

}
