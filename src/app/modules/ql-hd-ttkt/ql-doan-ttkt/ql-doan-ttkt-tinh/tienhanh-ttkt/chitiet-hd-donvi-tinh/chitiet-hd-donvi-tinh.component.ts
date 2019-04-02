import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ttkt-chitiet-hd-donvi-tinh',
  templateUrl: './chitiet-hd-donvi-tinh.component.html',
  styleUrls: ['./chitiet-hd-donvi-tinh.component.scss']
})
export class ChitietHdDonviTinhComponent implements OnInit {

  public tldId: any;
  public dvttktId: any;
  public typeAccount = 'TINH';

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.tldId = params['id'].split(',')[1];
        this.dvttktId = params['id'].split(',')[0];
      }
    });
  }

}
