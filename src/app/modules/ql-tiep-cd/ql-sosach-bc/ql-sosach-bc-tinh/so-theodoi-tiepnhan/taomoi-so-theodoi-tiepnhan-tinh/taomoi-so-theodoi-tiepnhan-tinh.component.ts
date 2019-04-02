import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'ttkt-taomoi-so-theodoi-tiepnhan-tinh',
  templateUrl: './taomoi-so-theodoi-tiepnhan-tinh.component.html',
  styleUrls: ['./taomoi-so-theodoi-tiepnhan-tinh.component.scss']
})
export class TaomoiSoTheodoiTiepnhanTinhComponent implements OnInit {
  public typeAccount: string = 'TINH';

  constructor(
  ) { }

  ngOnInit() {
  }


}
