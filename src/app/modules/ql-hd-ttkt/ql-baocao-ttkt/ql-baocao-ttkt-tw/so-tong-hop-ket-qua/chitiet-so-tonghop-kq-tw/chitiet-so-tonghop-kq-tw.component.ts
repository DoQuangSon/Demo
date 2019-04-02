import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'ttkt-chitiet-so-tonghop-kq-tw',
  templateUrl: './chitiet-so-tonghop-kq-tw.component.html',
  styleUrls: ['./chitiet-so-tonghop-kq-tw.component.scss']
})
export class ChitietSoTonghopKqTwComponent implements OnInit {
  public typeAccount: string = 'TW';

  constructor(
    private location: Location
  ) { }

  ngOnInit() {
  }

  onBack() {
    this.location.back();
  }
}
