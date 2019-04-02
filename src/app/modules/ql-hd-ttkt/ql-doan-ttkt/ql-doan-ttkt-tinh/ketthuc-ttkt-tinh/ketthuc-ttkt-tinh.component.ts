import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ttkt-ketthuc-ttkt-tinh',
  templateUrl: './ketthuc-ttkt-tinh.component.html',
  styleUrls: ['./ketthuc-ttkt-tinh.component.scss']
})
export class KetthucTtktTinhComponent implements OnInit {
  public typeAccount: string = 'TINH';
  constructor() { }

  ngOnInit() {
  }

}
