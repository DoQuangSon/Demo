import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ttkt-so-theodoi-tiepnhan',
  templateUrl: './so-theodoi-tiepnhan.component.html',
  styleUrls: ['./so-theodoi-tiepnhan.component.scss']
})
export class SoTheodoiTiepnhanComponent implements OnInit {
  public typeAccount: string = 'TINH';

  constructor(
  ) { }

  ngOnInit() {
  }

}
