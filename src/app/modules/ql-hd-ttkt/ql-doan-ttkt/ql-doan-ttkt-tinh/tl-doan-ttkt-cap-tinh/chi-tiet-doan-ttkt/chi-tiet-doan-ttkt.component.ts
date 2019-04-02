import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ttkt-chi-tiet-doan-ttkt',
  templateUrl: './chi-tiet-doan-ttkt.component.html',
  styleUrls: ['./chi-tiet-doan-ttkt.component.scss']
})
export class ChiTietDoanTtktComponent implements OnInit {
  public typeAccount = 'TINH';
  public tldId: number;
  constructor(
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      if (params['index']) {
        this.tldId = params['index'];
      }
    });
  }

}
