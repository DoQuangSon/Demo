import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ttkt-chi-tiet-doan-ttkt-tw',
  templateUrl: './chi-tiet-doan-ttkt-tw.component.html',
  styleUrls: ['./chi-tiet-doan-ttkt-tw.component.scss']
})
export class ChiTietDoanTtktTwComponent implements OnInit {
  public typeAccount: string = 'TW';
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

