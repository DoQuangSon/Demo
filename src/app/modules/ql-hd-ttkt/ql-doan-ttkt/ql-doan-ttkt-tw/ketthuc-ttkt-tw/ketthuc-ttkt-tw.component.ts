import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ttkt-ketthuc-ttkt-tw',
  templateUrl: './ketthuc-ttkt-tw.component.html',
  styleUrls: ['./ketthuc-ttkt-tw.component.scss']
})
export class KetthucTtktTwComponent implements OnInit {
  public typeAccount: string = 'TW';
  constructor() { }

  ngOnInit() {
  }

}
