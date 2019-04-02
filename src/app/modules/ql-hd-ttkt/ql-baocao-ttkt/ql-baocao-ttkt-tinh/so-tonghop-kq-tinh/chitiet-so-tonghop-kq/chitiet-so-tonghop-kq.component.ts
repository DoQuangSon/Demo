import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'ttkt-chitiet-so-tonghop-kq',
  templateUrl: './chitiet-so-tonghop-kq.component.html',
  styleUrls: ['./chitiet-so-tonghop-kq.component.scss']
})
export class ChitietSoTonghopKqComponent implements OnInit {
  public typeAccount: string = 'TINH';

  constructor(
    private location: Location
  ) { }

  ngOnInit() {
  }

  onBack() {
    this.location.back();
  }
}
