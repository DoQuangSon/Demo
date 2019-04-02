import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ttkt-so-theodoi-chitiet-tinh',
  templateUrl: './so-theodoi-chitiet-tinh.component.html',
  styleUrls: ['./so-theodoi-chitiet-tinh.component.scss']
})
export class SoTheodoiChitietTinhComponent implements OnInit {
  public typeAccount: string = 'TINH';

  constructor(
  ) { }

  ngOnInit() {
  }

}
