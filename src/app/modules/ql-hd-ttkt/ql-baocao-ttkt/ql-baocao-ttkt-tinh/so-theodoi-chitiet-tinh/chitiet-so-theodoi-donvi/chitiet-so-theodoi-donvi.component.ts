import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ttkt-chitiet-so-theodoi-donvi',
  templateUrl: './chitiet-so-theodoi-donvi.component.html',
  styleUrls: ['./chitiet-so-theodoi-donvi.component.scss']
})
export class ChitietSoTheodoiDonviComponent implements OnInit {
  public typeAccount: string = 'TINH';

  constructor(
  ) { }

  ngOnInit() {
  }

}
