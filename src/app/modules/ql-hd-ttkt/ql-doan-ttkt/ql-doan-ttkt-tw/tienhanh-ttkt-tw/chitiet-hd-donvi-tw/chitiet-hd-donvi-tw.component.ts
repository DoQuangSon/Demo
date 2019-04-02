import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ttkt-chitiet-hd-donvi-tw',
  templateUrl: './chitiet-hd-donvi-tw.component.html',
  styleUrls: ['./chitiet-hd-donvi-tw.component.scss']
})
export class ChitietHdDonviTwComponent implements OnInit {
  public tldId: any;
  public dvttktId: any;
  public typeAccount = 'TW';

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
