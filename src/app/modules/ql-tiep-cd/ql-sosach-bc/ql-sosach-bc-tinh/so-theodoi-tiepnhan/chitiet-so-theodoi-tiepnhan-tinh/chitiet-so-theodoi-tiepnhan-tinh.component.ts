import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'ttkt-chitiet-so-theodoi-tiepnhan-tinh',
  templateUrl: './chitiet-so-theodoi-tiepnhan-tinh.component.html',
  styleUrls: ['./chitiet-so-theodoi-tiepnhan-tinh.component.scss']
})
export class ChitietSoTheodoiTiepnhanTinhComponent implements OnInit {
  public typeAccount: string = 'TINH';

  constructor(
  ) { }

  ngOnInit() {
  }

}
